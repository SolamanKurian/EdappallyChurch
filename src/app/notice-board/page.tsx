"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, query, orderBy, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Notice {
  id: string;
  title: string;
  content: string;
  date: string;
  createdAt: string;
}

export default function NoticeBoardPage() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [checkingPasscode, setCheckingPasscode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already authenticated
    const isAuth = sessionStorage.getItem("noticeBoardAuth");
    if (isAuth === "true") {
      setAuthenticated(true);
      fetchNotices();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchNotices = async () => {
    try {
      const q = query(collection(db, "notices"), orderBy("date", "desc"));
      const querySnapshot = await getDocs(q);
      const noticesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notice[];
      setNotices(noticesData);
    } catch (error) {
      console.error("Error fetching notices:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasscodeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!passcode.trim()) {
      setError("Please enter a passcode");
      return;
    }

    setCheckingPasscode(true);
    setError("");

    try {
      const passcodeDoc = await getDoc(doc(db, "settings", "noticeBoardPasscode"));
      const correctPasscode = passcodeDoc.exists() ? passcodeDoc.data().passcode : "church123";
      
      if (passcode.trim() === correctPasscode) {
        setAuthenticated(true);
        sessionStorage.setItem("noticeBoardAuth", "true");
        fetchNotices();
      } else {
        setError("Incorrect passcode. Please try again.");
      }
    } catch (error) {
      console.error("Error checking passcode:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setCheckingPasscode(false);
    }
  };

  const handleLogout = () => {
    setAuthenticated(false);
    sessionStorage.removeItem("noticeBoardAuth");
    setPasscode("");
    setError("");
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    return { day, month, year };
  };

  const isRecentNotice = (dateString: string) => {
    const noticeDate = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - noticeDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 7; // Highlight notices from last 7 days
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500 mx-auto"></div>
            <p className="mt-2 text-gray-300">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-black py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-gray-900 shadow-2xl rounded-lg p-8 border border-gray-700">
            <div className="text-center mb-6">
              <div className="text-4xl mb-4">📋</div>
              <h1 className="text-3xl font-bold text-white mb-2">Church Notice Board</h1>
              <p className="text-gray-400">Enter the passcode to access church notices</p>
            </div>

            <form onSubmit={handlePasscodeSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Passcode
                </label>
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-gray-400"
                  placeholder="Enter passcode"
                  required
                />
              </div>

              {error && (
                <div className="text-red-400 text-sm bg-red-900/50 p-3 rounded-lg border border-red-700">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={checkingPasscode}
                className="w-full bg-yellow-600 text-gray-900 py-3 px-4 rounded-lg hover:bg-yellow-500 transition disabled:opacity-50 font-semibold"
              >
                {checkingPasscode ? "Checking..." : "Access Notice Board"}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => router.push("/")}
                className="text-yellow-400 hover:text-yellow-300 text-sm transition"
              >
                ← Back to Home
              </button>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black py-8">
      <div className="container mx-auto px-4">
        <div className="bg-gray-900 shadow-2xl rounded-lg p-8 border border-gray-700">
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">📋</div>
                <h1 className="text-3xl font-bold text-white">Church Notice Board</h1>
              </div>
              <p className="text-gray-400">Latest church announcements and notices</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-medium"
              >
                Logout
              </button>
              <button
                onClick={() => router.push("/")}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition font-medium"
              >
                Back to Home
              </button>
            </div>
          </div>

          {notices.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📝</div>
              <p className="text-gray-400 text-lg">No notices available at the moment.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {notices.map((notice) => {
                const dateInfo = formatDate(notice.date);
                const isRecent = isRecentNotice(notice.date);
                
                return (
                  <div 
                    key={notice.id} 
                    className={`border rounded-lg p-6 transition-all duration-300 hover:shadow-xl ${
                      isRecent 
                        ? 'border-yellow-500/50 bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg shadow-yellow-500/10' 
                        : 'border-gray-700 bg-gray-800 hover:bg-gray-750'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold text-white pr-4">{notice.title}</h3>
                      <div className={`flex flex-col items-center p-3 rounded-lg min-w-[80px] ${
                        isRecent 
                          ? 'bg-yellow-600 text-gray-900' 
                          : 'bg-gray-700 text-gray-300'
                      }`}>
                        <span className="text-lg font-bold">{dateInfo.day}</span>
                        <span className="text-xs font-medium uppercase">{dateInfo.month}</span>
                        <span className="text-xs">{dateInfo.year}</span>
                      </div>
                    </div>
                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {notice.content}
                    </div>
                    {isRecent && (
                      <div className="mt-3 flex items-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        <span className="text-yellow-400 text-sm font-medium">Recent Notice</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 