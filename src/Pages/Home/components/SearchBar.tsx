import React, { useState } from 'react';
import axios from 'axios';

interface SearchBarProps {
  onSubmit: (query: string) => void;  // Accepts a callback for submitting the search query
}

const SearchBar: React.FC<SearchBarProps> = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(searchQuery);  // Call the onSubmit prop with the search query
    
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Search..."
          className="search-input"
        />
        <button type="submit" className="search-button">Search</button>
      </div>
    </form>
  );
};

export default SearchBar;
