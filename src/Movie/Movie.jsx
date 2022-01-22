import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useParams, Link } from "react-router-dom";
import { getMovies } from "../utils/api";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { movieId } = useParams();

  function loadMovies() {
    getMovies().then((movieRes) => {
      setMovies(movieRes);
      setLoaded(true);
    });
  }

  useEffect(() => {
    if (movies) {
      loadMovies();
    }

    return () => setLoaded(false);
  }, []);

  const foundMovie = movies.find((movie) => movie.id === movieId);

  return (
    <div>
      {loaded && (
        <div>
          <div
            style={{ backgroundImage: `url(${foundMovie.movie_banner})` }}
            className="background"
          ></div>
          <h1 className="movie-header">
            {foundMovie.title} ({foundMovie.release_date})
          </h1>
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
