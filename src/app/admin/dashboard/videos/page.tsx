"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Video {
  id: string;
  title: string;
  date: string;
  preacher: string;
  youtubeLink: string;
  youtubeId: string;
}

export default function VideosListPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "videos"));
      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      
      // Sort by date (newest first)
      videosData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setVideos(videosData);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (video: Video) => {
    // Store video data in localStorage for the edit form
    localStorage.setItem("editVideo", JSON.stringify(video));
    router.push(`/admin/dashboard/edit-video/${video.id}`);
  };

  const handleDelete = async (video: Video) => {
    if (!confirm("Are you sure you want to delete this video sermon? This action cannot be undone.")) {
      return;
    }

    setDeletingId(video.id);
    
    try {
      // Delete from Firestore
      await deleteDoc(doc(db, "videos", video.id));
      
      // Remove from local state
      setVideos(videos.filter(v => v.id !== video.id));
      
    } catch (error) {
      console.error("Error deleting video:", error);
      alert("Failed to delete video. Please try again.");
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
            <p className="mt-2 text-gray-600">Loading videos...</p>
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
            <h1 className="text-2xl font-bold">Manage Video Sermons</h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/dashboard/add-video")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Video
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {videos.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No video sermons found.</p>
              <button
                onClick={() => router.push("/admin/dashboard/add-video")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Video Sermon
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
                      YouTube
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {videos.map((video) => (
                    <tr key={video.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {video.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDate(video.date)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {video.preacher}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a
                          href={video.youtubeLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-900 text-sm"
                        >
                          Watch Video
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(video)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(video)}
                            disabled={deletingId === video.id}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded text-xs disabled:opacity-50"
                          >
                            {deletingId === video.id ? "Deleting..." : "Delete"}
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