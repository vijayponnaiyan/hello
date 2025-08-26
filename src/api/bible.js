// src/api/bible.js
import baseAPI from "./baseAPI";

export const Translation = async () => {
  try {
    const response = await baseAPI.get("/data");

    return response;
  } catch (error) {
    throw new Error("Failed to fetch translations: " + error.message);
  }
};

export const Books = async (identifier) => {
  try {
    const response = await baseAPI.get(`/data/${identifier}`);
    console.log(response.data); // it shows: { books: [...] }
    return response; // ✅ return the actual data object
  } catch (error) {
    throw new Error(
      `Failed to fetch books for ${identifier}: ${error.message}`
    );
  }
};

export const fetchVerses = async (translations, identifier, verses) => {
  if (!translations || !identifier || !verses) {
    throw new Error("Missing required parameters");
  }

  try {
    const response = await baseAPI.get(
      `/data/${translations}/${identifier}/${verses}`
    );
    console.log("Verses API response:", response);
    return response;
  } catch (error) {
    console.error(
      `API Error for ${translations}/${identifier} (${verses}):`,
      error
    );
    throw new Error(
      `Failed to fetch ${translations}/${identifier} in ${verses}: ${error.message}`
    );
  }
};
