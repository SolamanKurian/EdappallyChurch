"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import EventTile from "@/app/components/EventTile";

interface Event {
  id: string;
  title: string;
  description: string;
  isOneDay: boolean;
  startDate: string;
  endDate: string;
  eventImageUrl: string;
}

const ITEMS_PER_PAGE = 8;

export default function AttendPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const eventsQuery = query(
        collection(db, "events"),
        // Order by startDate (new field)
        orderBy("startDate", "asc")
      );
      const querySnapshot = await getDocs(eventsQuery);
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      // Custom sort: upcoming/ongoing first, over last
      const now = new Date();
      const upcomingOrOngoing = eventsData.filter(e => new Date(e.endDate) >= now);
      const over = eventsData.filter(e => new Date(e.endDate) < now);
      // Sort upcoming/ongoing by soonest startDate
      upcomingOrOngoing.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      // Sort over by most recent endDate last
      over.sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
      setEvents([...upcomingOrOngoing, ...over]);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const totalPages = Math.ceil(events.length / ITEMS_PER_PAGE);
  const paginated = events.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  if (isLoading) {
    return (
      <main className="container mx-auto py-8 px-2 sm:px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading events...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Attend Our Events</h1>
      {events.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No events available yet.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 px-12 sm:px-0">
            {paginated.map((event) => (
              <EventTile
                key={event.id}
                id={event.id}
                title={event.title}
                startDate={event.startDate}
                endDate={event.endDate}
                isOneDay={event.isOneDay}
                image={event.eventImageUrl}
              />
            ))}
          </div>
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex flex-wrap justify-center gap-2">
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