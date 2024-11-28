import React, { useState, useEffect } from 'react';

interface WikiDescriptionProps {
  query: string;  // The search query passed as a prop
}

const WikiDescription: React.FC<WikiDescriptionProps> = ({ query }) => {
  const [description, setDescription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query) return;  // Don't fetch if there's no query

    const fetchDescription = async () => {
      try {
        const response = await fetch(
          `https://en.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&exintro&explaintext&origin=*&titles=${query}`
        );
        const data = await response.json();

        // Extract the page data from the Wikipedia API response
        const page = data.query.pages;
        const pageId = Object.keys(page)[0];

        if (pageId === '-1') {
          setDescription('No description available for this term.');
        } else {
          setDescription(page[pageId].extract);  // Set the description
        }
      } catch (err) {
        setError('Failed to fetch description from Wikipedia.');
      }
    };

    fetchDescription();
  }, [query]);

  return (
    <div className="wiki-description">
      <h2>About "{query}" from Wikipedia</h2>
      {error && <p>{error}</p>}
      {description ? <p>{description}</p> : <p>Loading...</p>}
    </div>
  );
};

export default WikiDescription;
