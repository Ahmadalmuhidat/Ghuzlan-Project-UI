import React, { useState, useEffect } from "react";
import SearchBar from "../../Home/components/SearchBar";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../style/ImageResultStyle.css";
import NavBar from "../../Home/components/NaveBar";
import ResultBar from "./ResultBar";

const ImageResultPage: React.FC = () => {
  const [imageResults, setImageResults] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const resultsPerPage = 20;

  const { query } = useParams<{ query: string }>();
  const navigate = useNavigate();

  const fetchImageResults = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/search_images?q=${query}`
      );
      console.log(response.data);
      setImageResults(response.data["images_results"] || []);
    } catch (error) {
      console.error("Error fetching image results:", error);
      setImageResults([]);
    }
  };

  useEffect(() => {
    if (query) {
      console.log("Query from useParams:", query);
      setSearchQuery(query);
      fetchImageResults(query);
    }
  }, [query]);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = imageResults.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(imageResults.length / resultsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    navigate(`/image_results/${query}`); // Navigate to the new route
    fetchImageResults(query); // Fetch the results for the new query
  };

  const handleTabChange = (tab: string) => {
    const route = tab === "Images" ? `/image_results/${searchQuery}` : `/search/${searchQuery}`;
    navigate(route); // Navigate to the appropriate tab route
  };

  return (
    <div className="image-result-page">
      <NavBar />
      {/* Search bar */}
      <div className="search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>
      {/* Pass query and tab change handler to ResultBar */}
      <ResultBar query={searchQuery} onTabChange={handleTabChange} />

      {/* Image results */}
      <div className="image-results">
        {currentResults.length > 0 ? (
          currentResults.map((result, index) => (
            <div key={index} className="image-result-item">
              <img
                src={result["original"]}
                alt={result["title"]}
                className="image-thumbnail"
              />
              <a
                href={result["link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="image-source"
              >
                {result["source"]}
              </a>
              <div className="image-title">{result["title"]}</div>
            </div>
          ))
        ) : (
          <p>No image results found.</p>
        )}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => paginate(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ImageResultPage;
