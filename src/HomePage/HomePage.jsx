import { useState, useEffect } from "react";
import SearchSort from "../SearchSort/SearchSort";
import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import { getMovies } from "../utils/api";
import { AiOutlineArrowUp } from "react-icons/ai";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isFiltering, setIsFiltering] = useState(false);

  function loadMovies() {
    getMovies()
      .then((moviesRes) => {
        setMovies(moviesRes);
        setLoaded(true);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    if (movies) {
      loadMovies();
    }

    return () => setLoaded(false);
    // eslint-disable-next-line
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: true,
    });
  };

  return (
    <div>
      <header>
        <h1 id="top-of-home">Find A Ghibli Movie</h1>
      </header>
      <SearchSort
        movies={movies}
        setMovies={setMovies}
        setFilteredMovies={setFilteredMovies}
        setIsFiltering={setIsFiltering}
      />
      <div className="fav-btn-wrapper">
        <Link to="/favorites">
          <button className="home-page-favorite-btn">Go To Favorites</button>
        </Link>
      </div>
      <div className="home-page-container">
        {/* default movie list */}
        {loaded &&
          !isFiltering &&
          movies.map((movie) => (
            <div key={movie.id} className="home-page-movie-container">
              <div className="movie-basic-info">
                <h2 className="home-page-movie-title">
                  {movie.title} ({movie.release_date})
                </h2>
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
                <h2 className="home-page-movie-title">
                  {movie.title} ({movie.release_date})
                </h2>
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
      <footer>
        <Link
          onClick={scrollToTop}
          to="/"
          className="scroll-to-top"
          aria-label="go back to top of page"
          role="button"
        >
          <AiOutlineArrowUp />
        </Link>
      </footer>
    </div>
  );
};

export default HomePage;
