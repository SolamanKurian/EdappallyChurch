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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
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
        limit(4)
      );
      
      const querySnapshot = await getDocs(sermonsQuery);
      console.log("Sermons query result:", querySnapshot.docs.length, "documents");
      
      const sermonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sermon[];
      
      console.log("Processed sermons data:", sermonsData);
      setSermons(sermonsData);
    } catch (error) {
      console.error("Error fetching sermons:", error);
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
        limit(4)
      );
      
      const querySnapshot = await getDocs(videosQuery);
      console.log("Videos query result:", querySnapshot.docs.length, "documents");
      
      const videosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Video[];
      
      console.log("Processed videos data:", videosData);
      setVideos(videosData);
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
      console.log("Fetching events from Firestore...");
      
      const eventsQuery = query(
        collection(db, "events"),
        orderBy("startDate", "asc"),
        limit(4)
      );
      
      const querySnapshot = await getDocs(eventsQuery);
      console.log("Events query result:", querySnapshot.docs.length, "documents");
      
      const eventsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Event[];
      
      console.log("Processed events data:", eventsData);
      setEvents(eventsData);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchCategories = async () => {
    if (!db) return;
    try {
      console.log("Fetching categories from Firestore...");
      
      const categoriesQuery = query(collection(db, "categories"));
      const querySnapshot = await getDocs(categoriesQuery);
      console.log("Categories query result:", querySnapshot.docs.length, "documents");
      
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      
      console.log("Processed categories data:", categoriesData);
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
    <div className="flex flex-col">
      {/* Hero Section: Full viewport height with overlay content */}
      <section className="relative min-h-screen flex items-center justify-center p-0 m-0 -mt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Carousel />
        </div>
        
        {/* Scroll Indicator */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 transition-all duration-1000 delay-1000 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Latest Sermons */}
      <section className="container mx-auto py-16 px-4">
        <div className={`transform transition-all duration-1000 delay-300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">Latest Sermons</h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Discover powerful messages that inspire, guide, and strengthen your faith journey
            </p>
          </div>
          
          {isLoadingSermons || isLoadingCategories ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : sermons.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {sermons.map((sermon, index) => {
                  const cat = categories.find(c => c.name === sermon.category);
                  return (
                    <div 
                      key={sermon.id} 
                      className={`transform transition-all duration-500 delay-${index * 100}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
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
              <div className="flex justify-center mt-12">
                <a href="/listen" className="text-yellow-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-transparent border-2 border-yellow-700">
                  Explore All Sermons
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📖</div>
              <p className="text-gray-500 text-lg">No sermons available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Latest Videos */}
      <section className="relative py-16" style={{ backgroundColor: '#1a1a1a' }}>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#1a1a1a] via-[#1a1a1a] to-transparent" style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 10%, #1a1a1a 30%, #1a1a1a 70%, transparent 90%, transparent 100%)' }}></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className={`transform transition-all duration-1000 delay-500 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide text-white">Latest Videos</h2>
              <div className="w-24 h-1 bg-yellow-600 mx-auto mb-4"></div>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Watch inspiring sermons and teachings from our church community
              </p>
            </div>
            
            {isLoadingVideos ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="bg-gray-700 rounded-lg h-64 animate-pulse"></div>
                ))}
              </div>
            ) : videos.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                  {videos.map((video, index) => (
                    <div 
                      key={video.id} 
                      className={`transform transition-all duration-500 delay-${index * 100}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {playingVideoId === video.id ? (
                        <div className="w-full h-64 flex items-center justify-center bg-black rounded-lg overflow-hidden relative">
                          <iframe
                            className="w-full h-full min-h-[16rem] rounded-lg"
                            src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                            title={video.title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                          <button
                            className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 z-20 hover:bg-black/80 transition-colors"
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
                <div className="flex justify-center mt-12">
                  <a href="/watch" className="text-yellow-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-transparent border-2 border-yellow-700">
                    Watch All Videos
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🎥</div>
                <p className="text-gray-400 text-lg">No videos available yet.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Latest Books */}
      <section className="container mx-auto py-16 px-4">
        <div className={`transform transition-all duration-1000 delay-700 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">Latest Books</h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Explore our collection of spiritual books and resources for your faith journey
            </p>
          </div>
          
          {isLoadingBooks ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : books.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <div 
                    key={book.id} 
                    className={`transform transition-all duration-500 delay-${index * 100}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <BookTile
                      cover={book.coverImageUrl}
                      title={book.title}
                      author={book.author}
                      language={book.language}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <a href="/read" className="text-yellow-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-transparent border-2 border-yellow-700">
                  Browse All Books
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-500 text-lg">No books available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container mx-auto py-16 px-4">
        <div className={`transform transition-all duration-1000 delay-900 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 font-serif tracking-wide">Upcoming Events</h2>
            <div className="w-24 h-1 bg-yellow-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Join us for special events, celebrations, and community gatherings
            </p>
          </div>
          
          {isLoadingEvents ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, index) => (
                <div key={index} className="bg-gray-200 rounded-lg h-64 animate-pulse"></div>
              ))}
            </div>
          ) : events.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {events.map((event, index) => (
                  <div 
                    key={event.id} 
                    className={`transform transition-all duration-500 delay-${index * 100}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <EventTile
                      id={event.id}
                      title={event.title}
                      startDate={event.startDate}
                      endDate={event.endDate}
                      isOneDay={event.isOneDay}
                      image={event.eventImageUrl}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-12">
                <a href="/attend" className="text-yellow-700 font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 flex items-center gap-2 bg-transparent border-2 border-yellow-700">
                  View All Events
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-gray-500 text-lg">No events available yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* Notice Board Section */}
      <section className="container mx-auto py-16 px-4">
        <div className={`transform transition-all duration-1000 delay-1100 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-12 text-center shadow-2xl border border-gray-700">
            <div className="max-w-3xl mx-auto">
              <div className="text-6xl mb-6">📢</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6 font-serif tracking-wide text-white">Church Notice Board</h2>
              <div className="w-24 h-1 bg-yellow-600 mx-auto mb-6"></div>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Access the latest church announcements, important notices, and updates for church members. Stay connected with our community.
              </p>
              <a 
                href="/notice-board" 
                className="inline-flex items-center gap-3 bg-yellow-600 text-gray-900 px-10 py-4 rounded-xl hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-2xl font-semibold text-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                Access Notice Board
              </a>
              <p className="text-sm text-gray-400 mt-4">
                Passcode required for access
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA */}
      <div className="bg-black text-white py-24">
        <div className="container mx-auto text-center px-4">
          <div className={`transform transition-all duration-1000 delay-1300 ${mounted ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
              Want to know more or connect with us?
            </h2>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
              Experience the love of Christ in a welcoming community. We invite you to join us for worship, fellowship, and spiritual growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <a 
                href="/contact" 
                className="text-yellow-700 font-semibold px-12 py-5 rounded-xl text-xl shadow-2xl hover:bg-yellow-100 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3 border-2 border-yellow-700"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Contact Us
              </a>
              <a 
                href="/about" 
                className="text-white font-semibold px-12 py-5 rounded-xl text-xl shadow-2xl hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-3 border-2 border-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                About Church
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
