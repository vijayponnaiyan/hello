import React, { useState } from "react";
import { UseBlogs } from "../../../hooks/contex/UseContexProvider";
import { motion } from "framer-motion";

export default function Inputthree() {
  const { selectedTranslation, selectedBook, fetchVersesData } = UseBlogs();
  const [selectedChapter, setSelectedChapter] = useState("");
  const [selectedVerse, setSelectedVerse] = useState("");

  const handleFetchVerses = () => {
    if (
      !selectedTranslation ||
      !selectedBook ||
      !selectedChapter ||
      !selectedVerse
    ) {
      console.warn("Missing data to fetch verses.");
      return;
    }

    const chapterVerse = `${selectedChapter}:${selectedVerse}`;
    fetchVersesData(selectedTranslation, selectedBook, chapterVerse);
  };

  return (
    <motion.div
      className="max-w-sm mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleFetchVerses();
        }}
        className="flex flex-col items-center gap-4"
      >
        {/* Selectors Container */}
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {/* Chapter Selector */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="chapter-select"
              className="mb-1 text-xs font-medium text-gray-900 dark:text-white"
            >
              Chapter
            </label>
            <select
              id="chapter-select"
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-24 p-1 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="" disabled>
                -
              </option>
              {Array.from({ length: 50 }, (_, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>

          {/* Verse Selector */}
          <div className="flex flex-col items-start">
            <label
              htmlFor="verse-select"
              className="mb-1 text-xs font-medium text-gray-900 dark:text-white"
            >
              Verse
            </label>
            <select
              id="verse-select"
              value={selectedVerse}
              onChange={(e) => setSelectedVerse(e.target.value)}
              className="w-24 p-1 text-sm text-gray-900 border border-gray-300 rounded bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            >
              <option value="" disabled>
                -
              </option>
              {Array.from({ length: 30 }, (_, idx) => (
                <option key={idx + 1} value={idx + 1}>
                  {idx + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Fetch Verse Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition"
        >
          Fetch Verse
        </button>
      </form>
    </motion.div>
  );
}
