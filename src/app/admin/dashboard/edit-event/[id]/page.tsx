"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadToR2 } from "@/lib/upload";

interface Event {
  id: string;
  title: string;
  date: string;
  description: string;
  tag: string;
  eventImageUrl: string;
  eventImagePath: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditEventPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    isOneDay: true,
    date: "",
    startTime: "",
    endTime: "",
    startDate: "",
    endDate: "",
  });
  const [eventImage, setEventImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [event, setEvent] = useState<Event | null>(null);
  
  const eventImageRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();
  const params = useParams();
  const eventId = params.id as string;

  useEffect(() => {
    // Load event data from localStorage
    const editEvent = localStorage.getItem("editEvent");
    if (editEvent) {
      const eventData = JSON.parse(editEvent);
      // Determine if event is one-day or multi-day
      let isOneDay = true;
      let date = "", startTime = "", endTime = "", startDate = "", endDate = "";
      if (eventData.isOneDay !== undefined) {
        isOneDay = eventData.isOneDay;
      } else if (eventData.startDate && eventData.endDate) {
        // If startDate and endDate are the same day, treat as one-day
        const start = new Date(eventData.startDate);
        const end = new Date(eventData.endDate);
        isOneDay = start.toDateString() === end.toDateString();
      }
      if (isOneDay) {
        if (eventData.startDate && eventData.endDate) {
          const [d, st] = eventData.startDate.split('T');
          const [, et] = eventData.endDate.split('T');
          date = d;
          startTime = st ? st.substring(0,5) : "";
          endTime = et ? et.substring(0,5) : "";
        }
      } else {
        startDate = eventData.startDate || "";
        endDate = eventData.endDate || "";
      }
      setEvent(eventData);
      setFormData({
        title: eventData.title || "",
        description: eventData.description || "",
        isOneDay,
        date,
        startTime,
        endTime,
        startDate,
        endDate,
      });
    } else {
      router.push("/admin/dashboard/events");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setFormData((prev) => ({
        ...prev,
        [name]: (e.target as HTMLInputElement).checked
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate image file
    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("Image must be less than 5MB");
      return;
    }
    
    setEventImage(file);
    setError("");
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const result = await uploadToR2(file, folder);
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setUploadProgress(0);

    try {
      // Validate required fields
      if (!formData.title || !formData.description) {
        throw new Error("Please fill in all required fields");
      }
      // Validate date/time fields
      if (formData.isOneDay) {
        if (!formData.date || !formData.startTime || !formData.endTime) {
          throw new Error("Please fill in the date and times for the event");
        }
      } else {
        if (!formData.startDate || !formData.endDate) {
          throw new Error("Please fill in the start and end date/time for the event");
        }
      }

      if (!event) {
        throw new Error("Event data not found");
      }

      let eventImageUrl = event.eventImageUrl;

      setUploadProgress(10);

      // Upload new event image if provided
      if (eventImage) {
        // Upload new event image
        eventImageUrl = await uploadFile(eventImage, 'events/images');
        setUploadProgress(80);
      }

      // Prepare event data
      let startDate = '', endDate = '';
      if (formData.isOneDay) {
        // Ensure zero-padding for date and time
        const pad = (n: string) => n.padStart(2, '0');
        const [year, month, day] = formData.date.split('-');
        const [startHour, startMinute] = formData.startTime.split(':');
        const [endHour, endMinute] = formData.endTime.split(':');
        if (year && month && day && startHour && startMinute && endHour && endMinute) {
          startDate = `${year}-${pad(month)}-${pad(day)}T${pad(startHour)}:${pad(startMinute)}`;
          endDate = `${year}-${pad(month)}-${pad(day)}T${pad(endHour)}:${pad(endMinute)}`;
        }
      } else {
        // startDate and endDate are already datetime-local strings, ensure ISO format
        if (formData.startDate && formData.endDate) {
          startDate = new Date(formData.startDate).toISOString();
          endDate = new Date(formData.endDate).toISOString();
        }
      }
      if (!startDate || !endDate) {
        throw new Error("Invalid or incomplete date/time fields");
      }
      const eventData = {
        title: formData.title,
        description: formData.description,
        isOneDay: formData.isOneDay,
        startDate,
        endDate,
        eventImageUrl,
        updatedAt: new Date()
      };

      // Update in Firestore
      const eventRef = doc(db, "events", eventId);
      await updateDoc(eventRef, eventData);
      setUploadProgress(100);

      setSuccess(true);
      
      // Clear localStorage
      localStorage.removeItem("editEvent");
      
      // Redirect to events list after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard/events");
      }, 2000);

    } catch (error: any) {
      console.error("Error updating event:", error);
      setError(error.message || "Failed to update event. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (!event) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading event...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Edit Event</h1>
            <button
              onClick={() => router.push("/admin/dashboard/events")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Events
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Event updated successfully! Redirecting to events list...
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span>Uploading image...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Event title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Is One Day?
                </label>
                <input
                  type="checkbox"
                  name="isOneDay"
                  checked={formData.isOneDay}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </div>
            </div>

            {formData.isOneDay ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time *
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time *
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                      required
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Event description..."
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Image
              </label>
              <div className="mb-2">
                <img
                  src={event.eventImageUrl}
                  alt={event.title}
                  className="h-32 w-32 object-cover rounded border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' viewBox='0 0 128 128'%3E%3Crect width='128' height='128' fill='%23f3f4f6'/%3E%3Ctext x='64' y='64' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3EEvent%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <input
                ref={eventImageRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to keep current image. Accepted formats: JPG, PNG, GIF. Max size: 5MB
              </p>
              {eventImage && (
                <p className="text-sm text-green-600 mt-1">
                  New image selected: {eventImage.name}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Event"}
              </button>
              
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard/events")}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 