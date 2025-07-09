"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { db } from "@/lib/firebase";
import { collection, getDocs, deleteDoc, doc, updateDoc, serverTimestamp } from "firebase/firestore";

interface Category {
  id: string;
  name: string;
  createdAt: any;
  updatedAt: any;
}

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      
      // Sort by creation date (newest first)
      categoriesData.sort((a, b) => b.createdAt?.toDate() - a.createdAt?.toDate());
      
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingId(category.id);
    setEditName(category.name);
  };

  const handleUpdate = async () => {
    if (!editName.trim()) {
      setError("Category name is required");
      return;
    }

    setIsUpdating(true);
    setError("");

    try {
      await updateDoc(doc(db, "categories", editingId!), {
        name: editName.trim(),
        updatedAt: serverTimestamp()
      });

      setCategories(prev => prev.map(cat => 
        cat.id === editingId 
          ? { ...cat, name: editName.trim() }
          : cat
      ));

      setEditingId(null);
      setEditName("");
    } catch (error) {
      console.error("Error updating category:", error);
      setError("Failed to update category");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async (categoryId: string, categoryName: string) => {
    if (!confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "categories", categoryId));
      setCategories(prev => prev.filter(cat => cat.id !== categoryId));
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Failed to delete category");
    }
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    return timestamp.toDate().toLocaleDateString();
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-2 text-gray-600">Loading categories...</p>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Categories</h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/dashboard/add-category")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Category
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {categories.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No categories found</p>
              <button
                onClick={() => router.push("/admin/dashboard/add-category")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Category
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Updated
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {editingId === category.id ? (
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <span className="text-sm font-medium text-gray-900">
                            {category.name}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(category.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(category.updatedAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {editingId === category.id ? (
                          <div className="flex gap-2">
                            <button
                              onClick={handleUpdate}
                              disabled={isUpdating}
                              className="text-green-600 hover:text-green-900 disabled:opacity-50"
                            >
                              {isUpdating ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={() => {
                                setEditingId(null);
                                setEditName("");
                              }}
                              className="text-gray-600 hover:text-gray-900"
                            >
                              Cancel
                            </button>
                          </div>
                        ) : (
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(category.id, category.name)}
                              className="text-red-600 hover:text-red-900"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
} 