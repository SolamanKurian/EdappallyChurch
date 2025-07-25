import Link from "next/link";

type EventTileProps = {
  id: string;
  title: string;
  startDate: string;
  endDate: string;
  isOneDay: boolean;
  image?: string;
};

function getStatus(startDate: string, endDate: string) {
  const now = new Date();
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (now < start) return "Upcoming";
  if (now > end) return "Over";
  return "Ongoing";
}

function formatEventDate(startDate: string, endDate: string, isOneDay: boolean) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return '-';
  }
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  if (isOneDay || start.toDateString() === end.toDateString()) {
    return start.toLocaleString(undefined, options);
  }
  return `${start.toLocaleString(undefined, options)} - ${end.toLocaleString(undefined, options)}`;
}

export default function EventTile({ id, title, startDate, endDate, isOneDay, image }: EventTileProps) {
  const status = getStatus(startDate, endDate);
  return (
    <div
      className="relative rounded-lg shadow-lg overflow-hidden flex flex-col justify-end h-72 group"
      style={image ? { backgroundImage: `url('${image}')`, backgroundSize: 'cover', backgroundPosition: 'center' } : { backgroundColor: '#e5e7eb' }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0" />
      <div className="relative z-10 p-4 flex flex-col gap-2">
        <div className="text-white text-lg font-semibold truncate" title={title}>{title}</div>
        <div className="text-gray-200 text-sm">
          {formatEventDate(startDate, endDate, isOneDay)}
        </div>
        <div className="flex gap-2 items-center mt-2">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status === "Upcoming" ? "bg-amber-900 text-white" : status === "Ongoing" ? "bg-yellow-500 text-white" : "bg-gray-500 text-white"}`}>{status}</span>
        </div>
        <Link href={`/attend/${id}`}>
          <button className="mt-4 w-full bg-black text-white px-4 py-2 rounded-full font-semibold hover:bg-gray-900 transition text-center">Know More</button>
        </Link>
      </div>
    </div>
  );
} 