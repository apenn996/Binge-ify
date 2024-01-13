import { useContext } from "react";
import { searchContext } from "./Search";

const SearchBar = () => {
  const [searchInput, setSearchInput] = useContext(searchContext);

  const handleChange = (searchString: string) => {
    setSearchInput(searchString);
  };

  return (
    <form
      id="searchBar"
      className="d-flex align-items-center justify-content-center fill "
      role="search"
    >
      <div className="d-flex align-items-center justify-content-center">
        <img
          className="searchbar-search-icon"
          src="../search-icon.png"
          alt="search icon"
        />
      </div>

      <label htmlFor="searchInput" className="col-12">
        <input
          onChange={(e) => handleChange(e.target.value)}
          className="form-control me-2 "
          type="search"
          id="searchInput"
          placeholder="Browse movies, tv shows, and more"
          aria-label="Search"
        />
      </label>
    </form>
  );
};
export default SearchBar;
