import Image from "next/image";
import { useRouter } from "next/navigation";

type VideoTileProps = {
  id: string;
  thumbnail: string;
  title: string;
  date: string;
  preacher: string;
  youtubeId: string;
  onPlay?: () => void;
};

export default function VideoTile({ id, thumbnail, title, date, preacher, youtubeId, onPlay }: VideoTileProps) {
  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onPlay) {
      onPlay();
    } else if (youtubeId) {
      window.open(`https://www.youtube.com/watch?v=${youtubeId}`, '_blank');
    }
  };
  return (
    <div
      className="bg-black rounded-lg shadow p-4 flex flex-col items-center relative"
    >
      {thumbnail ? (
        <div className="relative w-full h-32 mb-3 rounded overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-32 object-cover rounded"
          />
          {/* Play Button Overlay */}
          <button
            className="absolute inset-0 flex items-center justify-center w-full h-full bg-black/20 hover:bg-black/40 transition z-10 cursor-pointer"
            aria-label="Play Video"
            onClick={handlePlayClick}
            type="button"
          >
            <svg className="w-12 h-12 text-white/90" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      ) : (
        <div className="w-full h-32 flex items-center justify-center bg-gray-800 text-gray-500 mb-3 rounded">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <div className="font-bold text-lg mb-1 text-center text-white">{title}</div>
      <div className="text-sm text-gray-400 mb-1">{date}</div>
      <div className="text-sm text-gray-300 mb-2">{preacher}</div>
    </div>
  );
} 