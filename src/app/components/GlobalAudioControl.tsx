"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

// Global audio state (shared with sermon player)
declare global {
  interface Window {
    globalAudio: HTMLAudioElement | null;
    globalCurrentSermonId: string | null;
    globalCurrentSermon: any;
  }
}

export default function GlobalAudioControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sermon, setSermon] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const updateAudioState = () => {
      if (window.globalAudio) {
        setIsPlaying(!window.globalAudio.paused);
        setCurrentTime(window.globalAudio.currentTime);
        setDuration(window.globalAudio.duration);
        setSermon(window.globalCurrentSermon);
      } else {
        setIsPlaying(false);
        setCurrentTime(0);
        setDuration(0);
        setSermon(null);
      }
    };

    // Update state immediately
    updateAudioState();

    // Set up interval to update state
    const interval = setInterval(updateAudioState, 1000);

    // Set up event listeners for global audio
    if (window.globalAudio) {
      const handleTimeUpdate = () => setCurrentTime(window.globalAudio!.currentTime);
      const handleEnded = () => {
        setIsPlaying(false);
        setCurrentTime(0);
        setSermon(null);
      };

      window.globalAudio.addEventListener('timeupdate', handleTimeUpdate);
      window.globalAudio.addEventListener('ended', handleEnded);

      return () => {
        window.globalAudio?.removeEventListener('timeupdate', handleTimeUpdate);
        window.globalAudio?.removeEventListener('ended', handleEnded);
        clearInterval(interval);
      };
    }

    return () => clearInterval(interval);
  }, [isClient]);

  const handlePlayPause = () => {
    if (window.globalAudio) {
      if (isPlaying) {
        window.globalAudio.pause();
      } else {
        window.globalAudio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (window.globalAudio) {
      window.globalAudio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleGoToSermon = () => {
    if (window.globalCurrentSermonId) {
      router.push(`/sermon/${window.globalCurrentSermonId}`);
    }
  };

  const handleClose = () => {
    if (window.globalAudio) {
      window.globalAudio.pause();
      window.globalAudio = null;
      window.globalCurrentSermonId = null;
      window.globalCurrentSermon = null;
      setIsPlaying(false);
      setCurrentTime(0);
      setDuration(0);
      setSermon(null);
    }
  };

  // Don't render if not client-side or no audio is playing
  if (!isClient || !window.globalAudio || !sermon) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center gap-4">
          {/* Sermon Info */}
          <div className="flex-1 min-w-0">
            <button
              onClick={handleGoToSermon}
              className="text-left hover:text-black transition"
            >
              <h3 className="font-semibold text-sm truncate">{sermon.title}</h3>
              <p className="text-xs text-gray-600 truncate">{sermon.preacher}</p>
            </button>
          </div>

          {/* Audio Controls */}
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button
              onClick={handlePlayPause}
              className="bg-black text-white p-2 rounded-full hover:bg-gray-800 transition"
            >
              {isPlaying ? (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
              )}
            </button>

            {/* Progress Bar */}
            <div className="flex-1 max-w-xs">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
              <input
                type="range"
                min="0"
                max={duration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #000000 0%, #000000 ${(currentTime / duration) * 100}%, #e5e7eb ${(currentTime / duration) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>

            {/* Close Button */}
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition p-1"
              title="Stop and close"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 