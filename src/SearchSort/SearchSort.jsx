import React, { useState, useEffect } from "react";
import "./SearchSort.css";

const SearchSort = ({
  movies,
  setMovies,
  setFilteredMovies,
  setIsFiltering,
}) => {
  const [searchTitle, setSearchTitle] = useState("");
  const [sortAZ, setSortAZ] = useState(true);
  const [sortNewToOld, setSortNewToOld] = useState(true);

  const handleChange = (e) => {
    setSearchTitle(e.target.value);
  };

  useEffect(() => {
    if (searchTitle.length > 0) {
      setIsFiltering(true);
    } else {
      setIsFiltering(false);
    }
  }, [searchTitle]);

  const handleSortbyTitle = () => {
    if (sortAZ) {
      setMovies([...movies].sort((a, b) => (a.title > b.title ? 1 : -1)));
      setSortAZ(false);
    } else {
      setMovies([...movies].sort((a, b) => (a.title < b.title ? 1 : -1)));
      setSortAZ(true);
    }
  };

  const handleSortByYear = () => {
    if (sortNewToOld) {
      setMovies(
        [...movies].sort(
          (a, b) => Number(b.release_date) - Number(a.release_date)
        )
      );
      setSortNewToOld(false);
    } else {
      setMovies(
        [...movies].sort(
          (a, b) => Number(a.release_date) - Number(b.release_date)
        )
      );
      setSortNewToOld(true);
    }
  };

  useEffect(() => {
    setFilteredMovies(
      movies.filter((movie) => {
        let noPuncMovieTitle = movie.title.replace(/'/g, "");
        return noPuncMovieTitle
          .toLowerCase()
          .includes(searchTitle.trim().toLowerCase());
      })
    );
  }, [searchTitle]);

  return (
    <div className="search-sort-container">
      <div className="sort-btns-group">
        <button className="sort-btn" onClick={handleSortbyTitle}>
          {sortAZ ? "Sort A-Z" : "Sort Z-A"}
        </button>
        <button className="sort-btn" onClick={handleSortByYear}>
          {sortNewToOld ? "Sort New To Old" : "Sort Old To New"}
        </button>
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
