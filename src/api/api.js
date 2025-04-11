import axios from "axios";

const API_KEY = "key";

export const fetchImages = async (query, page = 1, perPage = 4) => {
  if (!query.trim()) throw new Error("Please enter a search query.");

  const url = `https://api.pexels.com/v1/search`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: API_KEY,
      },
      params: {
        query,
        per_page: perPage,
        page,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching images:", error);
    throw new Error("Failed to fetch images. Please try again later.");
  }
};
