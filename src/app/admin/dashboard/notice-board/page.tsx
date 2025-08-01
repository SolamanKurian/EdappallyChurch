"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc, addDoc, updateDoc, orderBy, query } from "firebase/firestore";
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
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: ""
  });
  const router = useRouter();

  useEffect(() => {
    fetchNotices();
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

  const handleAdd = () => {
    setFormData({ title: "", content: "" });
    setShowAddForm(true);
    setShowEditForm(false);
  };

  const handleEdit = (notice: Notice) => {
    setEditingNotice(notice);
    setFormData({
      title: notice.title,
      content: notice.content
    });
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const currentDate = new Date().toISOString();
      
      if (showEditForm && editingNotice) {
        // Update existing notice
        await updateDoc(doc(db, "notices", editingNotice.id), {
          title: formData.title.trim(),
          content: formData.content.trim(),
          date: currentDate
        });
      } else {
        // Add new notice
        await addDoc(collection(db, "notices"), {
          title: formData.title.trim(),
          content: formData.content.trim(),
          date: currentDate,
          createdAt: currentDate
        });
      }

      setShowAddForm(false);
      setShowEditForm(false);
      setEditingNotice(null);
      setFormData({ title: "", content: "" });
      fetchNotices();
    } catch (error) {
      console.error("Error saving notice:", error);
      alert("Failed to save notice. Please try again.");
    }
  };

  const handleDelete = async (notice: Notice) => {
    if (!confirm("Are you sure you want to delete this notice? This action cannot be undone.")) {
      return;
    }

    setDeletingId(notice.id);
    
    try {
      await deleteDoc(doc(db, "notices", notice.id));
      setNotices(notices.filter(n => n.id !== notice.id));
    } catch (error) {
      console.error("Error deleting notice:", error);
      alert("Failed to delete notice. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading notices...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Manage Notice Board</h1>
            <div className="flex gap-2">
              <button
                onClick={handleAdd}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Notice
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {/* Add/Edit Form */}
          {(showAddForm || showEditForm) && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">
                {showEditForm ? "Edit Notice" : "Add New Notice"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    placeholder="Enter notice title"
                    maxLength={100}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Content
                  </label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                    rows={6}
                    placeholder="Enter notice content"
                    maxLength={1000}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                  >
                    {showEditForm ? "Update Notice" : "Add Notice"}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setShowEditForm(false);
                      setEditingNotice(null);
                      setFormData({ title: "", content: "" });
                    }}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          )}

          {notices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No notices found.</p>
              <button
                onClick={handleAdd}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Notice
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {notices.map((notice) => (
                <div key={notice.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{notice.title}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(notice)}
                        className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(notice)}
                        disabled={deletingId === notice.id}
                        className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded text-xs disabled:opacity-50"
                      >
                        {deletingId === notice.id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-2 whitespace-pre-wrap">{notice.content}</p>
                  <p className="text-sm text-gray-500">Posted: {formatDate(notice.date)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 