import React, { useState, useEffect } from "react";
import "../style/ResultPageStyle.css";
import SearchBar from "../../Home/components/SearchBar";
import WikiDescription from "./WikiDescription";
import axios from "axios";
import { useParams } from "react-router-dom";



const SearchPage: React.FC = () => {
  const [results, setResults] = useState<[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const resultsPerPage = 20;

  const { query } = useParams<{ query: string }>();

  // Fetch results from the API
  const fetchResults = async (query: string) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/search?q=${query}`
      );
      setResults(response.data["organic_results"] || []);
    } catch (error) {
      console.error("Error fetching results:", error);
      setResults([]); // Clear results on error
    }
  };

  useEffect(() => {
    if (query) {
      console.log("Query from useParams:", query);
      setSearchQuery(query);
      fetchResults(query);
    }
  }, [query]);

  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleSearchSubmit = (query: string) => {
    setSearchQuery(query);
    fetchResults(query);
  };

  return (
    <div className="search-page">
      {/* Search bar */}
      <div className="search-bar-container">
        <SearchBar onSubmit={handleSearchSubmit} />
      </div>

      {/* Wikipedia description */}
      {searchQuery && <WikiDescription query={searchQuery} />}

      {/* Search results */}
      <div className="search-results">
        {currentResults.length > 0 ? (
          currentResults.map((result) => (
            <div key={result["id"]} className="result-item">
              <a
                href={result["redirect_link"]}
                target="_blank"
                rel="noopener noreferrer"
                className="result-link"
              >
                {result["title"]}
              </a>
              <p>{result["snippet"]}</p>
            </div>
          ))
        ) : (
          <p>No results found.</p>
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

export default SearchPage;
