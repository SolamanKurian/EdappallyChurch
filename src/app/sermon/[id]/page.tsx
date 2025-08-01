"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Sermon {
  id: string;
  title: string;
  date: string;
  preacher: string;
  imageUrl: string;
  audioUrl: string;
  language: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export default function SermonPlayerPage() {
  const params = useParams();
  const router = useRouter();
  const sermonId = params.id as string;
  
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [categoryImage, setCategoryImage] = useState<string>("");
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize global audio state
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!window.globalAudio) {
        window.globalAudio = null;
        window.globalCurrentSermonId = null;
        window.globalCurrentSermon = null;
      }
    }
  }, []);

  useEffect(() => {
    fetchSermon();
    
    // Check if there's already a global audio playing
    if (window.globalAudio && window.globalCurrentSermonId !== sermonId) {
      // Stop the previous audio if it's a different sermon
      window.globalAudio.pause();
      window.globalAudio = null;
      window.globalCurrentSermonId = null;
      window.globalCurrentSermon = null;
    } else if (window.globalAudio && window.globalCurrentSermonId === sermonId) {
      // Resume the current audio if it's the same sermon
      audioRef.current = window.globalAudio;
      setIsPlaying(!window.globalAudio.paused);
      setCurrentTime(window.globalAudio.currentTime);
      setDuration(window.globalAudio.duration);
    } else if (!window.globalAudio) {
      // Ensure sermon page state is reset if no global audio exists
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
    }

    // Set up interval to sync with global audio state
    const syncInterval = setInterval(() => {
      if (window.globalAudio && window.globalCurrentSermonId === sermonId) {
        setIsPlaying(!window.globalAudio.paused);
        setCurrentTime(window.globalAudio.currentTime);
        setDuration(window.globalAudio.duration);
      } else if (!window.globalAudio) {
        // If global audio was closed, update sermon page state
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
      }
    }, 100);

    return () => {
      clearInterval(syncInterval);
      // Don't stop audio when component unmounts - let it continue playing
    };
  }, [sermonId]);

  useEffect(() => {
    // Fetch category image when sermon is loaded
    const fetchCategoryImage = async () => {
      if (sermon && sermon.category) {
        const q = query(collection(db, "categories"), where("name", "==", sermon.category));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const catDoc = snapshot.docs[0];
          const data = catDoc.data() as Category;
          if (data.imageUrl) setCategoryImage(data.imageUrl);
        }
      }
    };
    fetchCategoryImage();
  }, [sermon]);

  // Auto-play when sermon data is loaded
  useEffect(() => {
    if (sermon && !window.globalAudio) {
      // Auto-start playing when sermon is loaded and no global audio exists
      const audio = new Audio(sermon.audioUrl);
      audioRef.current = audio;
      window.globalAudio = audio;
      window.globalCurrentSermonId = sermonId;
      window.globalCurrentSermon = sermon;
      
      // Set up event listeners
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleAudioEnded);
      
      // Auto-play the audio
      audio.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Auto-play prevented by browser:', error);
        // Browser might block auto-play, that's okay
      });
    }
  }, [sermon, sermonId]);

  const fetchSermon = async () => {
    try {
      const sermonDoc = await getDoc(doc(db, "sermons", sermonId));
      if (sermonDoc.exists()) {
        setSermon({ id: sermonDoc.id, ...sermonDoc.data() } as Sermon);
      } else {
        setError("Sermon not found");
      }
    } catch (error) {
      console.error("Error fetching sermon:", error);
      setError("Failed to load sermon");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlayPause = () => {
    if (!window.globalAudio) {
      // Create new audio element if none exists
      const audio = new Audio(sermon?.audioUrl);
      audioRef.current = audio;
      window.globalAudio = audio;
      window.globalCurrentSermonId = sermonId;
      window.globalCurrentSermon = sermon;
      
      // Set up event listeners
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleAudioEnded);
    }
    
    if (isPlaying) {
      window.globalAudio?.pause();
      setIsPlaying(false);
    } else {
      window.globalAudio?.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // Clear global audio when it finishes
    window.globalAudio = null;
    window.globalCurrentSermonId = null;
    window.globalCurrentSermon = null;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
    if (typeof window !== 'undefined' && window.globalAudio) {
      window.globalAudio.currentTime = time;
    }
    setCurrentTime(time);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading sermon...</p>
        </div>
      </div>
    );
  }

  if (error || !sermon) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">Sermon Not Found</h1>
          <p className="text-gray-300 mb-6">{error}</p>
          <button
            onClick={() => router.push("/")}
            className="bg-yellow-600 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-gray-300 hover:text-yellow-400 transition"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        {/* Sermon Content */}
        <div className="bg-gray-900 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
          {/* Image/Background */}
          <div className="relative h-64 md:h-96 bg-gray-800" style={categoryImage ? { backgroundImage: `url('${categoryImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}>
            {/* Overlay for readability */}
            {categoryImage && <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-0" />}
            {/* Fallback to sermon image if no category image */}
            {!categoryImage && sermon.imageUrl ? (
              <Image
                src={sermon.imageUrl}
                alt={sermon.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            ) : null}
            {!categoryImage && !sermon.imageUrl && (
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
            )}
            {/* Category and Language badges */}
            <div className="absolute top-4 left-4 flex gap-2 z-10">
              {sermon.category && (
                <span className="bg-yellow-600 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">
                  {sermon.category}
                </span>
              )}
              {sermon.language && (
                <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm border border-gray-600">
                  {sermon.language}
                </span>
              )}
            </div>
          </div>

          {/* Audio Player */}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-white mb-2">{sermon.title}</h1>
            <p className="text-lg text-yellow-400 mb-1 font-medium">{sermon.preacher}</p>
            <p className="text-gray-400 mb-6">{formatDate(sermon.date)}</p>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-400 mb-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                style={{
                  background: `linear-gradient(to right, #eab308 0%, #eab308 ${(currentTime / duration) * 100}%, #374151 ${(currentTime / duration) * 100}%, #374151 100%)`
                }}
              />
            </div>

            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="w-full bg-yellow-600 text-gray-900 py-4 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center gap-3 text-lg shadow-lg"
            >
              {isPlaying ? (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Pause
                </>
              ) : (
                <>
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                  </svg>
                  Play
                </>
              )}
            </button>

            {/* Download and Share Buttons */}
            <div className="flex gap-3 mt-4">
              {/* Download Button */}
              <button
                onClick={() => {
                  try {
                    // Method 1: Try direct download with fetch
                    fetch(sermon.audioUrl)
                      .then(response => response.blob())
                      .then(blob => {
                        const url = window.URL.createObjectURL(blob);
                        const link = document.createElement('a');
                        link.href = url;
                        link.download = `${sermon.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        window.URL.revokeObjectURL(url);
                      })
                      .catch(() => {
                        // Method 2: Fallback to direct link download
                        const link = document.createElement('a');
                        link.href = sermon.audioUrl;
                        link.download = `${sermon.title.replace(/[^a-zA-Z0-9]/g, '_')}.mp3`;
                        link.target = '_blank';
                        link.style.display = 'none';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                      });
                  } catch (error) {
                    // Method 3: Final fallback - open in new tab
                    window.open(sermon.audioUrl, '_blank');
                  }
                }}
                className="flex-1 bg-gray-800 text-white py-3 rounded-lg font-medium hover:bg-gray-700 transition flex items-center justify-center gap-2 border border-gray-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  const shareUrl = window.location.href;
                  const shareText = `Listen to "${sermon.title}" by ${sermon.preacher}`;
                  
                  if (navigator.share) {
                    // Use native sharing if available
                    navigator.share({
                      title: sermon.title,
                      text: shareText,
                      url: shareUrl,
                    });
                  } else {
                    // Fallback to copying to clipboard
                    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`).then(() => {
                      alert('Link copied to clipboard!');
                    }).catch(() => {
                      // Fallback for older browsers
                      const textArea = document.createElement('textarea');
                      textArea.value = `${shareText}\n\n${shareUrl}`;
                      document.body.appendChild(textArea);
                      textArea.select();
                      document.execCommand('copy');
                      document.body.removeChild(textArea);
                      alert('Link copied to clipboard!');
                    });
                  }
                }}
                className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-medium hover:bg-gray-600 transition flex items-center justify-center gap-2 border border-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
                Share
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
} 