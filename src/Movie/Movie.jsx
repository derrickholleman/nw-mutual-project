import React, { useState, useEffect } from "react";
import "./Movie.css";
import { useParams } from "react-router-dom";
import { getMovies } from "../utils/api";

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

          <div className="movie-page-wrapper">
            <h1>{foundMovie.title}</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Movie;
