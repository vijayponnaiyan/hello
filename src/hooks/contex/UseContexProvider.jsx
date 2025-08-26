// hooks/contex/UseContexProvider.js

import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
} from "react";
import { Translation, Books, fetchVerses } from "../../api/bible";
import Loader from "../../components/ui/Loader";
import ErrorState from "../../components/ui/ErrorState";

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [translations, setTranslations] = useState([]);
  const [bible, setBible] = useState([]);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [selectedTranslation, setSelectedTranslation] = useState("");
  const [selectedBook, setSelectedBook] = useState("");

  const fetchTranslations = async () => {
    setLoading(true);
    try {
      const data = await Translation();
      setTranslations(data.translations || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch translations");
    } finally {
      setLoading(false);
    }
  };

  const fetchBooks = async (identifier) => {
    setLoading(true);
    try {
      const data = await Books(identifier);
      setBible(data.books || []);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to fetch books");
    } finally {
      setLoading(false);
    }
  };

  const fetchVersesData = async (translation, identifier, verse) => {
    setLoading(true);
    try {
      console.log("Fetching verse with:", { translation, identifier, verse });
      const data = await fetchVerses(translation, identifier, verse);
      console.log("Fetched verse data:", data);

      let verseText;
      if (!data) {
        console.warn("No data returned from API.");
        verseText = ["Verse not found."];
      } else if (data.error) {
        console.warn("API error returned:", data.error);
        verseText = ["Verse not found."];
      } else if (data.text) {
        verseText = data.text;
      } else if (data.verses && Array.isArray(data.verses)) {
        verseText = data.verses.map((v) => v.text);
      } else {
        console.warn("Unexpected API structure:", data);
        verseText = ["Verse not found."];
      }

      const versesArray = Array.isArray(verseText)
        ? verseText
        : [verseText || "Verse not found."];

      setVerses(versesArray);
      setError("");
    } catch (err) {
      console.error("Error fetching verse:", err);
      setError(err.message || "Failed to fetch verse");
      setVerses(["Verse not found."]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTranslations();
  }, []);

  const contextValue = useMemo(
    () => ({
      translations,
      bible,
      verses,
      loading,
      error,
      fetchBooks,
      fetchVersesData,
      selectedTranslation,
      setSelectedTranslation,
      selectedBook,
      setSelectedBook,
    }),
    [
      translations,
      bible,
      verses,
      loading,
      error,
      selectedTranslation,
      selectedBook,
    ]
  );

  return (
    <BlogContext.Provider value={contextValue}>
      {loading && <Loader />}
      {error && <ErrorState message={error} />}
      {!loading && !error && children}
    </BlogContext.Provider>
  );
}

export function UseBlogs() {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("UseBlogs must be used within a BlogProvider");
  }
  return context;
}
