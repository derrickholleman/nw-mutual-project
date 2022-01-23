import React, { useState, useEffect } from "react";
import { getFavorites } from "../utils/api";
import "./Favorites.css";
import { Link } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
import { AiOutlineArrowUp } from "react-icons/ai";
import { animateScroll as scroll } from "react-scroll";
import { deleteFavorite } from "../utils/api";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getFavorites().then((res) => {
      setFavorites(res);
      setLoaded(true);
    });
  }, []);

  const scrollToTop = () => {
    scroll.scrollToTop({
      duration: 800,
      smooth: true,
    });
  };

  const handleDeleteFavorite = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this favorite?"
    );

    if (confirmDelete) {
      await deleteFavorite(id).then(getFavorites).then(setFavorites);
    }
  };

  return (
    <div>
      <Link
        to="/"
        className="favorites-back-arrow"
        role="button"
        aria-label="go back to home page"
      >
        <BsFillArrowLeftSquareFill />
      </Link>
      <h1 className="favs-h1">Favorites</h1>
      {favorites.length === 0 && (
        <p style={{ textAlign: "center" }}>
          You currently have no favorites added!
        </p>
      )}
      <div className="home-page-container">
        {loaded &&
          favorites.map((favorite) => (
            <div key={favorite.id} className="home-page-movie-container">
              <div className="movie-basic-info">
                <h2 className="home-page-movie-title">
                  {favorite.title} ({favorite.release_date})
                </h2>
              </div>
              <div className="movie-poster-wrapper">
                <div className="favorite-page-movie-poster">
                  <button
                    className="remove-favorite-btn"
                    onClick={() => handleDeleteFavorite(favorite.id)}
                    aria-label="remove favorite"
                  >
                    X
                  </button>
                  <Link to={`/${favorite.id}`}>
                    <img
                      src={favorite.image}
                      alt={`${favorite.title} poster`}
                    />
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>
      <footer>
        {favorites.length > 1 && (
          <Link
            onClick={scrollToTop}
            to="/favorites"
            className="scroll-to-top"
            aria-label="go back to top of page"
            role="button"
          >
            <AiOutlineArrowUp />
          </Link>
        )}
      </footer>
    </div>
  );
};

export default Favorites;
