"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminRootPage() {
  const router = useRouter();

  useEffect(() => {
    // Check if user is authenticated
    const adminSession = localStorage.getItem("adminSession");
    
    if (adminSession) {
      try {
        const sessionData = JSON.parse(adminSession);
        // Check if session is not expired (24 hours)
        const isExpired = Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000;
        
        if (!isExpired) {
          // User is authenticated, redirect to dashboard
          router.push("/admin/dashboard");
          return;
        } else {
          // Session expired, remove it
          localStorage.removeItem("adminSession");
        }
      } catch (error) {
        // Invalid session data, remove it
        localStorage.removeItem("adminSession");
      }
    }
    
    // User is not authenticated, redirect to login
    router.push("/admin/login");
  }, [router]);

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Redirecting...</p>
      </div>
    </main>
  );
} 