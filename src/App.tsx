import "./App.css"
// importing components from react-router-dom package
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
 
import Home from "./Components/Home";
import Search from "./Components/Search";
import Movies from "./Components/Movies";
import Series from "./Components/Series";

function App() {
  return (
      <>
          {/* This is the alias of BrowserRouter i.e. Router */}
          <Router>
              <Routes>
                  {/* This route is for home component 
        with exact path "/", in component props 
        we passes the imported component*/}
                  <Route
                    
                      path="/"
                      element={<Home />}
                  />

                  {/* This route is for about component 
        with exact path "/about", in component 
        props we passes the imported component*/}
                 
                  <Route
                      path="/search"
                      element={<Search/>}
                  />
                  <Route
                      path="/movies"
                      element={<Movies/>}
                  />
                  <Route
                      path="/series"
                      element={<Series/>}
                  />
                  
                  {/* If any route mismatches the upper 
        route endpoints then, redirect triggers 
        and redirects app to home component with to="/" */}
                  {/* <Redirect to="/" /> */}
                  <Route
                      path="*"
                      element={<Navigate to="/" />}
                  />
              </Routes>
          </Router>
      </>
  );
}

export default App;