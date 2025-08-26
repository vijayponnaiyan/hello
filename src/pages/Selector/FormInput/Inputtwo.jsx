import React, { useState } from "react";
import { UseBlogs } from "../../../hooks/contex/UseContexProvider";
import { motion } from "framer-motion";

export default function Inputtwo() {
  const { bible, setSelectedBook } = UseBlogs();
  const [selectedBook, setSelectedBookLocal] = useState("");

  if (!bible || bible.length === 0) {
    return null;
  }

  const handleChange = (e) => {
    const bookName = e.target.value;
    setSelectedBookLocal(bookName);
    setSelectedBook(bookName); // ✅ store globally
    console.log("Selected Book:", bookName);
  };

  return (
    <motion.div
      className="max-w-sm mx-auto mt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <form>
        <label
          htmlFor="book-select"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Book
        </label>
        <select
          id="book-select"
          value={selectedBook}
          onChange={handleChange}
          className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="" disabled>
            Choose a book
          </option>
          {bible.map((book, index) => (
            <option key={index} value={book.id}>
              {book.name}
            </option>
          ))}
        </select>
      </form>
    </motion.div>
  );
}
