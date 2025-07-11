"use client";
import { useState, useEffect } from "react";
import Carousel from "@/app/components/Carousel";
import SermonTile from "@/app/components/SermonTile";
import VideoTile from "@/app/components/VideoTile";
import BookTile from "@/app/components/BookTile";
import EventTile from "@/app/components/EventTile";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";

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

interface Video {
  id: string;
  title: string;
  date: string;
  preacher: string;
  youtubeId: string;
  youtubeLink: string;
}

interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  coverImageUrl: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  isOneDay: boolean;
  startDate: string;
  endDate: string;
  eventImageUrl: string;
}

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

export default function Home() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingSermons, setIsLoadingSermons] = useState(true);
  const [isLoadingVideos, setIsLoadingVideos] = useState(true);
  const [isLoadingBooks, setIsLoadingBooks] = useState(true);
  const [isLoadingEvents, setIsLoadingEvents] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);

  useEffect(() => {
    // Check network connectivity
    if (!navigator.onLine) {
      console.error("No internet connection. Please check your network.");
      return;
    }

    if (!db) {
      setIsLoadingSermons(false);
      setIsLoadingVideos(false);
      setIsLoadingBooks(false);
      setIsLoadingEvents(false);
      setIsLoadingCategories(false);
      return;
    }

    console.log("Network status:", navigator.onLine ? "Online" : "Offline");
    console.log("User agent:", navigator.userAgent);

    fetchSermons();
    fetchVideos();
    fetchBooks();
    fetchEvents();
    fetchCategories();
  }, []);

  const fetchSermons = async () => {
    if (!db) return;
    try {
      console.log("Fetching sermons from Firestore...");
      console.log("Firebase config:", { projectId: "edchurch-6ea6c" });

      const sermonsQuery = query(
        collection(db, "sermons"),
        orderBy("date", "desc"),
        limit(8)
      );

      const querySnapshot = await getDocs(sermonsQuery);
      console.log("Sermons query result:", querySnapshot.docs.length, "documents");

      const sermonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sermon[];

      // Filter sermons that are not in the future and sort by date
      const currentDate = new Date();
      const validSermons = sermonsData
        .filter(sermon => {
          const sermonDate = new Date(sermon.date);
          return sermonDate <= currentDate;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);

      console.log("Processed sermons data:", validSermons);
      setSermons(validSermons);
    } catch (error: any) {
      console.error("Error fetching sermons:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);

      // Show user-friendly error message
      if (error.code === 'permission-denied') {
        console.error("Firebase permission denied. Check security rules.");
      } else if (error.code === 'unavailable') {
        console.error("Firebase service unavailable. Check network connection.");
      }
    } finally {
      setIsLoadingSermons(false);
    }
  };

  const fetchVideos = async () => {
    if (!db) return;
    try {
      console.log("Fetching videos from Firestore...");
      const videosQuery = query(
        collection(db, "videos"),
        orderBy("date", "desc"),
        limit(8)
      );

      const querySnapshot = await getDocs(videosQuery);
      console.log("Videos query result:", querySnapshot.docs.length, "documents");

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
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 4);

      console.log("Processed videos data:", validVideos);
      setVideos(validVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setIsLoadingVideos(false);
    }
  };

  const fetchBooks = async () => {
    if (!db) return;
    try {
      console.log("Fetching books from Firestore...");
      const booksQuery = query(
        collection(db, "books"),
        orderBy("createdAt", "desc"),
        limit(4)
      );

      const querySnapshot = await getDocs(booksQuery);
      console.log("Books query result:", querySnapshot.docs.length, "documents");

      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Book[];

      console.log("Processed books data:", booksData);
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoadingBooks(false);
    }
  };

  const fetchEvents = async () => {
    if (!db) return;
    try {
      const eventsQuery = query(
        collection(db, "events"),
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
      const sortedEvents = [...upcomingOrOngoing, ...over];
      setEvents(sortedEvents.slice(0, 4));
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchCategories = async () => {
    if (!db) return;
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Helper for dd/mm/yyyy
  function formatDateDDMMYYYY(dateString: string) {
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
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Hero Section: Full viewport height */}
      <section className="relative min-h-screen flex items-center justify-center p-0 m-0 -mt-16">
        <div className="absolute inset-0 z-0">
          <Carousel />
        </div>
        {/* You can add overlay text/logo here if needed */}
      </section>

      {/* Latest Sermons */}
      <section className="container mx-auto mt-4">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left font-serif tracking-wide">Latest Sermons</h2>
        {isLoadingSermons || isLoadingCategories ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-12 sm:px-0">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : sermons.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-0 sm:px-0">
              {sermons.map((sermon) => {
                const cat = categories.find(c => c.name === sermon.category);
                return (
                  <div key={sermon.id} className="w-[95vw] sm:w-full mx-auto">
                    <SermonTile
                      id={sermon.id}
                      image={cat?.imageUrl || ""}
                      title={sermon.title}
                      date={formatDateDDMMYYYY(sermon.date)}
                      preacher={sermon.preacher}
                      audioUrl={sermon.audioUrl}
                      language={sermon.language}
                      category={sermon.category}
                    />
                  </div>
                );
              })}
            </div>
            <div className="flex justify-center mt-6">
              <a href="/listen" className="text-yellow-700 font-normal px-6 py-2 rounded-lg shadow-md hover:bg-yellow-100 transition flex items-center gap-2 bg-transparent border border-yellow-700">
                More Sermons
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No sermons available yet.</p>
          </div>
        )}
      </section>

      {/* Latest Videos */}
      <section className="relative py-12 mt-8" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a] via-[#1a1a1a] to-transparent" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 10%, #1a1a1a 30%, #1a1a1a 70%, transparent 90%, transparent 100%)' }}></div>
        <div className="container mx-auto relative z-10">
          <h2 className="text-2xl font-bold mb-4 text-center sm:text-left font-serif tracking-wide">Latest Videos</h2>
        {isLoadingVideos ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-12 sm:px-0">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-0 sm:px-0">
              {videos.map((video) => (
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
                      date={formatDateDDMMYYYY(video.date)}
                      preacher={video.preacher}
                      youtubeId={video.youtubeId}
                      onPlay={() => setPlayingVideoId(video.id)}
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <a href="/watch" className="text-yellow-700 font-normal px-6 py-2 rounded-lg shadow-md hover:bg-yellow-100 transition flex items-center gap-2 bg-transparent border border-yellow-700">
                More Videos
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No videos available yet.</p>
          </div>
        )}
        </div>
      </section>

      {/* Latest Books */}
      <section className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left font-serif tracking-wide">Latest Books</h2>
        {isLoadingBooks ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-12 sm:px-0">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-0 sm:px-0">
              {books.map((book) => (
                <div key={book.id} className="w-[95vw] sm:w-full mx-auto">
                  <BookTile
                    cover={book.coverImageUrl}
                    title={book.title}
                    author={book.author}
                    language={book.language}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <a href="/read" className="text-yellow-700 font-normal px-6 py-2 rounded-lg shadow-md hover:bg-yellow-100 transition flex items-center gap-2 bg-transparent border border-yellow-700">
                More Books
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No books available yet.</p>
          </div>
        )}
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto mt-8">
        <h2 className="text-2xl font-bold mb-4 text-center sm:text-left font-serif tracking-wide">Upcoming Events</h2>
        {isLoadingEvents ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-12 sm:px-0">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
            ))}
          </div>
        ) : events.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 px-0 sm:px-0">
              {events.map((event) => (
                <div key={event.id} className="w-[95vw] sm:w-full mx-auto">
                  <EventTile
                    id={event.id}
                    title={event.title}
                    startDate={formatDateDDMMYYYY(event.startDate)}
                    endDate={formatDateDDMMYYYY(event.endDate)}
                    isOneDay={event.isOneDay}
                    image={event.eventImageUrl}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <a href="/attend" className="text-yellow-700 font-normal px-6 py-2 rounded-lg shadow-md hover:bg-yellow-100 transition flex items-center gap-2 bg-transparent border border-yellow-700">
                More Events
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No events available yet.</p>
          </div>
        )}
      </section>

      {/* CTA */}
      <div className="bg-black text-white py-20 mt-12">
        <div className="container mx-auto text-center">
          <h2 className="text-5xl font-bold mb-8 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>Want to know more or connect with us?</h2>
          <a href="/contact" className="text-yellow-700 font-normal px-10 py-4 rounded-lg text-xl shadow-lg hover:bg-yellow-100 transition inline-block flex items-center gap-3 mx-auto">
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}
