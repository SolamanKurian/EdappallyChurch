"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Video {
  id: string;
  title: string;
  preacher: string;
  date: string;
  youtubeId: string;
  youtubeLink: string;
}

export default function VideoPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = params.id as string;
  const [video, setVideo] = useState<Video | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const videoDoc = await getDoc(doc(db, "videos", videoId));
        if (videoDoc.exists()) {
          setVideo({ id: videoDoc.id, ...videoDoc.data() } as Video);
        } else {
          setError("Video not found");
        }
      } catch (err) {
        setError("Failed to load video");
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideo();
  }, [videoId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading video...</p>
        </div>
      </div>
    );
  }

  if (error || !video) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Video Not Found</h1>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push("/watch")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Back to Watch
          </button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-600 hover:text-gray-800 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>
        <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
          <div className="w-full aspect-video mb-6">
            <div className="relative w-full h-0 pb-[56.25%]">
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded"
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{video.title}</h1>
          <p className="text-lg text-gray-600 mb-1">{video.preacher}</p>
          <p className="text-gray-500 mb-4">{formatDate(video.date)}</p>
        </div>
      </div>
    </main>
  );
} 