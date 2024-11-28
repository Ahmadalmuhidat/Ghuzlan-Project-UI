import React, { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Logo from './components/logo';
import SearchBar from './components/SearchBar';
import NavBar from './components/NaveBar';
import Footer from './components/Footer';
import "./style/HomeStyle.css"; // Import Home styles
import axios from 'axios';

const Home: React.FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    // Apply home-page-body class to the body element when Home page is loaded
    document.body.classList.add('home-page-body');

    return () => {
      // Remove the class when component unmounts, or if the user navigates away
      document.body.classList.remove('home-page-body');
    };
  }, []);

  // Handle search submit for Home page (could be a no-op or route to another page)
  const handleSearchSubmit = (query: string) => {
    navigate("/search/" + query);
    
  };

  return (
    <div className="home-container">
      <NavBar />
      <div className="bodyCenter">
        <Logo text="QueryHive" fontSize="3rem" color="white" />
        <div className="sublogo">Independent and Open Search</div>
      </div>
      {/* Pass the handler to SearchBar */}
      <SearchBar onSubmit={handleSearchSubmit} />
      <Footer />
    </div>
  );
};

export default Home;
