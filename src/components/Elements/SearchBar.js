import React, { useState } from 'react';
import { ProjectTexts } from "../data/Data"
import { SearchData } from '../data/ProjectData'; // Import the projects data
import { useNavigate } from 'react-router-dom';


const SearchBar = ({ placeholder, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const navigate = useNavigate();

  const handleSearch = () => {
    onSearch(searchQuery);
    navigate(`/searchresults?key=${searchQuery}`);
  };

  const handleSuggestionClick = (projectId) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(`/searchresults?key=${projectId}`);
  };
  
  const handleInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter projects based on the search query
    const filteredProjects = SearchData.filter(project =>
      project.name.toLowerCase().includes(query.toLowerCase())
    );
    setSuggestions(filteredProjects);
  };

  return (
    <div className="relative search-container">
      <input 
        type="text"
        placeholder="Search projects"
        value={searchQuery}
        onChange={handleInputChange}
        className="search-input"
      />
      <button 
        onClick={handleSearch}
        className="search-button"
      >
        {ProjectTexts.firstButton}
      </button>

      {/* Render search suggestions */}
      {searchQuery && (
        <ul className="search-suggestions">
          {suggestions.map(project => (
            <li 
              onClick={() => handleSuggestionClick(project.id.toString())}
              key={project.id} 
              className="suggestion-item"
            >
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;