import HeaderNav from "./HeaderNav";
import SearchBar from "./SearchBar";
import SearchList from "./SearchList";
import HeaderBlock from "./HeaderBlock";
import { createContext } from "react";
import { useState } from "react";

interface searchQuery {
  mystr: string;
}
interface theme {
  myTheme: boolean;
}

//search context so search bar input can be read across components
export type searchContextType = searchQuery;
export const searchContext = createContext<any | undefined>(undefined);
export type themeContextType = theme;
export const themeContext = createContext<any | undefined>(undefined);

const Search = () => {
  const [searchInput, setSearchInput] = useState("");

  return (
    <>
      <div className="theme-dark">
        <HeaderNav />
        <HeaderBlock />
        <searchContext.Provider value={[searchInput, setSearchInput]}>
          <section className="s1 section1 d-flex flex-column align-items-center ">
            <div className="col-9 bg-black mt-5">
              <SearchBar></SearchBar>
            </div>
            <h1 className="col-10 text text-center mt-5 fw-bold display-3">
              {searchInput ? "Results for: " + '"' + searchInput + '"' : ""}
            </h1>
            <div className="col-11 d-flex mt-3 flex-wrap align-content-start justify-content-evenly">
              <SearchList></SearchList>
            </div>
          </section>
        </searchContext.Provider>
      </div>
    </>
  );
};

export default Search;
