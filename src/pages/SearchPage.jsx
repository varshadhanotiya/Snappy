import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchImages } from "../api/api";
import PaginationComponent from "../components/PaginationComponent";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 4;
  const totalNumberOfPages = Math.ceil(totalItems / itemsPerPage);

  const searchImages = useCallback(async () => {
    if (!query.trim()) return alert("Please enter a search query.");

    try {
      const data = await fetchImages(query, currentPage, itemsPerPage);
      setImages(data?.photos);
      setTotalItems(data?.total_results);
    } catch (error) {
      alert(error.message);
    }
  }, [query, currentPage]);

  useEffect(() => {
    if (query.trim()) {
      searchImages();
    }
  }, [query, currentPage, searchImages]);
  return (
    <div className="search-page-container">
      <h2 className="search-title">Image Search Page</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchImages}>Search</button>
      </div>

      <div>
        <div className="image-grid">
          {images.map((img) => (
            <div className="image-card" key={img.id}>
              <img src={img.src.medium} alt={img.alt} />
              <button
                onClick={() =>
                  navigate("/editor", { state: { image: img.src.medium } })
                }
              >
                Add Captions
              </button>
            </div>
          ))}
        </div>

        {totalNumberOfPages > 1 && (
          <PaginationComponent
            currentPage={currentPage}
            totalNumberOfPages={totalNumberOfPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default SearchPage;
