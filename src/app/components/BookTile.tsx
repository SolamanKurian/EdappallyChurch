import Link from "next/link";

type BookTileProps = {
  cover: string;
  title: string;
  author: string;
  language: string;
};

export default function BookTile({ cover, title, author, language }: BookTileProps) {
  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden flex flex-col justify-end h-72 group cursor-pointer"
      style={cover ? { backgroundImage: `url('${cover}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: '#e5e7eb' }}
    >
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />
      {/* Book Info */}
      <div className="relative z-10 p-4 flex flex-col gap-2">
        <div className="text-white text-lg font-semibold truncate" title={title}>{title}</div>
        <div className="text-gray-200 text-sm truncate" title={author}>{author}</div>
        <div className="text-gray-300 text-xs mb-2">{language}</div>
        <Link href="/contact">
          <button className="inline-block bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-900 transition text-center w-full">Get this book</button>
        </Link>
      </div>
    </div>
  );
} 