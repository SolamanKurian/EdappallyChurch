"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PasscodePage() {
  const [currentPasscode, setCurrentPasscode] = useState("");
  const [newPasscode, setNewPasscode] = useState("");
  const [confirmPasscode, setConfirmPasscode] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCurrentPasscode();
  }, []);

  const fetchCurrentPasscode = async () => {
    try {
      const passcodeDoc = await getDoc(doc(db, "settings", "noticeBoardPasscode"));
      if (passcodeDoc.exists()) {
        setCurrentPasscode(passcodeDoc.data().passcode || "");
      } else {
        // Set default passcode if none exists
        await setDoc(doc(db, "settings", "noticeBoardPasscode"), {
          passcode: "church123"
        });
        setCurrentPasscode("church123");
      }
    } catch (error) {
      console.error("Error fetching passcode:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePasscode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newPasscode.trim()) {
      alert("Please enter a new passcode");
      return;
    }

    if (newPasscode !== confirmPasscode) {
      alert("Passcodes do not match");
      return;
    }

    if (newPasscode.length < 4) {
      alert("Passcode must be at least 4 characters long");
      return;
    }

    setSaving(true);
    
    try {
      await setDoc(doc(db, "settings", "noticeBoardPasscode"), {
        passcode: newPasscode.trim()
      });
      
      setCurrentPasscode(newPasscode.trim());
      setNewPasscode("");
      setConfirmPasscode("");
      setShowForm(false);
      alert("Passcode updated successfully!");
    } catch (error) {
      console.error("Error updating passcode:", error);
      alert("Failed to update passcode. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Notice Board Passcode</h1>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Current Passcode</h3>
            <div className="bg-gray-100 p-3 rounded-lg">
              <code className="text-lg font-mono">{currentPasscode}</code>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              This is the passcode that church members need to enter to access the notice board.
            </p>
          </div>

          {!showForm ? (
            <button
              onClick={() => setShowForm(true)}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
            >
              Change Passcode
            </button>
          ) : (
            <form onSubmit={handleUpdatePasscode} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Passcode
                </label>
                <input
                  type="password"
                  value={newPasscode}
                  onChange={(e) => setNewPasscode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Enter new passcode"
                  minLength={4}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm New Passcode
                </label>
                <input
                  type="password"
                  value={confirmPasscode}
                  onChange={(e) => setConfirmPasscode(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Confirm new passcode"
                  minLength={4}
                  required
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition disabled:opacity-50"
                >
                  {saving ? "Updating..." : "Update Passcode"}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setNewPasscode("");
                    setConfirmPasscode("");
                  }}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Important Notes:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Passcode must be at least 4 characters long</li>
              <li>• Share this passcode only with church members</li>
              <li>• Change the passcode regularly for security</li>
              <li>• Default passcode is "church123" if none is set</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
} 