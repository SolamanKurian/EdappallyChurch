"use client";
import { useRouter } from "next/navigation";

// No more Image import

type SermonTileProps = {
  id?: string;
  image?: string; // Add image prop for category image
  title: string;
  date: string;
  preacher: string;
  audioUrl?: string;
  language?: string;
  category?: string;
};

export default function SermonTile({ 
  id,
  image, // Accept image prop
  title, 
  date, 
  preacher, 
  audioUrl, 
  language, 
  category 
}: SermonTileProps) {
  const router = useRouter();

  const handlePlay = () => {
    if (id && audioUrl) {
      router.push(`/sermon/${id}`);
    }
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    // Robust dd/mm/yyyy output
    let d;
    if (dateString.includes('/')) {
      // If already dd/mm/yyyy or mm/dd/yyyy, split and reorder
      const parts = dateString.split('/');
      if (parts[2].length === 4) {
        // Assume dd/mm/yyyy or mm/dd/yyyy
        d = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      } else {
        d = new Date(dateString);
      }
    } else {
      d = new Date(dateString);
    }
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col justify-end h-72 cursor-pointer group"
      style={image ? { backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
      onClick={handlePlay}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-0" />
      {/* Category and Language badges */}
      {category && (
        <span className="absolute top-3 left-3 bg-[#4E2E13] text-white px-3 py-1 rounded-full text-xs font-normal z-10 bg-opacity-90 shadow-md">
          {category}
        </span>
      )}
      {language && (
        <span className="absolute top-3 right-3 bg-gray-800 text-white px-3 py-1 rounded-full text-xs font-normal z-10 bg-opacity-90 shadow-md">
          {language}
        </span>
      )}
      {/* Centered Play Button Overlay */}
      {audioUrl && id && (
        <button
          onClick={(e) => { e.stopPropagation(); handlePlay(); }}
          className="absolute inset-0 flex items-center justify-center w-full h-full z-20 focus:outline-none"
          aria-label="Play Audio"
        >
          <svg className="w-16 h-16 text-white/80 group-hover:text-white transition" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        </button>
      )}
      {/* Card Content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-4 pointer-events-none">
        <div className="flex-1 flex flex-col justify-end">
          <h3 className="font-extrabold text-lg mb-1 text-white text-center w-full break-words line-clamp-2 drop-shadow-lg">{title}</h3>
          <p className="text-sm text-gray-200 mb-1 text-center w-full drop-shadow">{preacher}</p>
          <p className="text-xs text-gray-300 mb-2 text-center w-full drop-shadow">{formatDate(date)}</p>
        </div>
      </div>
    </div>
  );
} 