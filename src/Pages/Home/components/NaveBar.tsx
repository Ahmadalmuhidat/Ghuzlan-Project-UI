import React, { useState } from "react";
import SpotifyPlayer from "react-spotify-player";

const NavBar: React.FC = () => {
  const [musicQuery, setMusicQuery] = useState<string>(""); // Music search query
  const [searchResults, setSearchResults] = useState<any[]>([]); // Search results
  const [currentsong, setcurrentsong] = useState<string>("");
  const choosesong = (event) => {
    setcurrentsong(event.target.value);

  }

  // Handle music search
  const handleSearch = async () => {
    if (!musicQuery.trim()) {
      console.log("Music query is empty.");
      return;
    }

    // Simulate API call
    try {
      const response = await fetch(`http://localhost:3000/search_tracks?q=${encodeURIComponent(musicQuery)}`);
      const data = await response.json();
      setSearchResults(data.data || []);
    } catch (error) {
      console.error("Error fetching music:", error);
    }
  };

  return (
    <nav className="navbar">
      {/* Sign In section */}
      <div className="SingIn">
        <a href="#">Sign In</a>
      </div>

      {/* Music Bar in the center */}
      <div className="music-bar">
        <div className="music-search">
          <input
            type="text"
            value={musicQuery}
            onChange={(e) => setMusicQuery(e.target.value)}
            placeholder="Search for music..."
          />
          <button onClick={handleSearch}>Search</button>
          {/* Display search results */}
        {searchResults.length > 0 && (
          <select value={currentsong} onChange={choosesong} className="music-search-results">
            {searchResults.map((track, index) => (
              <option value={track.uri} key={index}>
                {track.name} - {track.artist}
              </option>
            ))}
          </select>
        )}
        </div>

        
        <div className="song_controler">
  {currentsong !== "" ? (
    <div className="spotify-player-wrapper">
      <SpotifyPlayer
        uri={currentsong}
        size={{
              width:"100%",
              height:"100%",
        }}
        view={"coverart"} 
        theme={"black"}
      />
    </div>
  ) : null}
</div>

        
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li><a href="#history">History</a></li>
        <li><a href="#about">About</a></li>
      </ul>
    </nav>
  );
};

export default NavBar;
