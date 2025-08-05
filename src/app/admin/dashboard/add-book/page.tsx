"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadDirectToR2 } from "@/lib/clientUpload";

export default function AddBookPage() {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    language: ""
  });
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  const coverImageRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    // Validate image file
    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file for the cover");
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError("File size too large (max 10 MB)");
      setCoverImage(null);
      if (coverImageRef.current) coverImageRef.current.value = "";
      return;
    }
    setCoverImage(file);
    setError("");
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const result = await uploadDirectToR2(file, folder);
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    setUploadProgress(0);

    try {
      // Validate required fields
      if (!formData.title || !formData.author || !formData.language) {
        throw new Error("Please fill in all required fields");
      }
      if (!coverImage) {
        throw new Error("Please select a cover image");
      }
      // File size check before upload (extra safety)
      if (coverImage.size > MAX_FILE_SIZE) {
        setError("File size too large (max 10 MB)");
        setCoverImage(null);
        if (coverImageRef.current) coverImageRef.current.value = "";
        setLoading(false);
        return;
      }
      setUploadProgress(10);
      // Upload cover image
      const coverImageUrl = await uploadFile(coverImage, 'books/covers');
      setUploadProgress(90);
      // Save to Firestore
      const bookData = {
        ...formData,
        coverImageUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      await addDoc(collection(db, "books"), bookData);
      setUploadProgress(100);
      setSuccess(true);
      setFormData({
        title: "",
        author: "",
        language: ""
      });
      setCoverImage(null);
      if (coverImageRef.current) coverImageRef.current.value = "";
      setTimeout(() => {
        router.push("/admin/dashboard/books");
      }, 2000);
    } catch (error: any) {
      console.error("Error adding book:", error);
      setError(error.message || "Failed to add book. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Add New Book</h1>
            <button
              onClick={() => router.push("/admin/dashboard/books")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Books
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Book added successfully! Redirecting to books list...
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {uploadProgress > 0 && uploadProgress < 100 && (
            <div className="mb-4 bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded">
              <div className="flex items-center justify-between mb-2">
                <span>Uploading files...</span>
                <span>{uploadProgress}%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Book title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Author *
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Author name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language *
                </label>
                <input
                  type="text"
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Language"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cover Image *
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={coverImageRef}
                  onChange={handleFileChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
                {coverImage && (
                  <p className="text-sm text-gray-600 mt-1">Selected: {coverImage.name}</p>
                )}
                {error && error.includes("File size too large") && (
                  <p className="text-sm text-red-500 mt-1">{error}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition font-semibold disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
} 