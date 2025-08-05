"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp, getDocs, query, where } from "firebase/firestore";
import { uploadDirectToR2 } from "@/lib/clientUpload";

export default function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        setError("File size too large (max 10 MB)");
        setImageFile(null);
        if (imageInputRef.current) imageInputRef.current.value = "";
        return;
      }
      setError("");
      setImageFile(file);
    }
  };

  const uploadFile = async (file: File, folder: string): Promise<string> => {
    const result = await uploadDirectToR2(file, folder);
    return result.url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName.trim()) {
      setError("Category name is required");
      return;
    }
    if (!imageFile) {
      setError("Please select an image for the category");
      return;
    }
    // File size check before upload (extra safety)
    if (imageFile.size > MAX_FILE_SIZE) {
      setError("File size too large (max 10 MB)");
      setImageFile(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      // Check for duplicate category name (case-insensitive)
      const categoriesSnapshot = await getDocs(collection(db, "categories"));
      const exists = categoriesSnapshot.docs.some(doc => doc.data().name.trim().toLowerCase() === categoryName.trim().toLowerCase());
      if (exists) {
        setError("Category already exists");
        setIsLoading(false);
        return;
      }
      // Upload image to Cloudinary
      const imageUrl = await uploadFile(imageFile, 'categories/images');
      await addDoc(collection(db, "categories"), {
        name: categoryName.trim(),
        imageUrl,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      setSuccess("Category added successfully!");
      setCategoryName("");
      setImageFile(null);
      if (imageInputRef.current) imageInputRef.current.value = "";
      
      // Redirect to categories list after a short delay
      setTimeout(() => {
        router.push("/admin/dashboard/categories");
      }, 1500);
    } catch (error) {
      console.error("Error adding category:", error);
      setError("Failed to add category. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Add New Category</h1>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded mb-4">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                Category Name
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="Enter category name"
                disabled={isLoading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Image *
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={imageInputRef}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                disabled={isLoading}
                required
              />
              {imageFile && (
                <p className="text-sm text-gray-600 mt-1">Selected: {imageFile.name}</p>
              )}
              {error && error.includes("File size too large") && (
                <p className="text-sm text-red-500 mt-1">{error}</p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Adding..." : "Add Category"}
              </button>
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard/categories")}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              >
                View All Categories
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
} 