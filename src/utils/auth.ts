import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";

export const logout = async () => {
  try {
    // Sign out from Firebase Auth
    await signOut(auth);
  } catch (error) {
    console.error("Firebase logout error:", error);
  }
  
  // Clear the session
  localStorage.removeItem("adminSession");
  
  // Clear any other potential auth-related data
  sessionStorage.clear();
  
  // Force a complete page reload to ensure auth wrapper re-evaluates
  // Use replace to prevent back button from going to dashboard
  window.location.replace("/admin/login");
};

export const isAuthenticated = () => {
  const adminSession = localStorage.getItem("adminSession");
  
  if (!adminSession) {
    return false;
  }

  try {
    const sessionData = JSON.parse(adminSession);
    // Check if session is not expired (24 hours)
    const isExpired = Date.now() - sessionData.timestamp > 24 * 60 * 60 * 1000;
    
    return !isExpired;
  } catch (error) {
    return false;
  }
};

export const getCurrentUser = () => {
  const adminSession = localStorage.getItem("adminSession");
  
  if (!adminSession) {
    return null;
  }

  try {
    const sessionData = JSON.parse(adminSession);
    return sessionData;
  } catch (error) {
    return null;
  }
}; 