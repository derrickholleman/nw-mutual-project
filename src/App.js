import Movies from "./HomePage/HomePage";
import Movie from "./Movie/Movie";
import Header from "./Header";
import "./App.css";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Movies />
        </Route>
        <Route exact path="/:movieId">
          <Movie />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
