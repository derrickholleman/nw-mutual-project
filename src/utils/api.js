const BASE_API_URL = "http://localhost:5000";
const GHIBLI_API_URL = "https://ghibliapi.herokuapp.com/films";

export async function getMovies() {
  const moviesRes = await fetch(`${GHIBLI_API_URL}`);
  return await moviesRes.json();
}

export async function getFavorites() {
  const favoritesRes = await fetch(`${BASE_API_URL}/favorites`);
  return await favoritesRes.json();
}
