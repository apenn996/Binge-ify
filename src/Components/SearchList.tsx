import React from "react";
import { useEffect, useState, useRef, useContext } from "react";
import { searchContext } from "./Search";
import MovieModal from "./MovieModal";
import MovieTooltip from "./MovieTooltip";
import LoadMore from "./LoadMore";
import "../App.css";
let pageNumber: number = 1;
let URL = "";
let firstLoad: boolean = true;

const pageNumbertoString = (myint: number) => {
  let stringNumber: string = myint.toString();
  return stringNumber;
};
let typeofmedia: string;
const SearchList = () => {
  const [mediaList, setMediaList] = useState<never[]>([]);
  const myRefname = useRef<HTMLButtonElement>(null);
  const [searchInput, setSearchInput] = useContext(searchContext);
  const [index, setIndex] = useState(-1);
  const [tvGenres, setTvGenres] = useState([]);
  const [movieGenres, setMovieGenres] = useState([]);
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODI2YmM3ODMxMWMxZWU4MDM2M2QxYzRjYjJlMmIxNiIsInN1YiI6IjY1NTdkYmY0ZWE4NGM3MTA5MjI4ZGQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kDZp_UGvkGkswlEXTSRF08deRjy5T1BP5p-7B0rGtOE",
    },
  };
  const getGenres = () => {
    let genresURL = "https://api.themoviedb.org/3/genre/movie/list?language=en";
    fetch(genresURL, options)
      .then((response) => response.json())
      .then((json) => setMovieGenres(json.genres));

    genresURL = "https://api.themoviedb.org/3/genre/tv/list?language=en";
    fetch(genresURL, options)
      .then((response) => response.json())
      .then((json) => setTvGenres(json.genres));
  };
  const handleURL = () => {
    if (searchInput) {
      URL =
        "https://api.themoviedb.org/3/search/multi?query=" +
        searchInput.trim() +
        "&include_adult=false&language=en-US&sort_by=popularity.desc";
    }
  };

  const handleSearchedMovies = async () => {
    handleURL();
    let stringPage: string = pageNumbertoString(pageNumber);

    try {
      const list = fetch(URL + "&page=" + stringPage, options)
        .then((response) => response.json())
        .then((json) => setMediaList(json.results));
    } catch (err: any) {}

    pageNumber++;
  };
  useEffect(() => {
    pageNumber = 1;
    setIndex(-1);
    //if search is empty: show all media, reset card list, dont sort by popular(UX), retieve genres
    //get genres is mandatory here for the first useEffect run through to load genres.
    //reset the page # on each option to keep load page consistant
    if (!searchInput) {
      getGenres();
      setMediaList([]);
    }

    //DO sort by popular and api call to search fetch function
    if (searchInput) {
      handleSearchedMovies();
    }
  }, [searchInput]);

  const handleClick = async () => {
    handleURL();
    console.log("handle click")
    let stringPage: string = pageNumbertoString(pageNumber);
    console.log(URL+"&page=" + stringPage)
    
      try {
        const list = fetch(URL + "&page=" + stringPage, options)
          .then((response) => response.json())
          .then((json) =>
            setMediaList((mediaList) => {
              return mediaList?.concat(json.results);
            })
          );
      } catch (err: any) {
        console.error("big error");
      }
    
    console.log(mediaList)
    firstLoad = false;
    pageNumber++;
  };
useEffect(() => {
  
  console.log("STATE CHANGE")
})
  const handleSorting = (item1, item2) => {
    if (item1["popularity"] > item2["popularity"]) {
      return -1;
    } else if (item1["popularity"] < item2["popularity"]) {
      return 1;
    }
    return 0;
  };

  return (
    <>
      {mediaList
        ? mediaList
            .filter(
              (mediaItem) =>
                mediaItem["media_type"] !== "person" && mediaItem["poster_path"]
            )

            .map((mediaItem, thisMediaItemIndex) => (
              // on mouse down load, detailed info from api for that media only. This works by setting clicked index to index of chosen media item and only showing MovieModal(detailed info) on click of that media item
              //however mouse down alone doesnt actually pull up modal with information. To show the modal, on mouse up, invoke the click function on the modal through code.
              // this way a single click (up and down) loads api data and opend modal, one click (onClick) wasnt working to do both.
              <div
                key={thisMediaItemIndex}
                tabIndex={-1}
                className=" m-3 card mb-3 p-0  overflow-hidden text movie-card"
                onMouseDown={() => {
                  // !# currentIndex = thisMediaItemIndex;
                  setIndex(thisMediaItemIndex);
                }}
                onMouseUp={() => {
                  myRefname.current?.click();
                }}
              >
                {/* only generate a button and modal if the index you click equals index of list mediaItem */}
                {index === thisMediaItemIndex ? (
                  <div>
                    <button
                      key={thisMediaItemIndex}
                      type="button"
                      ref={myRefname}
                      className="link-button bg-primary"
                      data-bs-toggle="modal"
                      data-bs-target="#mediaModal"
                    />
                    <MovieModal
                      title={
                        mediaItem["media_type"] === "movie" ||
                        typeofmedia === "movie"
                          ? mediaItem["title"]
                          : mediaItem["name"]
                      }
                      description={mediaItem["overview"]}
                      headerImage={mediaItem["backdrop_path"]}
                      releaseYear={() => {
                        if (mediaItem["release_date"]) {
                          return (
                            mediaItem["release_date"] as string
                          ).substring(0, 4);
                        } else if (mediaItem["first_air_date"]) {
                          return (
                            mediaItem["first_air_date"] as string
                          ).substring(0, 4);
                        } else {
                          return "unkown release date";
                        }
                      }}
                      posterImage={mediaItem["poster_path"]}
                      genres={
                        mediaItem["media_type"] === "tv" &&
                        tvGenres &&
                        movieGenres
                          ? tvGenres
                          : movieGenres
                      }
                      mediaType={
                        mediaItem["media_type"]
                          ? mediaItem["media_type"]
                          : typeofmedia
                      }
                      rating={mediaItem["vote_average"]}
                      thisGenreId={mediaItem["genre_ids"]}
                      mediaID={mediaItem["id"]}
                      voteCount={mediaItem["vote_count"]}
                    ></MovieModal>
                  </div>
                ) : undefined}

                {/* poster for media list card mediaItem  */}
                <img
                  key={Math.random()}
                  src={
                    mediaItem["poster_path"]
                      ? "https://image.tmdb.org/t/p/w500/" +
                        mediaItem["poster_path"]
                      : "../no-image.jpg"
                  }
                  className="movie-card-img border-light rounded3"
                  alt={"poster image for " + mediaItem["original_title"]}
                />

                <MovieTooltip
                  description={mediaItem["overview"]}
                  title={
                    mediaItem["media_type"] === "movie" ||
                    typeofmedia === "movie"
                      ? mediaItem["title"]
                      : mediaItem["name"]
                  }
                  mediaType={
                    mediaItem["media_type"]
                      ? mediaItem["media_type"]
                      : typeofmedia
                  }
                  rating={mediaItem["vote_average"]}
                />
              </div>
            ))
        : "empty"}

      {mediaList.length != 0 ? (
        <div
          tabIndex={-1}
          className="d-flex justify-content-center col-12 mt-3 mb-5"
        >
          <LoadMore onClick={handleClick} />{" "}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchList;
