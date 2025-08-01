"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Video {
  id: string;
  title: string;
  date: string;
  preacher: string;
  youtubeLink: string;
  youtubeId: string;
}

export default function EditVideoPage() {
  const [formData, setFormData] = useState({
    title: "",
    preacher: "",
    date: "",
    youtubeLink: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [video, setVideo] = useState<Video | null>(null);
  
  const router = useRouter();
  const params = useParams();
  const videoId = params.id as string;

  useEffect(() => {
    // Load video data from localStorage
    const editVideo = localStorage.getItem("editVideo");
    if (editVideo) {
      const videoData = JSON.parse(editVideo) as Video;
      setVideo(videoData);
      setFormData({
        title: videoData.title,
        date: videoData.date,
        preacher: videoData.preacher,
        youtubeLink: videoData.youtubeLink
      });
    } else {
      router.push("/admin/dashboard/videos");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const extractYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Validate required fields
      if (!formData.title || !formData.date || !formData.preacher || !formData.youtubeLink) {
        throw new Error("Please fill in all required fields");
      }

      // Validate YouTube link
      const youtubeId = extractYouTubeId(formData.youtubeLink);
      if (!youtubeId) {
        throw new Error("Please enter a valid YouTube URL");
      }

      // Update in Firestore
      const videoRef = doc(db, "videos", videoId);
      await updateDoc(videoRef, {
        ...formData,
        youtubeId,
        updatedAt: new Date()
      });

      setSuccess(true);
      
      // Clear localStorage
      localStorage.removeItem("editVideo");
      
      // Redirect to videos list after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard/videos");
      }, 2000);

    } catch (error: any) {
      console.error("Error updating video:", error);
      setError(error.message || "Failed to update video. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!video) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading video...</p>
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
            <h1 className="text-2xl font-bold">Edit Video Sermon</h1>
            <button
              onClick={() => router.push("/admin/dashboard/videos")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Videos
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Video sermon updated successfully! Redirecting to videos list...
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
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
                  placeholder="Video sermon title"
                  required
                />
              </div>

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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preacher *
              </label>
              <input
                type="text"
                name="preacher"
                value={formData.preacher}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Preacher name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                YouTube Link *
              </label>
              <input
                type="url"
                name="youtubeLink"
                value={formData.youtubeLink}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="https://www.youtube.com/watch?v=..."
                required
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter the full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID)
              </p>
              {video.youtubeLink && (
                <p className="text-sm text-blue-600 mt-1">
                  Current video: <a href={video.youtubeLink} target="_blank" rel="noopener noreferrer" className="hover:underline">Watch current video</a>
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Video Sermon"}
              </button>
              
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard/videos")}
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