import HomePage from "./HomePage/HomePage";
import Movie from "./Movie/Movie";
import Favorites from "./Favorites/Favorites";
import "./App.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/:movieId">
          <Movie />
        </Route>
        <Route exact path="/favorites">
          <Favorites />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
