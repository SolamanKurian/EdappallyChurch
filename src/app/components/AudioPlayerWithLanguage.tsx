"use client";

import { useState } from "react";

const languages = [
  { value: "en", label: "English" },
  { value: "ml", label: "Malayalam" },
];

export default function AudioPlayerWithLanguage() {
  const [lang, setLang] = useState("en");
  const [playing, setPlaying] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <button
        className="bg-blue-600 text-white rounded-full px-6 py-2 font-semibold shadow hover:bg-blue-700 transition"
        onClick={() => setPlaying((p) => !p)}
      >
        {playing ? "Pause" : "Play"}
      </button>
      <select
        className="border rounded px-3 py-2 focus:outline-none focus:ring text-black"
        value={lang}
        onChange={(e) => setLang(e.target.value)}
      >
        {languages.map((l) => (
          <option key={l.value} value={l.value}>
            {l.label}
          </option>
        ))}
      </select>
    </div>
  );
} 