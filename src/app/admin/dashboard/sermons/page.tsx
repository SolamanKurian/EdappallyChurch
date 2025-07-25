"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Sermon {
  id: string;
  title: string;
  date: string;
  preacher: string;
  category: string;
  imageUrl: string;
  audioUrl: string;
}

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export default function SermonsListPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();
  const [categoryImages, setCategoryImages] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    fetchSermons();
    fetchCategoryImages();
  }, []);

  const fetchSermons = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "sermons"));
      const sermonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sermon[];
      
      // Sort by date (newest first)
      sermonsData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setSermons(sermonsData);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryImages = async () => {
    const querySnapshot = await getDocs(collection(db, "categories"));
    const images: { [key: string]: string } = {};
    querySnapshot.forEach(doc => {
      const data = doc.data() as Category;
      if (data.name && data.imageUrl) {
        images[data.name] = data.imageUrl;
      }
    });
    setCategoryImages(images);
  };

  const handleEdit = (sermon: Sermon) => {
    // Store sermon data in localStorage for the edit form
    localStorage.setItem("editSermon", JSON.stringify(sermon));
    router.push(`/admin/dashboard/edit-sermon/${sermon.id}`);
  };

  const handleDelete = async (sermon: Sermon) => {
    if (!confirm("Are you sure you want to delete this sermon? This action cannot be undone.")) {
      return;
    }

    setDeletingId(sermon.id);
    
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "sermons", sermon.id));
      
      // Remove from local state
      setSermons(sermons.filter(s => s.id !== sermon.id));
      
    } catch (error) {
      console.error("Error deleting sermon:", error);
      alert("Failed to delete sermon. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading sermons...</p>
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
            <h1 className="text-2xl font-bold">Manage Sermons</h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/dashboard/add-sermon")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Sermon
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {sermons.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No sermons found.</p>
              <button
                onClick={() => router.push("/admin/dashboard/add-sermon")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Sermon
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preacher
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {sermons.map((sermon) => (
                    <tr key={sermon.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {sermon.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(sermon.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {sermon.preacher}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {sermon.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(sermon)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(sermon)}
                            disabled={deletingId === sermon.id}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded text-xs disabled:opacity-50"
                          >
                            {deletingId === sermon.id ? "Deleting..." : "Delete"}
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