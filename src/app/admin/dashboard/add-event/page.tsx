"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadDirectToR2 } from "@/lib/clientUpload";

export default function AddEventPage() {
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
  const eventImageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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
    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size too large (max 10 MB)");
      setEventImage(null);
      if (eventImageRef.current) eventImageRef.current.value = "";
      return;
    }
    setEventImage(file);
    setError("");
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const result = await uploadDirectToR2(file, folder);
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setUploadProgress(0);
    try {
      if (!formData.title || !formData.description) {
        throw new Error("Please fill in all required fields");
      }
      if (!eventImage) {
        throw new Error("Please select an event poster image");
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
      setUploadProgress(10);
      const eventImageUrl = await uploadFile(eventImage, 'events/images');
      setUploadProgress(80);
      // Prepare event data
      let startDate, endDate;
      if (formData.isOneDay) {
        startDate = `${formData.date}T${formData.startTime}`;
        endDate = `${formData.date}T${formData.endTime}`;
      } else {
        startDate = formData.startDate;
        endDate = formData.endDate;
      }
      const eventData = {
        title: formData.title,
        description: formData.description,
        isOneDay: formData.isOneDay,
        startDate,
        endDate,
        eventImageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await addDoc(collection(db, "events"), eventData);
      setUploadProgress(100);
      setSuccess(true);
      setFormData({
        title: "",
        description: "",
        isOneDay: true,
        date: "",
        startTime: "",
        endTime: "",
        startDate: "",
        endDate: "",
      });
      setEventImage(null);
      if (eventImageRef.current) eventImageRef.current.value = "";
      setTimeout(() => {
        router.push("/admin/dashboard/events");
      }, 2000);
    } catch (error: any) {
      console.error("Error adding event:", error);
      setError(error.message || "Failed to add event. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Add New Event</h1>
            <button
              onClick={() => router.push("/admin/dashboard/events")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Events
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Event added successfully! Redirecting to events list...
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
              <div className="flex items-center gap-2 mt-6">
                <input
                  type="checkbox"
                  name="isOneDay"
                  checked={formData.isOneDay}
                  onChange={handleInputChange}
                  id="isOneDay"
                  className="mr-2"
                />
                <label htmlFor="isOneDay" className="text-sm font-medium text-gray-700">
                  One Day Event
                </label>
              </div>
            </div>
            {/* Date/Time Fields */}
            {formData.isOneDay ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Time *</label>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Time *</label>
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
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date & Time *</label>
                  <input
                    type="datetime-local"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date & Time *</label>
                  <input
                    type="datetime-local"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    required
                  />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Event description"
                rows={3}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Poster Image *</label>
              <input
                type="file"
                accept="image/*"
                ref={eventImageRef}
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
              {eventImage && (
                <p className="text-sm text-gray-600 mt-1">Selected: {eventImage.name}</p>
              )}
              {eventImage && eventImage.size > MAX_FILE_SIZE && (
                <p className="text-sm text-red-500 mt-1">File size too large (max 10 MB)</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-semibold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Event"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 