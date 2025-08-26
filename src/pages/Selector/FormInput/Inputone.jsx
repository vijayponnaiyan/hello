import React, { useState } from "react";
import { UseBlogs } from "../../../hooks/contex/UseContexProvider";

export default function InputOne() {
  const { translations, loading, fetchBooks, setSelectedTranslation } =
    UseBlogs();
  const [selectedIdentifier, setSelectedIdentifier] = useState("");

  const handleChange = (e) => {
    const identifier = e.target.value;
    setSelectedIdentifier(identifier);
    setSelectedTranslation(identifier); // ✅ store globally
    fetchBooks(identifier);
  };

  return (
    <div>
      <form className="max-w-sm mx-auto">
        <label
          htmlFor="translation-select"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select Translation
        </label>
        <select
          id="translation-select"
          value={selectedIdentifier}
          onChange={handleChange}
          className="block w-full p-2 mb-6 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
        >
          <option value="" disabled>
            {loading ? "Loading translations..." : "Choose a translation"}
          </option>
          {translations?.map((data, index) => (
            <option key={index} value={data.identifier}>
              {data.name} ({data.language})
            </option>
          ))}
        </select>
      </form>
    </div>
  );
}
