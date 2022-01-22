import HomePage from "./HomePage/HomePage";
import Movie from "./Movie/Movie";
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
      </Switch>
    </div>
  );
}

export default App;
