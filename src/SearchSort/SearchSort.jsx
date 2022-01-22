import React, { useState, useEffect } from "react";
import "./SearchSort.css";

const SearchSort = ({ movies, setFilteredMovies, setIsFiltering }) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [sortAZ, setSortAZ] = useState(null);
  const [sortNewToOld, setSortNewToOld] = useState(null);
  const handleChange = (e) => {
    setSearchTitle(e.target.value);
    if (searchTitle.length > 0) {
      setIsFiltering(true);
    }
  };

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => {
        let noPuncMovieTitle = movie.title.replace(/['"]+/g, "");
        return noPuncMovieTitle
          .toLowerCase()
          .includes(searchTitle.trim().toLowerCase());
      })
    );
  }, [searchTitle]);

  return (
    <div className="search-sort-container">
      <div className="sort-btns-group">
        <button className="sort-btn">Sort A-Z</button>
        <button className="sort-btn">Sort New To Old</button>
      </div>
      <input
        type="text"
        placeholder="Search by title..."
        value={searchTitle}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchSort;
