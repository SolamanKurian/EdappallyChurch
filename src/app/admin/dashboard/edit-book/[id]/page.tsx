"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadDirectToR2 } from "@/lib/clientUpload";

interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  coverImageUrl: string;
  pdfUrl: string;
  coverImagePath: string;
  pdfPath: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function EditBookPage() {
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
  const [book, setBook] = useState<Book | null>(null);
  
  const coverImageRef = useRef<HTMLInputElement>(null);
  
  const router = useRouter();
  const params = useParams();
  const bookId = params.id as string;

  useEffect(() => {
    // Load book data from localStorage
    const editBook = localStorage.getItem("editBook");
    if (editBook) {
      const bookData = JSON.parse(editBook) as Book;
      setBook(bookData);
      setFormData({
        title: bookData.title,
        author: bookData.author,
        language: bookData.language
      });
    } else {
      router.push("/admin/dashboard/books");
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'cover') => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Only handle cover image
    // Validate image file
    if (!file.type.startsWith('image/')) {
      setError("Please select a valid image file for the cover");
      return;
    }
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setError("Cover image must be less than 5MB");
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

      if (!book) {
        throw new Error("Book data not found");
      }

      let coverImageUrl = book.coverImageUrl;

      setUploadProgress(10);

      // Upload new cover image if provided
      if (coverImage) {
        // Upload new cover image
        coverImageUrl = await uploadFile(coverImage, 'books/covers');
        setUploadProgress(40);
      }

      // Update in Firestore
      const bookRef = doc(db, "books", bookId);
      await updateDoc(bookRef, {
        ...formData,
        coverImageUrl,
        updatedAt: new Date()
      });
      setUploadProgress(100);

      setSuccess(true);
      
      // Clear localStorage
      localStorage.removeItem("editBook");
      
      // Redirect to books list after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard/books");
      }, 2000);

    } catch (error: any) {
      console.error("Error updating book:", error);
      setError(error.message || "Failed to update book. Please try again.");
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  if (!book) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading book...</p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Edit Book</h1>
            <button
              onClick={() => router.push("/admin/dashboard/books")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Books
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Book updated successfully! Redirecting to books list...
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
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language *
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              >
                <option value="">Select Language</option>
                <option value="English">English</option>
                <option value="Malayalam">Malayalam</option>
                <option value="Hindi">Hindi</option>
                <option value="Tamil">Tamil</option>
                <option value="Telugu">Telugu</option>
                <option value="Kannada">Kannada</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cover Image
              </label>
              <div className="mb-2">
                <img
                  src={book.coverImageUrl}
                  alt={book.title}
                  className="h-32 w-24 object-cover rounded border"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='128' viewBox='0 0 96 128'%3E%3Crect width='96' height='128' fill='%23f3f4f6'/%3E%3Ctext x='48' y='64' font-family='Arial' font-size='12' fill='%236b7280' text-anchor='middle' dy='.3em'%3EBook%3C/text%3E%3C/svg%3E";
                  }}
                />
              </div>
              <input
                ref={coverImageRef}
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, 'cover')}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              />
              <p className="text-sm text-gray-500 mt-1">
                Leave empty to keep current cover. Accepted formats: JPG, PNG, GIF. Max size: 5MB
              </p>
              {coverImage && (
                <p className="text-sm text-green-600 mt-1">
                  New cover selected: {coverImage.name}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Book"}
              </button>
              
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard/books")}
                className="flex-1 bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 