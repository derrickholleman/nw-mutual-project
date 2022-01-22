const BASE_API_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";
const GHIBLI_API_URL = "https://ghibliapi.herokuapp.com/films";

const axios = require("axios");

export async function getMovies() {
  const moviesRes = await fetch(`${GHIBLI_API_URL}`);
  return await moviesRes.json();
}

export async function getFavorites() {
  const favoritesRes = await fetch(`${BASE_API_URL}/favorites`);
  return await favoritesRes.json();
}

export async function addFavorite(movie) {
  return await fetch(`${BASE_API_URL}/favorites`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...movie,
      favorite: true,
    }),
  });
}
