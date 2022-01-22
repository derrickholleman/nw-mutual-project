import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useParams, Link } from "react-router-dom";
import { getMovies, getFavorites } from "../utils/api";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { addFavorite } from "../utils/api";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const { movieId } = useParams();
  const foundMovie = movies.find((movie) => movie.id === movieId);

  function loadMovies() {
    getMovies().then((movieRes) => {
      setMovies(movieRes);
      setLoaded(true);
    });
  }

  useEffect(() => {
    if (movies) {
      loadMovies();

      getFavorites().then((res) => {
        const foundFav = res.find((favorite) => favorite.id === movieId);

        if (foundFav) {
          setIsFavorite(true);
        } else {
          setIsFavorite(false);
        }
      });
    }

    return () => setLoaded(false);
    // eslint-disable-next-line
  }, [movieId]);

  const addToFavorites = async () => {
    await addFavorite(foundMovie);
    setIsFavorite(true);
  };

  return (
    <div>
      {loaded && (
        <div>
          {/* BACKGROUND CONTAINER */}
          <div
            style={{ backgroundImage: `url(${foundMovie.movie_banner})` }}
            className="background"
          ></div>

          <div className="movie-header">
            <h1>
              {foundMovie.title} ({foundMovie.release_date})
            </h1>
            <button
              className={isFavorite ? "favorite-btn-disabled" : "favorite-btn"}
              onClick={addToFavorites}
              disabled={isFavorite}
            >
              {isFavorite
                ? "Movie Added To Favorites!"
                : "Add Movie to Favorites"}
            </button>
          </div>
          <Link to="/" className="back-arrow">
            <BsFillArrowLeftSquareFill />
          </Link>
          <div className="movie-info-section">
            <div className="movie-info-left-side">
              <img
                src={foundMovie.image}
                alt={`${foundMovie.title} poster`}
                className="movie-info-poster"
              />
            </div>
            <div className="movie-info-right-side">
              <p>Directed by: {foundMovie.director}</p>
              <p>Running time: {foundMovie.running_time} minutes</p>
              <p>Original Title: {foundMovie.original_title}</p>
              <p>Description: {foundMovie.description}</p>
              <p>Rotten Tomatoes Score: {foundMovie.rt_score}%</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
