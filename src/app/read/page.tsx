"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import BookTile from "@/app/components/BookTile";

interface Book {
  id: string;
  title: string;
  author: string;
  language: string;
  coverImageUrl: string;
  pdfUrl: string;
}

export default function ReadPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      console.log("Fetching books from Firestore...");
      const booksQuery = query(
        collection(db, "books"),
        orderBy("createdAt", "desc")
      );
      
      const querySnapshot = await getDocs(booksQuery);
      console.log("Books query result:", querySnapshot.docs.length, "documents");
      
      const booksData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Book[];
      
      console.log("Processed books data:", booksData);
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const languages = ["All", ...Array.from(new Set(books.map((b) => b.language)))];

  const filtered = books.filter((b) => {
    const matchesLang = language === "All" || b.language === language;
    const matchesSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase());
    return matchesLang && matchesSearch;
  });
  const totalPages = Math.ceil(filtered.length / 8);
  const paginated = filtered.slice((page - 1) * 8, page * 8);

  if (isLoading) {
    return (
      <main className="container mx-auto py-8 px-2 sm:px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading books...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Read Church Books</h1>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between w-full">
        <input
          type="text"
          placeholder="Search by Book Name or Author"
          className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>
      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 px-0 sm:px-0">
        {paginated.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No books found.</div>
        ) : (
          paginated.map((book) => (
            <div key={book.id} className="w-[95vw] sm:w-full mx-auto">
              <BookTile
                cover={book.coverImageUrl}
                title={book.title}
                author={book.author}
                language={book.language}
              />
            </div>
          ))
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button
            className="px-3 py-2 rounded border disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={`px-3 py-1 rounded border ${page === i + 1 ? "bg-amber-900 text-white" : ""}`}
              onClick={() => setPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
          <button
            className="px-3 py-2 rounded border disabled:opacity-50 hover:bg-gray-100"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            aria-label="Next page"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </main>
  );
} 