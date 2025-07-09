"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

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

export default function BooksListPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Book[];
      
      // Sort by creation date (newest first)
      booksData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (book: Book) => {
    // Store book data in localStorage for the edit form
    localStorage.setItem("editBook", JSON.stringify(book));
    router.push(`/admin/dashboard/edit-book/${book.id}`);
  };

  const handleDelete = async (book: Book) => {
    if (!confirm("Are you sure you want to delete this book? This will also delete the cover image and PDF file. This action cannot be undone.")) {
      return;
    }

    setDeletingId(book.id);
    
    try {
      // Delete files from Storage
      if (book.coverImagePath) {
        const coverImageRef = ref(storage, book.coverImagePath);
        await deleteObject(coverImageRef);
      }
      
      if (book.pdfPath) {
        const pdfRef = ref(storage, book.pdfPath);
        await deleteObject(pdfRef);
      }

      // Delete from Firestore
      await deleteDoc(doc(db, "books", book.id));
      
      // Remove from local state
      setBooks(books.filter(b => b.id !== book.id));
      
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading books...</p>
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
            <h1 className="text-2xl font-bold">Manage Books</h1>
            <div className="flex gap-2">
              <button
                onClick={() => router.push("/admin/dashboard/add-book")}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add New Book
              </button>
              <button
                onClick={() => router.push("/admin/dashboard")}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
              >
                Back to Dashboard
              </button>
            </div>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No books found.</p>
              <button
                onClick={() => router.push("/admin/dashboard/add-book")}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                Add Your First Book
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cover
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Title
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Author
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Language
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {books.map((book) => (
                    <tr key={book.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex-shrink-0 h-16 w-12">
                          <img
                            className="h-16 w-12 object-cover rounded"
                            src={book.coverImageUrl}
                            alt={book.title}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='64' viewBox='0 0 48 64'%3E%3Crect width='48' height='64' fill='%23f3f4f6'/%3E%3Ctext x='24' y='32' font-family='Arial' font-size='8' fill='%236b7280' text-anchor='middle' dy='.3em'%3EBook%3C/text%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {book.title}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {book.author}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                          {book.language}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(book)}
                            className="text-blue-600 hover:text-blue-900 bg-blue-50 px-2 py-1 rounded text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(book)}
                            disabled={deletingId === book.id}
                            className="text-red-600 hover:text-red-900 bg-red-50 px-2 py-1 rounded text-xs disabled:opacity-50"
                          >
                            {deletingId === book.id ? "Deleting..." : "Delete"}
                          </button>
                        </div>
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