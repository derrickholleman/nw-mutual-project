import React, { useState, useEffect } from "react";
import { getFavorites } from "../utils/api";
import "./Favorites.css";
import { Link } from "react-router-dom";
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
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
    } else {
      return null;
    }
  };

  return (
    <div>
      <Link to="/" className="favorites-back-arrow">
        <BsFillArrowLeftSquareFill />
      </Link>
      <h1 className="favs-h1">Favorites</h1>
      {loaded &&
        favorites.map((favorite) => (
          <div key={favorite.id} className="home-page-movie-container">
            <div className="movie-basic-info">
              <h2 className="home-page-movie-title">{favorite.title}</h2>
              <p className="year">{favorite.release_date}</p>
            </div>
            <div className="movie-poster-wrapper">
              <div className="favorite-page-movie-poster">
                <button
                  className="remove-favorite-btn"
                  onClick={() => handleDeleteFavorite(favorite.id)}
                >
                  Remove
                </button>
                <Link to={`/${favorite.id}`}>
                  <img src={favorite.image} alt={`${favorite.title} poster`} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      <footer>
        <Link onClick={scrollToTop} to="/favorites" className="scroll-to-top">
          Back to Top
        </Link>
      </footer>
    </div>
  );
};

export default Favorites;
