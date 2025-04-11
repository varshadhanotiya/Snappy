import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { fetchImages } from "../api/api";
import PaginationComponent from "../components/PaginationComponent";
import SearchIcon from "@mui/icons-material/Search";
import { debounce } from "../utils/debounce";
import "./SearchPage.css";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();

  const itemsPerPage = 4;
  const totalNumberOfPages = Math.ceil(totalItems / itemsPerPage);

  const debouncedSearch = useRef(
    debounce(async (q, page) => {
      if (!q.trim()) return;
      try {
        const data = await fetchImages(q, page, itemsPerPage);
        setImages(data?.photos);
        setTotalItems(data?.total_results);
      } catch (error) {
        alert(error.message);
      }
    }, 500)
  ).current;

  useEffect(() => {
    if (query.trim()) {
      debouncedSearch(query, currentPage);
    }
  }, [query, currentPage, debouncedSearch]);

  return (
    <div className="search-page-container">
      <h2 className="search-title">Image Search Page</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search images..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <SearchIcon
          className="search-button"
          onClick={() => debouncedSearch(query, currentPage)}
        />
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
