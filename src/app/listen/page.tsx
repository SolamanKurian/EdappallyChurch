"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import SermonTile from "@/app/components/SermonTile";

interface Sermon {
  id: string;
  title: string;
  date: string;
  preacher: string;
  imageUrl: string;
  audioUrl: string;
  language: string;
  category: string;
}

interface Category {
  id: string;
  name: string;
  imageUrl?: string;
}

const ITEMS_PER_PAGE = 8;

export default function ListenPage() {
  const [sermons, setSermons] = useState<Sermon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchSermons();
    fetchCategories();
  }, []);

  const fetchSermons = async () => {
    try {
      console.log("Fetching sermons from Firestore...");
      const sermonsQuery = query(
        collection(db, "sermons"),
        orderBy("date", "desc")
      );
      
      const querySnapshot = await getDocs(sermonsQuery);
      console.log("Sermons query result:", querySnapshot.docs.length, "documents");
      
      const sermonsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Sermon[];
      
      // Filter sermons that are not in the future and sort by date
      const currentDate = new Date();
      const validSermons = sermonsData
        .filter(sermon => {
          const sermonDate = new Date(sermon.date);
          return sermonDate <= currentDate;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      console.log("Processed sermons data:", validSermons);
      setSermons(validSermons);
    } catch (error) {
      console.error("Error fetching sermons:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      console.log("Fetching categories from Firestore...");
      const categoriesQuery = query(
        collection(db, "categories"),
        orderBy("name", "asc")
      );
      
      const querySnapshot = await getDocs(categoriesQuery);
      console.log("Categories query result:", querySnapshot.docs.length, "documents");
      
      const categoriesData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Category[];
      
      console.log("Processed categories data:", categoriesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoadingCategories(false);
    }
  };

  // Filtered and paginated data
  const filtered = sermons.filter((s) => {
    const matchesCategory = category === "All" || s.category === category;
    const matchesSearch =
      s.preacher.toLowerCase().includes(search.toLowerCase()) ||
      s.title.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  if (isLoading || isLoadingCategories) {
    return (
      <main className="container mx-auto py-8 px-2 sm:px-4">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-gray-600">Loading sermons...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto py-8 px-2 sm:px-4">
      <h1 className="text-3xl font-bold mb-8 text-center sm:text-left">Listen to Audio Sermons</h1>
      {/* Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between w-full">
        <input
          type="text"
          placeholder="Search by Preacher or Title"
          className="border rounded px-4 py-2 w-full md:w-1/3 focus:outline-none focus:ring"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          className="border rounded px-4 py-2 w-full md:w-1/4 focus:outline-none focus:ring"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            setPage(1);
          }}
        >
          <option value="All">All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
      {/* Sermon Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8 px-0 sm:px-0">
        {paginated.length === 0 ? (
          <div className="col-span-full text-center text-gray-500">No sermons found.</div>
        ) : (
          paginated.map((sermon) => {
            const cat = categories.find(c => c.name === sermon.category);
            return (
              <div key={sermon.id} className="w-[95vw] sm:w-full mx-auto">
                <SermonTile
                  id={sermon.id}
                  image={cat?.imageUrl || ""}
                  title={sermon.title}
                  date={sermon.date}
                  preacher={sermon.preacher}
                  audioUrl={sermon.audioUrl}
                  language={sermon.language}
                  category={sermon.category}
                />
              </div>
            );
          })
        )}
      </div>
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex flex-wrap justify-center gap-2">
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