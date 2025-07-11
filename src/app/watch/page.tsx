"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import VideoTile from "@/app/components/VideoTile";

interface Video {
  id: string;
  title: string;
  preacher: string;
  date: string;
  youtubeId: string;
  youtubeLink: string;
}

const ITEMS_PER_PAGE = 8;

export default function WatchPage() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const videosQuery = query(
        collection(db, "videos"),
        orderBy("date", "desc")
      );
      const querySnapshot = await getDocs(videosQuery);
      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      
      // Filter videos that are not in the future and sort by date
      const currentDate = new Date();
      const validVideos = videosData
        .filter(video => {
          const videoDate = new Date(video.date);
          return videoDate <= currentDate;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      setVideos(validVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Pagination logic
  const totalPages = Math.ceil(videos.length / ITEMS_PER_PAGE);
  const paginated = videos.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading videos...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Watch Sermons</h1>
      {videos.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No videos available yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 px-0 sm:px-0">
            {paginated.map((video) => (
              <div key={video.id} className="w-[95vw] sm:w-full mx-auto">
                {playingVideoId === video.id ? (
                  <div className="w-full h-64 flex items-center justify-center bg-black rounded-lg overflow-hidden">
                    <iframe
                      className="w-full h-full min-h-[16rem] rounded-lg"
                      src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                    <button
                      className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 z-20 hover:bg-black/80"
                      onClick={() => setPlayingVideoId(null)}
                      aria-label="Close Video"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ) : (
                  <VideoTile
                    id={video.id}
                    thumbnail={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                    title={video.title}
                    date={formatDate(video.date)}
                    preacher={video.preacher}
                    youtubeId={video.youtubeId}
                    onPlay={() => setPlayingVideoId(video.id)}
                  />
                )}
              </div>
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                className="px-3 py-2 rounded border disabled:opacity-50 hover:bg-gray-100"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-amber-900 text-white" : ""}`}
                  onClick={() => setPage(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
              <button
                className="px-3 py-2 rounded border disabled:opacity-50 hover:bg-gray-100"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
} 