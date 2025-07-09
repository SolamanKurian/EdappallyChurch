"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AdminAuthWrapperProps {
  children: React.ReactNode;
}

export default function AdminAuthWrapper({ children }: AdminAuthWrapperProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [sessionKey, setSessionKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = () => {
      // Check if admin is logged in
      const adminSession = localStorage.getItem("adminSession");
      
      if (!adminSession) {
        setIsAuthenticated(false);
        setIsLoading(false);
        router.replace("/admin/login");
        return;
      }

      try {
        // Parse and validate session
        const sessionData = JSON.parse(adminSession);
        
        // Check if session is not expired (24 hours)
        const isExpired = Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000;
        
        if (isExpired) {
          localStorage.removeItem("adminSession");
          setIsAuthenticated(false);
          setIsLoading(false);
          router.replace("/admin/login");
          return;
        }

        setIsAuthenticated(true);
        setIsLoading(false);
      } catch (error) {
        // Invalid session data
        localStorage.removeItem("adminSession");
        setIsAuthenticated(false);
        setIsLoading(false);
        router.replace("/admin/login");
        return;
      }
    };

    checkAuth();

    // Listen for storage changes (when logout happens)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "adminSession") {
        setSessionKey(prev => prev + 1);
        // Small delay to ensure localStorage is updated
        setTimeout(checkAuth, 100);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Check less frequently (every 5 seconds instead of 1 second)
    const interval = setInterval(checkAuth, 5000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [router, sessionKey]);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Checking authentication...</p>
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return <>{children}</>;
} 