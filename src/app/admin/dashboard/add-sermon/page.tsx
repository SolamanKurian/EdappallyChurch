"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadDirectToR2 } from '@/lib/clientUpload';

const languages = ["English", "Malayalam", "Hindi", "Tamil"];

interface Category {
  id: string;
  name: string;
}

export default function AddSermonPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    preacher: "",
    language: "",
    category: ""
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name
      })) as Category[];
      
      // Sort categories alphabetically
      categoriesData.sort((a, b) => a.name.localeCompare(b.name));
      
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setIsLoadingCategories(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type - only allow audio files
      if (!file.type.startsWith('audio/')) {
        setError("Please select a valid audio file.");
        setAudioFile(null);
        if (audioInputRef.current) audioInputRef.current.value = "";
        return;
      }
      
      // Validate specific audio formats
      const allowedTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/m4a', 'audio/aac'];
      if (!allowedTypes.includes(file.type)) {
        setError("Only MP3, WAV, M4A, and AAC audio files are supported.");
        setAudioFile(null);
        if (audioInputRef.current) audioInputRef.current.value = "";
        return;
      }
      
      setAudioFile(file);
      setError(""); // Clear any previous errors
    }
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

    try {
      // Validate required fields
      if (!formData.title || !formData.date || !formData.preacher || !formData.language || !formData.category) {
        throw new Error("Please fill in all required fields");
      }

      if (!audioFile) {
        throw new Error("Please select an audio file");
      }

      // Upload audio to Cloudinary
      const audioUrl = await uploadFile(audioFile, 'sermons/audio');

      // Save metadata to Firestore
      const sermonData = {
        ...formData,
        audioUrl,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      console.log("Saving sermon data to Firestore:", sermonData);
      const docRef = await addDoc(collection(db, "sermons"), sermonData);
      console.log("Sermon saved with ID:", docRef.id);

      setSuccess(true);
      setFormData({
        title: "",
        date: "",
        preacher: "",
        language: "",
        category: ""
      });
      setAudioFile(null);
      
      // Reset file inputs
      if (audioInputRef.current) audioInputRef.current.value = "";

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard");
      }, 2000);

    } catch (error: any) {
      console.error("Error adding sermon:", error);
      setError(error.message || "Failed to add sermon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Add New Sermon</h1>
            <button
              onClick={() => router.push("/admin/dashboard")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Sermon added successfully! Redirecting to dashboard...
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
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
                  placeholder="Sermon title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date *
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preacher *
                </label>
                <input
                  type="text"
                  name="preacher"
                  value={formData.preacher}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  placeholder="Preacher name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Language *
                </label>
                <select
                  name="language"
                  value={formData.language}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                  required
                >
                  <option value="">Select Language</option>
                  {languages.map((lang) => (
                    <option key={lang} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
                disabled={isLoadingCategories}
              >
                <option value="">
                  {isLoadingCategories ? "Loading categories..." : "Select Category"}
                </option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
              {categories.length === 0 && !isLoadingCategories && (
                <p className="text-sm text-orange-600 mt-1">
                  No categories available. Please add categories first.
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio File * (MP3, WAV, M4A, AAC)
              </label>
              <input
                type="file"
                accept="audio/mpeg,audio/mp3,audio/wav,audio/m4a,audio/aac"
                onChange={handleAudioChange}
                ref={audioInputRef}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                required
              />
              {audioFile && (
                <div className="mt-2 text-sm text-gray-600">
                  <p>Selected: {audioFile.name}</p>
                  <p>Size: {(audioFile.size / (1024 * 1024)).toFixed(2)} MB</p>
                  <p>Type: {audioFile.type}</p>
                </div>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: MP3, WAV, M4A, AAC (No size limit)
              </p>
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Uploading..." : "Add Sermon"}
              </button>
              
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard")}
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