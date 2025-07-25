"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { uploadDirectToR2 } from "@/lib/clientUpload";

const languages = ["English", "Malayalam", "Hindi", "Tamil"];

interface Sermon {
  id: string;
  title: string;
  date: string;
  preacher: string;
  language: string;
  category: string;
  imageUrl: string;
  audioUrl: string;
}

export default function EditSermonPage() {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    preacher: "",
    language: "",
    category: ""
  });
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [existingAudioUrl, setExistingAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [sermon, setSermon] = useState<Sermon | null>(null);
  const [categoryImage, setCategoryImage] = useState<string>("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);
  
  const audioInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const params = useParams();
  const sermonId = params.id as string;

  useEffect(() => {
    // Load sermon data from localStorage
    const editSermon = localStorage.getItem("editSermon");
    if (editSermon) {
      const sermonData = JSON.parse(editSermon) as Sermon;
      setSermon(sermonData);
      setFormData({
        title: sermonData.title,
        date: sermonData.date,
        preacher: sermonData.preacher,
        language: sermonData.language,
        category: sermonData.category
      });
      setExistingAudioUrl(sermonData.audioUrl);
    } else {
      router.push("/admin/dashboard/sermons");
    }
  }, [router]);

  useEffect(() => {
    // Fetch categories from Firestore
    const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const cats = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as { id: string; name: string }[];
      setCategories(cats);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    // Fetch image for the current category
    const fetchCategoryImage = async () => {
      if (formData.category) {
        const querySnapshot = await getDocs(collection(db, 'categories'));
        const catDoc = querySnapshot.docs.find(doc => doc.data().name === formData.category);
        if (catDoc) {
          const data = catDoc.data();
          setCategoryImage(data.imageUrl || "");
        } else {
          setCategoryImage("");
        }
      } else {
        setCategoryImage("");
      }
    };
    fetchCategoryImage();
  }, [formData.category]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleAudioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Validate file type
      if (!file.type.startsWith('audio/')) {
        setError('Please select a valid audio file (mp3, wav, etc.)');
        setAudioFile(null);
        if (audioInputRef.current) audioInputRef.current.value = '';
        return;
      }
      // Validate file size (max 100MB)
      if (file.size > 100 * 1024 * 1024) {
        setError('Audio file size must be less than 100MB');
        setAudioFile(null);
        if (audioInputRef.current) audioInputRef.current.value = '';
        return;
      }
      setAudioFile(file);
      setError("");
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

      let audioUrl = existingAudioUrl;

      // Upload new audio if selected
      if (audioFile) {
        audioUrl = await uploadFile(audioFile, 'sermons/audio');
      }

      // Update in Firestore
      const sermonRef = doc(db, "sermons", sermonId);
      const updateData: any = {
        ...formData,
        audioUrl,
        updatedAt: new Date()
      };
      if (sermon && sermon.imageUrl) updateData.imageUrl = sermon.imageUrl;
      await updateDoc(sermonRef, updateData);

      setSuccess(true);
      
      // Clear localStorage
      localStorage.removeItem("editSermon");
      
      // Redirect to sermons list after 2 seconds
      setTimeout(() => {
        router.push("/admin/dashboard/sermons");
      }, 2000);

    } catch (error: any) {
      console.error("Error updating sermon:", error);
      setError(error.message || "Failed to update sermon. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!sermon) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading sermon...</p>
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
            <h1 className="text-2xl font-bold">Edit Sermon</h1>
            <button
              onClick={() => router.push("/admin/dashboard/sermons")}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
            >
              Back to Sermons
            </button>
          </div>

          {success && (
            <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
              Sermon updated successfully! Redirecting to sermons list...
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Category image preview */}
          {categoryImage && (
            <div className="mb-4 flex justify-center">
              <img src={categoryImage} alt="Category Preview" className="w-32 h-32 object-cover rounded shadow" />
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Audio File Upload
              </label>
              <input
                ref={audioInputRef}
                type="file"
                accept="audio/*"
                onChange={handleAudioChange}
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {existingAudioUrl && !audioFile && (
                <p className="text-sm text-gray-600 mt-1">
                  Current audio: <a href={existingAudioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Download current audio</a>
                </p>
              )}
              {audioFile && (
                <p className="text-sm text-gray-600 mt-1">
                  New audio selected: {audioFile.name}
                </p>
              )}
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Updating..." : "Update Sermon"}
              </button>
              
              <button
                type="button"
                onClick={() => router.push("/admin/dashboard/sermons")}
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