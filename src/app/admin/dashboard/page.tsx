"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { logout, getCurrentUser } from "@/utils/auth";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface DashboardStats {
  sermons: number;
  videos: number;
  books: number;
  events: number;
  categories: number;
  total: number;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState<DashboardStats>({
    sermons: 0,
    videos: 0,
    books: 0,
    events: 0,
    categories: 0,
    total: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get user info from localStorage
    const currentUser = getCurrentUser();
    if (currentUser) {
      setUserEmail(currentUser.email || "Admin");
    }
    
    // Fetch dashboard stats
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setLoading(true);
      
      // Fetch counts from all collections
      const [sermonsSnapshot, videosSnapshot, booksSnapshot, eventsSnapshot, categoriesSnapshot] = await Promise.all([
        getDocs(collection(db, "sermons")),
        getDocs(collection(db, "videos")),
        getDocs(collection(db, "books")),
        getDocs(collection(db, "events")),
        getDocs(collection(db, "categories"))
      ]);

      const newStats = {
        sermons: sermonsSnapshot.size,
        videos: videosSnapshot.size,
        books: booksSnapshot.size,
        events: eventsSnapshot.size,
        categories: categoriesSnapshot.size,
        total: sermonsSnapshot.size + videosSnapshot.size + booksSnapshot.size + eventsSnapshot.size + categoriesSnapshot.size
      };

      setStats(newStats);
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    console.log("Logging out...");
    await logout();
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              {userEmail && (
                <p className="text-gray-600 mt-1">Welcome, {userEmail}</p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-blue-800 mb-2">Audio Sermons</h3>
              <p className="text-blue-600 mb-2">Manage audio sermon uploads</p>
              <p className="text-blue-700 font-semibold mb-4">
                {loading ? "Loading..." : `${stats.sermons} sermon${stats.sermons !== 1 ? 's' : ''}`}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/admin/dashboard/add-sermon")}
                  className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition text-sm"
                >
                  Add New Sermon
                </button>
                <button
                  onClick={() => router.push("/admin/dashboard/sermons")}
                  className="w-full bg-blue-100 text-blue-700 py-2 px-4 rounded hover:bg-blue-200 transition text-sm"
                >
                  View All Sermons
                </button>
              </div>
            </div>

            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Video Sermons</h3>
              <p className="text-green-600 mb-2">Manage video sermon links</p>
              <p className="text-green-700 font-semibold mb-4">
                {loading ? "Loading..." : `${stats.videos} video${stats.videos !== 1 ? 's' : ''}`}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/admin/dashboard/add-video")}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition text-sm"
                >
                  Add New Video
                </button>
                <button
                  onClick={() => router.push("/admin/dashboard/videos")}
                  className="w-full bg-green-100 text-green-700 py-2 px-4 rounded hover:bg-green-200 transition text-sm"
                >
                  View All Videos
                </button>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-lg font-semibold text-purple-800 mb-2">Books</h3>
              <p className="text-purple-600 mb-2">Manage church books and resources</p>
              <p className="text-purple-700 font-semibold mb-4">
                {loading ? "Loading..." : `${stats.books} book${stats.books !== 1 ? 's' : ''}`}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/admin/dashboard/add-book")}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition text-sm"
                >
                  Add New Book
                </button>
                <button
                  onClick={() => router.push("/admin/dashboard/books")}
                  className="w-full bg-purple-100 text-purple-700 py-2 px-4 rounded hover:bg-purple-200 transition text-sm"
                >
                  View All Books
                </button>
              </div>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">Events</h3>
              <p className="text-yellow-600 mb-2">Manage church events and activities</p>
              <p className="text-yellow-700 font-semibold mb-4">
                {loading ? "Loading..." : `${stats.events} event${stats.events !== 1 ? 's' : ''}`}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/admin/dashboard/add-event")}
                  className="w-full bg-yellow-600 text-white py-2 px-4 rounded hover:bg-yellow-700 transition text-sm"
                >
                  Add New Event
                </button>
                <button
                  onClick={() => router.push("/admin/dashboard/events")}
                  className="w-full bg-yellow-100 text-yellow-700 py-2 px-4 rounded hover:bg-yellow-200 transition text-sm"
                >
                  View All Events
                </button>
              </div>
            </div>

            <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
              <h3 className="text-lg font-semibold text-indigo-800 mb-2">Categories</h3>
              <p className="text-indigo-600 mb-2">Manage sermon and content categories</p>
              <p className="text-indigo-700 font-semibold mb-4">
                {loading ? "Loading..." : `${stats.categories} categor${stats.categories !== 1 ? 'ies' : 'y'}`}
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => router.push("/admin/dashboard/add-category")}
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition text-sm"
                >
                  Add New Category
                </button>
                <button
                  onClick={() => router.push("/admin/dashboard/categories")}
                  className="w-full bg-indigo-100 text-indigo-700 py-2 px-4 rounded hover:bg-indigo-200 transition text-sm"
                >
                  View All Categories
                </button>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-lg font-semibold text-orange-800 mb-2">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <p className="text-orange-600">Audio Sermons: <span className="font-semibold">{loading ? "..." : stats.sermons}</span></p>
                <p className="text-orange-600">Video Sermons: <span className="font-semibold">{loading ? "..." : stats.videos}</span></p>
                <p className="text-orange-600">Books: <span className="font-semibold">{loading ? "..." : stats.books}</span></p>
                <p className="text-orange-600">Events: <span className="font-semibold">{loading ? "..." : stats.events}</span></p>
                <p className="text-orange-600">Categories: <span className="font-semibold">{loading ? "..." : stats.categories}</span></p>
              </div>
            </div>
          </div>


        </div>
      </div>
    </main>
  );
} 