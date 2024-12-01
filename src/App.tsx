import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home'; // Home page
import ResultPage from './Pages/SearchResults/ResultPage'; // Search results page
import ImageResultPage from './Pages/SearchResults/components/ImageResultPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the Home page */}
        <Route path="/" element={<Home />} />

        {/* Route for the Search Results page */}
        <Route path="/search/:query" element={<ResultPage />} />
        {/* {Route for the Image Result Page} */}
        <Route path="/image_results/:query" element={<ImageResultPage/>} />

      </Routes>
    </Router>
  );
};

export default App;
