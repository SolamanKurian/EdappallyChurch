"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Event {
  id: string;
  title: string;
  description: string;
  isOneDay: boolean;
  startDate: string;
  endDate: string;
  eventImageUrl: string;
}

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
  if (isOneDay || start.toDateString() === end.toDateString()) {
    return start.toLocaleString();
  }
  return `${start.toLocaleString()} - ${end.toLocaleString()}`;
}

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchEvent();
    // eslint-disable-next-line
  }, [eventId]);

  const fetchEvent = async () => {
    try {
      const docRef = doc(db, "events", eventId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setEvent({ id: docSnap.id, ...docSnap.data() } as Event);
      } else {
        setError("Event not found");
      }
    } catch (err) {
      setError("Failed to fetch event details");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading event details...</p>
        </div>
      </main>
    );
  }

  if (error || !event) {
    return (
      <main className="container mx-auto py-12 px-4">
        <div className="text-center text-red-600 font-semibold">{error || "Event not found"}</div>
        <button
          onClick={() => router.back()}
          className="mt-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Back
        </button>
      </main>
    );
  }

  const status = getStatus(event.startDate, event.endDate);

  return (
    <main className="container mx-auto py-12 px-4 max-w-2xl">
      <button
        onClick={() => router.back()}
        className="mb-6 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        Back
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {event.eventImageUrl && (
          <img
            src={event.eventImageUrl}
            alt={event.title}
            className="w-full h-64 object-cover"
          />
        )}
        <div className="p-6 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{event.title}</h1>
            <span className={`inline-block px-4 py-1 rounded-full text-sm font-semibold ${status === "Upcoming" ? "bg-green-600 text-white" : status === "Ongoing" ? "bg-yellow-500 text-white" : "bg-gray-500 text-white"}`}>{status}</span>
          </div>
          <div className="text-gray-700 text-base">
            <span className="font-semibold">When: </span>
            {formatEventDate(event.startDate, event.endDate, event.isOneDay)}
          </div>
          <div className="text-gray-700 whitespace-pre-line">
            {event.description}
          </div>
        </div>
      </div>
    </main>
  );
} 