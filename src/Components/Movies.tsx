import React from "react";
import HeaderNav from "./HeaderNav";
import Carousel from "./Carousel";
import { useState, useEffect, useRef } from "react";
import MediaList from "./MediaList";
import GenreList from "./GenreList";
import Footer from "./Footer";
let URL = [""] as string[];
let page = new Array(20) as number[];
let typeofmedia: string = "movie";
const Movies = () => {
  const [movieGenres, setMovieGenres] = useState([]);
  const [tvGenres, setTvGenres] = useState([]);

  const [currentId, setCurrentId] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(2);

  const [mediaList0, setmediaList0] = useState<never[]>([]);
  const [mediaList1, setmediaList1] = useState<never[]>([]);
  const [mediaList2, setmediaList2] = useState<never[]>([]);
  const [mediaList3, setmediaList3] = useState<never[]>([]);
  const [mediaList4, setmediaList4] = useState<never[]>([]);
  const [mediaList5, setmediaList5] = useState<never[]>([]);
  const [mediaList7, setmediaList7] = useState<never[]>([]);
  const [mediaList8, setmediaList8] = useState<never[]>([]);
  const [mediaList9, setmediaList9] = useState<never[]>([]);
  const [topMediaList, setTopMediaList] = useState<never[]>([]);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODI2YmM3ODMxMWMxZWU4MDM2M2QxYzRjYjJlMmIxNiIsInN1YiI6IjY1NTdkYmY0ZWE4NGM3MTA5MjI4ZGQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kDZp_UGvkGkswlEXTSRF08deRjy5T1BP5p-7B0rGtOE",
    },
  };
  const handleLoad = (listNumber: number) => {
    page[listNumber]++;
    handleFetch(listNumber);
  };
  const handleGenre = (thisSelectedGenre: number) => {
    setSelectedGenre(thisSelectedGenre);
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

  const handleFetch = (i: number) => {
    
    try {
      let list: any;
      switch (i) {
        case 0:
         
          list = fetch(URL[0] + "&page=" + page[0].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList0((mediaList0) => {
                return mediaList0?.concat(json.results);
              })
            );

          break;
        case 1:
          list = fetch(URL[1] + "&page=" + page[1].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList1((mediaList1) => {
                return mediaList1?.concat(json.results);
              })
            );
          break;
        case 2:
          list = fetch(URL[2] + "&page=" + page[2].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList2((mediaList2) => {
                return mediaList2?.concat(json.results);
              })
            );
          break;
        case 3:
          list = fetch(URL[3] + "&page=" + page[3].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList3((mediaList3) => {
                return mediaList3?.concat(json.results);
              })
            );
          break;
        case 4:
          list = fetch(URL[4] + "&page=" + page[4].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList4((mediaList4) => {
                return mediaList4?.concat(json.results);
              })
            );
          break;
        case 5:
          list = fetch(URL[5] + "&page=" + page[5].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList5((mediaList5) => {
                return mediaList5?.concat(json.results);
              })
            );
          break;
        case 7:
          list = fetch(URL[7] + "&page=" + page[7].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList7((mediaList7) => {
                return mediaList7?.concat(json.results);
              })
            );
          break;
        case 8:
          list = fetch(URL[8] + "&page=" + page[8].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList8((mediaList8) => {
                return mediaList8?.concat(json.results);
              })
            );
          break;
        case 9:
          list = fetch(URL[9] + "&page=" + page[9].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setmediaList9((mediaList9) => {
                return mediaList9?.concat(json.results);
              })
            );
          break;
        case 99:
          list = fetch(URL[6] + "&page=" + page[6].toString(), options)
            .then((response) => response.json())
            .then((json) =>
              setTopMediaList((mediaList6) => {
                return mediaList6?.concat(json.results);
              })
            );
          break;

        default:
          break;
      }
    } catch (err: any) {
      console.log("error");
    }
  };
  const clearLists = () => {
    setmediaList0([]);
    setmediaList1([]);
    setmediaList2([]);
    setmediaList3([]);
    setmediaList4([]);
    setmediaList5([]);

    setmediaList7([]);
    setmediaList8([]);
    setmediaList9([]);
  };
  //   generate content lists
  useEffect(() => {
    page.fill(1);
    clearLists();

    // top movies today
    getGenres();
    URL[6] = "https://api.themoviedb.org/3/trending/movie/day?language=en-US";
    handleFetch(99);

    // trending
    URL[0] = "https://api.themoviedb.org/3/trending/movie/week?language=en-US";
    handleFetch(0);

    //  highest rated all - higest rated
    URL[1] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=500&with_original_language=en" +
      (selectedGenre !== 2
        ? "&with_genres=" + selectedGenre.toString()
        : "&with_genres=");
    handleFetch(1);

    // best in action - popular in
    URL[2] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=" +
      (selectedGenre !== 2 ? "popularity.desc" : "vote_average.desc") +
      "&vote_count.gte=300&with_genres=" +
      (selectedGenre !== 2 ? selectedGenre.toString() : "28") +
      "&with_original_language=en";
    handleFetch(2);

    // best in Comedy - new releases
    URL[3] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&with_genres=35&with_original_language=en";
    handleFetch(3);

    // best documentaries
    URL[4] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&with_genres=27&with_original_language=en";
    handleFetch(4);

    // best in Animation
    URL[5] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&with_genres=16&with_original_language=en";
    handleFetch(5);

    URL[8] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&with_genres=99&with_original_language=en";
    handleFetch(8);
    //new releases
    URL[9] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=vote_average.desc&vote_count.gte=200&with_genres=10749&with_original_language=en";
    handleFetch(9);

    //new releases
    URL[7] =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=primary_release_date.desc&vote_count.gte=3&with_original_language=en" +
      (selectedGenre !== 2
        ? "&with_genres=" + selectedGenre.toString()
        : "&with_genres=");
    handleFetch(7);
    //new releases
  }, [selectedGenre]);

  const tempfunct = (item: string) => {
    setCurrentId(item);
  };

  
  // useEffect(() => {
  //   console.log(mediaList1);
  //   console.log(mediaList2);
  //   console.log(mediaList3);
  //   console.log(movieGenres);
  //   console.log(selectedGenre);
  // });

  return (
    <div className="theme-dark">
      <HeaderNav />

      <section className="s1 d-flex flex-column align-items-center ">
        <Carousel
          typeofmedia="movie"
          medias={mediaList0}
          tvGenres={tvGenres}
          movieGenres={movieGenres}
          listId={100}
          myfunct={tempfunct}
          thisId={currentId}
        />

        <div className="s2 position-relative d-flex flex-column align-items-center">
          <div className="carousel-transition-overlay"></div>
          <div className="media-list-container  col-11  ">
            <img
              className="top10-img  mb-5"
              src="../topmovies.webp"
              alt="top-10-movies-image"
            />
            <MediaList
              typeofmedia="movie"
              media={topMediaList?.slice(0, 10)}
              genres={movieGenres}
              listId={99}
              myfunct={tempfunct}
              thisId={currentId}
              special={true}
              handleLoad={handleLoad}
            />

            <h3 className="mt-5 text">Trending this week</h3>
            <div className="d-flex">
              <MediaList
                typeofmedia="movie"
                media={mediaList0}
                genres={movieGenres}
                listId={0}
                myfunct={tempfunct}
                thisId={currentId}
                special={false}
                handleLoad={handleLoad}
              />
            </div>

            <GenreList genres={movieGenres} handleGenre={handleGenre} />

            <h3 className="mt-5 text">
              Highest rated{" "}
              <span className="accented-text">
                {selectedGenre === 2
                  ? ""
                  : movieGenres.map((item) =>
                      item["id"] === selectedGenre ? item["name"] : ""
                    )}{" "}
              </span>
              movies
            </h3>
            <MediaList
              typeofmedia="movie"
              media={mediaList1}
              genres={movieGenres}
              listId={1}
              myfunct={tempfunct}
              thisId={currentId}
              special={false}
              handleLoad={handleLoad}
            />

            <h3 className="mt-5 text">
              {selectedGenre === 2 ? "Best in Action" : "Popular "}{" "}
              <span className="accented-text">
                {selectedGenre === 2
                  ? ""
                  : movieGenres.map((item) =>
                      item["id"] === selectedGenre ? item["name"] : ""
                    )}{" "}
              </span>
              movies
            </h3>
            <MediaList
              typeofmedia="movie"
              media={mediaList2}
              genres={movieGenres}
              listId={2}
              myfunct={tempfunct}
              thisId={currentId}
              special={false}
              handleLoad={handleLoad}
            />

            {selectedGenre === 2 ? (
              <div>
                <h3 className="mt-5 text">Best in Comedy</h3>
                <MediaList
                  typeofmedia="movie"
                  media={mediaList3}
                  genres={movieGenres}
                  listId={3}
                  myfunct={tempfunct}
                  thisId={currentId}
                  special={false}
                  handleLoad={handleLoad}
                />
                <h3 className="mt-5 text">Best in Horror</h3>
                <MediaList
                  typeofmedia="movie"
                  media={mediaList4}
                  genres={movieGenres ? movieGenres : []}
                  listId={4}
                  myfunct={tempfunct}
                  thisId={currentId}
                  special={false}
                  handleLoad={handleLoad}
                />
                <h3 className="mt-5 text">Best in Animation</h3>
                <MediaList
                  typeofmedia="movie"
                  media={mediaList5}
                  genres={movieGenres ? movieGenres : []}
                  listId={5}
                  myfunct={tempfunct}
                  thisId={currentId}
                  special={false}
                  handleLoad={handleLoad}
                />

                <h3 className="mt-5 text">Best in Documentaries</h3>
                <MediaList
                  typeofmedia="movie"
                  media={mediaList8}
                  genres={movieGenres ? movieGenres : []}
                  listId={8}
                  myfunct={tempfunct}
                  thisId={currentId}
                  special={false}
                  handleLoad={handleLoad}
                />

                <h3 className="mt-5 text">Best in Romance</h3>
                <MediaList
                  typeofmedia="movie"
                  media={mediaList9}
                  genres={movieGenres ? movieGenres : []}
                  listId={9}
                  myfunct={tempfunct}
                  thisId={currentId}
                  special={false}
                  handleLoad={handleLoad}
                />
              </div>
            ) : (
              ""
            )}

            <h3 className="mt-5 text">
              New and upcoming{" "}
              <span className="accented-text">
                {selectedGenre === 2
                  ? ""
                  : movieGenres.map((item) =>
                      item["id"] === selectedGenre ? item["name"] : ""
                    )}{" "}
              </span>
              movies{" "}
            </h3>
            <MediaList
              typeofmedia="movie"
              media={mediaList7}
              genres={movieGenres ? movieGenres : []}
              listId={7}
              myfunct={tempfunct}
              thisId={currentId}
              special={false}
              handleLoad={handleLoad}
            />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Movies;
