"use client";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!auth) return;
    // Test Firebase connection
    console.log("Firebase Auth initialized:", auth);
    console.log("Current auth state:", auth.currentUser);
    
    // Listen for auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("Auth state changed:", user);
      if (user) {
        console.log("User is signed in:", user.email);
        // If user is already signed in via Firebase, create session
        localStorage.setItem("adminSession", JSON.stringify({
          uid: user.uid,
          email: user.email,
          timestamp: Date.now()
        }));
        router.push("/admin/dashboard");
        return;
      } else {
        console.log("User is signed out");
      }
    });

    // Check if user is already authenticated via localStorage
    const adminSession = localStorage.getItem("adminSession");
    
    if (adminSession) {
      try {
        const sessionData = JSON.parse(adminSession);
        // Check if session is not expired (24 hours)
        const isExpired = Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000;
        
        if (!isExpired) {
          console.log("Valid session found, redirecting to dashboard");
          router.push("/admin/dashboard");
          return;
        } else {
          console.log("Session expired, removing");
          localStorage.removeItem("adminSession");
        }
      } catch (error) {
        console.log("Invalid session data, removing");
        localStorage.removeItem("adminSession");
      }
    }
    
    setIsCheckingAuth(false);
    
    // Cleanup listener
    return () => unsubscribe();
  }, [router]);

  const getErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'No account found with this email address.';
      case 'auth/wrong-password':
        return 'Incorrect password. Please try again.';
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/too-many-requests':
        return 'Too many failed login attempts. Please try again later.';
      case 'auth/network-request-failed':
        return 'Network error. Please check your internet connection.';
      default:
        return 'Login failed. Please check your credentials and try again.';
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!auth) {
      setError("Firebase Auth is not available.");
      setLoading(false);
      return;
    }

    try {
      console.log("Attempting login with email:", email);
      console.log("Firebase Auth object:", auth);
      console.log("Current Firebase user before login:", auth.currentUser);
      
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      console.log("Login successful for user:", user.email);
      console.log("User UID:", user.uid);
      
      // Store session in localStorage
      const sessionData = {
        uid: user.uid,
        email: user.email,
        timestamp: Date.now()
      };
      
      console.log("Storing session data:", sessionData);
      localStorage.setItem("adminSession", JSON.stringify(sessionData));
      
      console.log("Session stored, redirecting to dashboard");
      
      // Redirect to admin dashboard
      router.push("/admin/dashboard");
    } catch (error: any) {
      console.error("Login error details:", error);
      console.error("Error code:", error.code);
      console.error("Error message:", error.message);
      
      const errorMessage = getErrorMessage(error.code);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (isCheckingAuth) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
        
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="admin@church.com"
              required
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter your password"
              required
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm text-center bg-red-50 p-2 rounded">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        
      </div>
    </main>
  );
} 