import { useState, useEffect } from "react";
import SearchSort from "../SearchSort/SearchSort";
import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  useEffect(() => {
    async function getMovies() {
      const moviesRes = await fetch("https://ghibliapi.herokuapp.com/films");
      const moviesJSON = await moviesRes.json();
      setMovies(moviesJSON);
      setLoaded(true);
    }

    if (movies) {
      getMovies();
    }

    return () => setLoaded(false);
  }, []);

  return (
    <div>
      <h1>Find A Ghibli Movie</h1>
      <SearchSort
        movies={movies}
        setMovies={setMovies}
        setFilteredMovies={setFilteredMovies}
        setIsFiltering={setIsFiltering}
      />
      <div className="home-page-container">
        {/* default movie list */}
        {loaded &&
          !isFiltering &&
          movies.map((movie) => (
            <div key={movie.id} className="home-page-movie-container">
              <div className="movie-basic-info">
                <h2 className="home-page-movie-title">{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
              <div className="movie-poster-wrapper">
                <div className="home-page-movie-poster">
                  <Link to={`/${movie.id}`}>
                    <img src={movie.image} alt={`${movie.title} poster`} />
                  </Link>
                </div>
              </div>
            </div>
          ))}

        {/* filtered movie list */}
        {loaded &&
          isFiltering &&
          filteredMovies.map((movie) => (
            <div key={movie.id} className="home-page-movie-container">
              <div className="movie-basic-info">
                <h2 className="home-page-movie-title">{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
              <div className="movie-poster-wrapper">
                <div className="home-page-movie-poster">
                  <Link to={`/${movie.id}`}>
                    <img src={movie.image} alt={`${movie.title} poster`} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
