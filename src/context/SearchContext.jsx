// src/context/SearchContext.jsx
import React, { createContext, useState } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <SearchContext.Provider value={{ searchResults, handleSearchResults }}>
      {children}
    </SearchContext.Provider>
  );
};
