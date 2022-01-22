export async function getMovies() {
  const moviesRes = await fetch("https://ghibliapi.herokuapp.com/films");
  return await moviesRes.json();
}
