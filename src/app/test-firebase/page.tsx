"use client";
import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function TestFirebasePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const testConnection = () => {
    setMessage("Testing Firebase connection...");
    console.log("Firebase Auth object:", auth);
    console.log("Firebase config:", auth.app.options);
    setMessage("Firebase Auth object logged to console. Check browser console for details.");
  };

  const testLogin = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      console.log("Attempting login with:", email, password);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("Login successful:", userCredential.user);
      setMessage("Login successful! User: " + userCredential.user.email);
    } catch (error: any) {
      console.error("Login error:", error);
      setMessage("Login failed: " + error.code + " - " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const testCreateUser = async () => {
    setLoading(true);
    setMessage("");
    
    try {
      console.log("Attempting to create user:", email, password);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("User created successfully:", userCredential.user);
      setMessage("User created successfully! User: " + userCredential.user.email);
    } catch (error: any) {
      console.error("Create user error:", error);
      setMessage("Create user failed: " + error.code + " - " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Firebase Test Page</h1>
          
          <div className="space-y-4">
            <button
              onClick={testConnection}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Test Firebase Connection
            </button>
            
            <div className="border-t pt-4">
              <h2 className="text-lg font-semibold mb-4">Test Authentication</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                    placeholder="test@example.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-black"
                    placeholder="password"
                  />
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={testLogin}
                    disabled={loading}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    Test Login
                  </button>
                  
                  <button
                    onClick={testCreateUser}
                    disabled={loading}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:opacity-50"
                  >
                    Create Test User
                  </button>
                </div>
              </div>
            </div>
            
            {message && (
              <div className="mt-4 p-4 bg-gray-100 rounded">
                <p className="text-sm">{message}</p>
              </div>
            )}
            
            <div className="mt-6 p-4 bg-yellow-50 rounded">
              <h3 className="font-semibold text-yellow-800 mb-2">Instructions:</h3>
              <ol className="text-sm text-yellow-700 space-y-1">
                <li>1. Click "Test Firebase Connection" and check browser console</li>
                <li>2. Enter email/password and click "Create Test User" to create a user</li>
                <li>3. Try "Test Login" with the same credentials</li>
                <li>4. Check browser console for detailed error messages</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 