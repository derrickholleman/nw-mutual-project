import { useState, useEffect } from "react";
import React from "react";
import "./HomePage.css";

const HomePage = () => {
  const [movies, setMovies] = useState({});
  const [loaded, setLoaded] = useState(false);

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
      <div className="home-page-container">
        {loaded &&
          movies.map((movie) => (
            <div key={movie.id} className="home-page-movie-container">
              <div className="movie-basic-info">
                <h2 className="home-page-movie-title">{movie.title}</h2>
                <p>{movie.release_date}</p>
              </div>
              <div className="home-page-movie-poster">
                <img src={movie.image} alt={`${movie.title} poster`} />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
