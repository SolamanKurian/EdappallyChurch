"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface Event {
  id: string;
  title: string;
  description: string;
  isOneDay: boolean;
  startDate: string;
  endDate: string;
  eventImageUrl: string;
  eventImagePath?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export default function EventsListPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "events"));
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      eventsData.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    // Store event data in localStorage for the edit form
    localStorage.setItem("editEvent", JSON.stringify(event));
    router.push(`/admin/dashboard/edit-event/${event.id}`);
  };

  const handleDelete = async (event: Event) => {
  if (!confirm("Are you sure you want to delete this event? This will also delete the event image. This action cannot be undone.")) {
    return;
  }
  setDeletingId(event.id);
  try {
    // Delete image from Storage
    if (event.eventImagePath) {
      const imageRef = ref(storage, event.eventImagePath);
      await deleteObject(imageRef);
    }
    // Delete from Firestore
    await deleteDoc(doc(db, "events", event.id));
    // Remove from local state
    setEvents(events.filter(e => e.id !== event.id));
  } catch (error) {
    console.error("Error deleting event:", error);
    alert("Failed to delete event. Please try again.");
  } finally {
    setDeletingId(null);
  }
};

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTagColor = (tag: string) => {
    return tag === "Upcoming" 
      ? "bg-green-100 text-green-800" 
      : "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading events...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Events</h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/dashboard/add-event")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Event
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {events.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No events found.</p>
              <button
                onClick={() => router.push("/admin/dashboard/add-event")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Event
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Start Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      End Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-16 w-16">
                          <img
                            className="h-16 w-16 object-cover rounded"
                            src={event.eventImageUrl}
                            alt={event.title}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Crect width='64' height='64' fill='%23f3f4f6'/%3E%3Ctext x='32' y='32' font-family='Arial' font-size='8' fill='%236b7280' text-anchor='middle' dy='.3em'%3EEvent%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {event.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(event.startDate).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(event.endDate).toLocaleString()}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs">
                          {event.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(event)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(event)}
                            disabled={deletingId === event.id}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded text-xs disabled:opacity-50"
                          >
                            {deletingId === event.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 