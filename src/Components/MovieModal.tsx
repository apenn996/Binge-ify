import { ReactNode, useEffect } from "react";
import { useState } from "react";

interface MovieModalProps {
  title: string;
  headerImage: string;
  description: string;
  posterImage: string;
  releaseYear: () => string;
  genres: never[];
  thisGenreId: never[];
  mediaType: string;
  rating: number;
  voteCount: number;
  mediaID: number;
}

const MovieModal = ({
  title,
  headerImage,
  description,
  posterImage,
  releaseYear,
  genres,
  mediaType,
  rating,
  thisGenreId,
  mediaID,
  voteCount,
}: MovieModalProps) => {
  const [specific, setSpecific] = useState([]);
  const [externalIDs, setExternalIDs] = useState([]);
  const [providers, setProviders] = useState<never[]>([]);
  const [video, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODI2YmM3ODMxMWMxZWU4MDM2M2QxYzRjYjJlMmIxNiIsInN1YiI6IjY1NTdkYmY0ZWE4NGM3MTA5MjI4ZGQ3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kDZp_UGvkGkswlEXTSRF08deRjy5T1BP5p-7B0rGtOE",
    },
  };
  //could combined video, externals with
  const handleDetails = async () => {
    let specificURL = "";
    mediaType === "tv"
      ? (specificURL =
          "https://api.themoviedb.org/3/tv/" +
          mediaID +
          "?language=en-US&append_to_response=content_ratings,credits,reviews")
      : (specificURL =
          "https://api.themoviedb.org/3/movie/" +
          mediaID +
          "?language=en-US&append_to_response=release_dates,credits,reviews");
    try {
      await fetch(specificURL, options)
        .then((response) => response.json())
        .then((json) => setSpecific(json));
    } catch (err: any) {
      console.error("error fetching details");
    }
  };

  const handleVideos = () => {
    let videoURL = "";
    mediaType === "tv"
      ? (videoURL =
          "https://api.themoviedb.org/3/tv/" +
          mediaID +
          "/videos?language=en-US")
      : (videoURL =
          "https://api.themoviedb.org/3/movie/" +
          mediaID +
          "/videos?language=en-US");

    try {
      fetch(videoURL, options)
        .then((response) => response.json())
        .then((json) => setVideos(json.results))
        .then(() => setLoading(false));
    } catch (err: any) {
      console.error("error fetching videos");
    }
  };

  const handleExternalIDs = async () => {
    let externalURL = "";
    mediaType === "tv"
      ? (externalURL =
          "https://api.themoviedb.org/3/tv/" + mediaID + "/external_ids")
      : (externalURL =
          "https://api.themoviedb.org/3/movie/" + mediaID + "/external_ids");
    try {
      await fetch(externalURL, options)
        .then((response) => response.json())
        .then((json) => setExternalIDs(json));
    } catch (err: any) {
      console.error("error fetching external ids");
    }
  };

  const handleProviders = async () => {
    let providersURL = "";
    mediaType === "tv"
      ? (providersURL =
          "https://api.themoviedb.org/3/tv/" + mediaID + "/watch/providers")
      : (providersURL =
          "https://api.themoviedb.org/3/movie/" + mediaID + "/watch/providers");
    try {
      await fetch(providersURL, options)
        .then((response) => response.json())
        .then((json) => setProviders(json.results.US));
    } catch (err: any) {
      console.error("error fetching providers");
    }
  };

  //set state on first render
  useEffect(() => {
    handleDetails();
    handleVideos();
    handleExternalIDs();
    handleProviders();
  }, []);

  //for bug checking
  useEffect(() => {
    //     console.log("STATE CHANGED")
    // console.log(specific)
    // console.log(video)
    // console.log(externalIDs)
    // console.log( ((specific['release_dates']?.results) ))
    // console.log( ((specific['release_dates']?.results) ? (specific['release_dates']?.results.filter((item) => (item['iso_3166_1'] === 'US'))[0]?.release_dates?.filter((item2) => (item2['certification'] !== ''))[0]?.certification   ) : ""))
  });

  //show more popular people first in producer/writer credits
  const handleSorting = (item1, item2) => {
    if (item1["popularity"] > item2["popularity"]) {
      return -1;
    } else if (item1["popularity"] < item2["popularity"]) {
      return 1;
    }
  };

  //stop mouse up from affecting inside open modal
  const handleMouseUpEvent = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className=" modal fade"
      data-dismiss="modal"
      onMouseUp={(e) => {
        handleMouseUpEvent(e);
      }}
      id="mediaModal"
      tabIndex={-1}
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog  modal-xl modal-fullscreen-xxl-down ">
        <div className="modal-content bg-transparent border-0">
          <div className="modal-body  ">
            <div className=" modal-middle ">
              <div
                className="modal-headerimage fill"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/original${headerImage}'`,
                }}
              >
                <button
                  type="button"
                  className="modal-close-button position-absolute  btn-close btn-close-white "
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>

                <div className="modal-header-overlay"></div>
                <div className="inner-container">
                  {/* socials list */}
                  <div
                    id="modal-poster-social-container"
                    className="d-flex justify-content-center "
                  >
                    <img
                      className="modal-image-inner"
                      src={"https://image.tmdb.org/t/p/original" + posterImage}
                      alt="background image for media"
                    />
                    <div className="external-side-panel">
                      <ul className="socialList">
                        {specific["homepage"] ? (
                          <a
                            className="center mt-3"
                            href={specific["homepage"]}
                          >
                            <li className="socialBlock ">
                              <img src="../home-icon.png" alt="homepage icon" />{" "}
                            </li>
                          </a>
                        ) : (
                          ""
                        )}

                        {externalIDs["imdb_id"] ? (
                          <a
                            className="center mt-3"
                            href={
                              "https://imdb.com/title/" + externalIDs["imdb_id"]
                            }
                          >
                            <li className="socialBlock ">
                              <img src="../imdb-icon.png" alt="imdb icon" />{" "}
                            </li>
                          </a>
                        ) : (
                          ""
                        )}

                        {externalIDs["instagram_id"] ? (
                          <a
                            className="center mt-3"
                            href={
                              "https://www.instagram.com/" +
                              externalIDs["instagram_id"] +
                              "/"
                            }
                          >
                            <li className="socialBlock ">
                              <img
                                src="../instagram-icon.png"
                                alt="instagram icon"
                              />{" "}
                            </li>
                          </a>
                        ) : (
                          ""
                        )}
                        {externalIDs["twitter_id"] ? (
                          <a
                            className="center mt-3"
                            href={"https://x.com/" + externalIDs["twitter_id"]}
                          >
                            <li className="socialBlock ">
                              <img src="../x-icon.png" alt="twitter icon" />{" "}
                            </li>
                          </a>
                        ) : (
                          ""
                        )}

                        {externalIDs["facebook_id"] ? (
                          <a
                            className="center mt-3"
                            href={
                              "https://facebook.com/" +
                              externalIDs["facebook_id"]
                            }
                          >
                            <li className="socialBlock ">
                              <img
                                src="../facebook-icon.png"
                                alt="facebook icon"
                              />{" "}
                            </li>
                          </a>
                        ) : (
                          ""
                        )}
                      </ul>
                    </div>
                  </div>

                  <div id="tagline" className="">
                    {" "}
                    <h4>
                      <em>
                        {specific["tagline"] !== undefined &&
                        specific["tagline"] !== ""
                          ? '"' + specific["tagline"] + '"'
                          : ""}
                      </em>
                    </h4>
                  </div>
                </div>
              </div>
              {/* TAB CONTROLLER */}
              <ul
                className="nav nav-tabs bg-tertiary2"
                id="myTab"
                role="tablist"
              >
                <li
                  className="nav-item col-sm-3 text-align-center"
                  role="presentation"
                >
                  <button
                    className="nav-link active col-12 text-secondary "
                    id="home-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#home-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="home-tab-pane"
                    aria-selected="true"
                  >
                    Details
                  </button>
                </li>
                <li className="nav-item col-sm-3" role="presentation">
                  <button
                    className="nav-link col-12 text-secondary"
                    id="profile-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#profile-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="profile-tab-pane"
                    aria-selected="false"
                  >
                    How to Watch
                  </button>
                </li>
                <li className="nav-item col-sm-3" role="presentation">
                  <button
                    className="nav-link col-12 text-secondary"
                    id="contact-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#contact-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="contact-tab-pane"
                    aria-selected="false"
                  >
                    Cast and Crew
                  </button>
                </li>
                <li className="nav-item col-sm-3" role="presentation">
                  <button
                    className="nav-link col-12 text-secondary"
                    id="s-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#s-tab-pane"
                    type="button"
                    role="tab"
                    aria-controls="#s-tab-pane"
                    aria-selected="false"
                  >
                    Reviews ({specific["reviews"]?.total_results})
                  </button>
                </li>
              </ul>

              {/* CONTENT TAB 1 */}
              <div className="tab-content" id="myTabContent">
                <div
                  className="tab-pane show active"
                  id="home-tab-pane"
                  role="tabpanel"
                  aria-labelledby="home-tab"
                  tabIndex={0}
                >
                  <div className="modal-body-content">
                    <div className="col-12 text">
                      <h1 className="fs-1">
                        {title}{" "}
                        <span className="m-0 text-secondary">
                          {" "}
                          ({releaseYear()})
                        </span>{" "}
                      </h1>

                      {/* media type, release status, and age rating */}
                      <div className="">
                        <h5 className="text-secondary">
                          {(mediaType === "tv" ? "TV show" : "Movie") +
                            " • " +
                            specific["status"] +
                            (mediaType === "movie"
                              ? specific["release_dates"]?.results
                                  ?.filter(
                                    (item) => item["iso_3166_1"] === "US"
                                  )[0]
                                  ?.release_dates?.filter(
                                    (item2) => item2["certification"] !== ""
                                  )[0]?.certification
                                ? " • " +
                                  specific["release_dates"]?.results
                                    ?.filter(
                                      (item) => item["iso_3166_1"] === "US"
                                    )[0]
                                    ?.release_dates?.filter(
                                      (item2) => item2["certification"] !== ""
                                    )[0]?.certification
                                : ""
                              : specific["content_ratings"]?.results?.filter(
                                  (item) => item["iso_3166_1"] === "US"
                                )[0]?.rating
                              ? " • " +
                                specific["content_ratings"]?.results?.filter(
                                  (item) => item["iso_3166_1"] === "US"
                                )[0]?.rating
                              : "")}
                        </h5>
                      </div>

                      {/* get current items genre list and compare it to the genre list for that media type. If total genre list includes specific genre list, return that genre from total genre list  */}

                      {/* star rating and number of votes */}
                      <div className="d-flex center-v mb-2">
                        <div className="rating ">
                          <div
                            className="rating-upper"
                            style={{ width: rating * 10 + 2 }}
                          >
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                          </div>
                          <div className="rating-lower">
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                            <span>★</span>
                          </div>
                        </div>
                        <div className="fs-4 ms-2 d-flex align-items-center">
                          ({voteCount})
                        </div>
                      </div>
                      <ul className="accented-text modal-genre-list list-group list-group-horizontal ">
                        {thisGenreId.map((item1) =>
                          genres.map((item2, index) => {
                            (item2["id"] as string).toString().includes(item1);
                          })
                            ? genres.map((item2) =>
                                (item2["id"] as string).toString() ===
                                (item1 as string).toString() ? (
                                  <li
                                    key={item2["id"]}
                                    className="fs-5 modal-genre-list-item me-3 "
                                  >
                                    {" "}
                                    {item2["name"]}
                                  </li>
                                ) : (
                                  ""
                                )
                              )
                            : ""
                        )}
                      </ul>
                    </div>

                    <h3 className="text mt-4">Overview</h3>
                    <p className="text ">{description}</p>

                    <div className="trailer-container col-12 d-flex justify-content-center pt-5 pb-5  ">
                      {/* try to find the oldest trailer available and return that, otherwise try to return the latest video */}
                      {!loading &&
                      video?.filter((item) => item["type"] === "Trailer")
                        .length !== 0 ? (
                        <iframe
                          width="100%"
                          height="480"
                          allow="fullscreen;"
                          name="embed-trailer"
                          src={
                            video
                              ? "https://www.youtube-nocookie.com/embed/" +
                                video
                                  ?.filter((item) => item["type"] === "Trailer")
                                  .splice(
                                    video?.filter(
                                      (item) => item["type"] === "Trailer"
                                    ).length - 1,
                                    video?.filter(
                                      (item) => item["type"] === "Trailer"
                                    ).length
                                  )
                                  .map((index) => index["key"]) +
                                "?rel=0" +
                                "?vq=hd1080/"
                              : "no trailer"
                          }
                        ></iframe>
                      ) : video?.length === 0 ? (
                        "no videos available"
                      ) : video?.length > 0 ? (
                        <iframe
                          width="100%"
                          height="480"
                          allow="fullscreen;"
                          name="embed-trailer"
                          src={
                            video
                              ? "https://www.youtube-nocookie.com/embed/" +
                                video[0]["key"] +
                                "?rel=0" +
                                "?vq=hd1080/"
                              : "no trailer"
                          }
                        ></iframe>
                      ) : (
                        <h3>Loading</h3>
                      )}
                    </div>
                    {/* production companies for media */}
                    <div className="d-flex flex-wrap justify-content-evenly mt-5">
                      {specific["production_companies"]?.map((item) => (
                        <div key={item["id"]} className="m-3 ">
                          <div className="center flex-column">
                            <h6 className="col-12 text-center text-secondary">
                              {item["name"]}
                            </h6>
                            {item["logo_path"] ? (
                              <img
                                className="production-company-logo center"
                                src={
                                  "https://image.tmdb.org/t/p/original/" +
                                  item["logo_path"]
                                }
                                alt="production company logo"
                              />
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CONTENT TAB 2 */}

                <div
                  className="tab-pane"
                  id="profile-tab-pane"
                  role="tabpanel"
                  aria-labelledby="profile-tab"
                  tabIndex={0}
                >
                  <div className="modal-body-content">
                    <div className="col-12 text">
                      <h1 className="fs-1 m-0 mb-3 "> How to Watch </h1>
                    </div>

                    {/* stream, buy, and watch free options for media */}
                    <h3 className="text mt-3">Stream</h3>
                    <ul className=" list-group watch-list list-group-horizontal">
                      {providers
                        ? typeof providers["flatrate"] !== "undefined"
                          ? providers["flatrate"]?.map((item) => (
                              <li className=" me-3">
                                <img
                                  className="watch-icon"
                                  src={
                                    "https://image.tmdb.org/t/p/original/" +
                                    item["logo_path"]
                                  }
                                  alt={
                                    item["provider_name"] + " streaming icon"
                                  }
                                />
                              </li>
                            ))
                          : "There is currently no option to stream this media. "
                        : "This media does not currently have any known watch options."}
                    </ul>

                    <h3 className="text  mt-3">Buy</h3>
                    <ul className=" list-group list-group-horizontal watch-list">
                      {providers
                        ? typeof providers["buy"] !== "undefined"
                          ? providers["buy"]?.map((item) => (
                              <li className=" me-3">
                                <img
                                  className="watch-icon"
                                  src={
                                    "https://image.tmdb.org/t/p/original/" +
                                    item["logo_path"]
                                  }
                                  alt={
                                    item["provider_name"] + " streaming icon"
                                  }
                                />
                              </li>
                            ))
                          : "There is currently no option to buy this media."
                        : "This media does not currently have any known watch options."}
                    </ul>

                    <h3 className="text  mt-3">Free</h3>
                    <ul className=" list-group list-group-horizontal watch-list">
                      {providers
                        ? typeof providers["free"] !== "undefined"
                          ? providers["free"]?.map((item) => (
                              <li className=" me-3">
                                <img
                                  className="watch-icon"
                                  src={
                                    "https://image.tmdb.org/t/p/original/" +
                                    item["logo_path"]
                                  }
                                  alt={
                                    item["provider_name"] + " streaming icon"
                                  }
                                />
                              </li>
                            ))
                          : "There is currently no option to watch this media for free. "
                        : "This media does not currently have any known watch options."}
                    </ul>
                  </div>
                </div>
                {/* CONTENT TAB 3 */}

                <div
                  className="tab-pane "
                  id="contact-tab-pane"
                  role="tabpanel"
                  aria-labelledby="contact-tab"
                  tabIndex={0}
                >
                  <div className="modal-body-content">
                    <div className="col-12 text"></div>

                    <h1 className="text mb-2">Starring</h1>
                    <ul
                      id="c3"
                      className="credit-list list-group list-group-horizontal "
                    >
                      {specific
                        ? specific["credits"]?.cast
                            ?.slice(0, 40)
                            ?.map((actor, index) => (
                              <li className="text text-center d-flex flex-column align-items-center me-4 ">
                                <h5 className="credit-person-name">
                                  {actor["name"]}
                                </h5>
                                <img
                                  src={
                                    actor["profile_path"]
                                      ? "https://image.tmdb.org/t/p/original/" +
                                        actor["profile_path"]
                                      : "../no-image.jpg"
                                  }
                                  className="credit-person-portrait"
                                  alt="creditee portrait"
                                />
                                <h5>as {actor["character"]}</h5>
                              </li>
                            ))
                        : ""}
                    </ul>
                    {/* try to show 'created by' over writer/director for tv shows. It is usually more accurate. */}
                    {mediaType === "tv" &&
                    specific["created_by"]?.length !== 0 ? (
                      <div>
                        <h1 className="text  tab3-title">Created By</h1>
                        <ul className="credit-list list-group list-group-horizontal">
                          {specific["created_by"]?.length !== 0
                            ? specific["created_by"]?.map((creator, index) => (
                                <li className="text text-center d-flex flex-column align-items-center me-4 ">
                                  <h5 className="credit-person-name">
                                    {creator["name"]}
                                  </h5>
                                  <img
                                    src={
                                      creator["profile_path"]
                                        ? "https://image.tmdb.org/t/p/original/" +
                                          creator["profile_path"]
                                        : "../no-image.jpg"
                                    }
                                    className="credit-person-portrait"
                                    alt="creditee portrait"
                                  />
                                </li>
                              ))
                            : "Unknown creator."}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}

                    {mediaType === "movie" ? (
                      <div>
                        <h1 className="text tab3-title">Directed By</h1>
                        <ul className="credit-list list-group list-group-horizontal">
                          {specific["credits"]?.crew?.filter(
                            (crew) =>
                              crew["job"] === "Director" ||
                              crew["job"] === "Series Director"
                          )?.length !== 0
                            ? specific["credits"]?.crew
                                ?.filter(
                                  (crew) =>
                                    crew["job"] === "Director" ||
                                    crew["job"] === "Series Director"
                                )
                                .map((director, index) => (
                                  <li className="text text-center d-flex flex-column align-items-center me-4 ">
                                    <h5 className="credit-person-name">
                                      {director["name"]}
                                    </h5>
                                    <img
                                      src={
                                        director["profile_path"]
                                          ? "https://image.tmdb.org/t/p/original/" +
                                            director["profile_path"]
                                          : "../no-image.jpg"
                                      }
                                      className="credit-person-portrait"
                                      alt="creditee portrait"
                                    />
                                  </li>
                                ))
                            : "Unknown director."}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}

                    {specific["created_by"]?.length === 0 ||
                    mediaType === "movie" ? (
                      <div>
                        <h1 className="text tab3-title">Written By</h1>

                        <ul className="credit-list list-group list-group-horizontal">
                          {specific["credits"]?.crew
                            ?.sort(handleSorting)
                            .filter(
                              (crew) =>
                                crew["job"] === "Writer" ||
                                crew["job"] === "Screenplay" ||
                                crew["job"] === "Novel" ||
                                crew["job"] === "Comic Book" ||
                                crew["job"] === "Series Composition" ||
                                crew["job"] === "Original Concept"
                            )?.length !== 0
                            ? specific["credits"]?.crew
                                ?.filter(
                                  (crew) =>
                                    crew["job"] === "Writer" ||
                                    crew["job"] === "Screenplay" ||
                                    crew["job"] === "Novel" ||
                                    crew["job"] === "Comic Book" ||
                                    crew["job"] === "Series Composition" ||
                                    crew["job"] === "Original Concept"
                                )
                                .map((writer, index) => (
                                  <li className="text text-center d-flex flex-column align-items-center me-4 ">
                                    <h5 className="credit-person-name">
                                      {writer["name"]}
                                    </h5>
                                    <img
                                      src={
                                        writer["profile_path"] !== null
                                          ? "https://image.tmdb.org/t/p/original/" +
                                            writer["profile_path"]
                                          : "../no-image.jpg"
                                      }
                                      className="credit-person-portrait"
                                      alt="creditee portrait"
                                    />
                                  </li>
                                ))
                            : "Unknown writer."}
                        </ul>
                      </div>
                    ) : (
                      ""
                    )}

                    <h1 className="text  tab3-title">Produced By</h1>

                    <ul className="credit-list list-group list-group-horizontal">
                      {specific["credits"]?.crew
                        ?.sort(handleSorting)
                        ?.filter(
                          (crew) =>
                            crew["job"] === "Producer" ||
                            crew["job"] === "Executive Producer"
                        )?.length !== 0
                        ? specific["credits"]?.crew
                            ?.filter(
                              (crew) =>
                                crew["job"] === "Producer" ||
                                crew["job"] === "Executive Producer"
                            )
                            .map((producer, index) => (
                              <li className="text text-center d-flex flex-column align-items-center me-4 ">
                                <h5 className="credit-person-name">
                                  {producer["name"]}
                                </h5>
                                <img
                                  src={
                                    producer["profile_path"]
                                      ? "https://image.tmdb.org/t/p/original/" +
                                        producer["profile_path"]
                                      : "../no-image.jpg"
                                  }
                                  className="credit-person-portrait"
                                  alt="creditee portrait"
                                />
                              </li>
                            ))
                        : "Unknown producer."}
                    </ul>

                    <h1 className="text  tab3-title">Music By</h1>

                    <ul className="credit-list list-group list-group-horizontal">
                      {specific["credits"]?.crew?.filter(
                        (crew) => crew["job"] === "Original Music Composer"
                      )?.length !== 0
                        ? specific["credits"]?.crew
                            ?.filter(
                              (crew) =>
                                crew["job"] === "Original Music Composer"
                            )
                            .map((composer, index) => (
                              <li className="text text-center d-flex flex-column align-items-center me-4 ">
                                <h5 className="credit-person-name">
                                  {composer["name"]}
                                </h5>
                                <img
                                  src={
                                    composer["profile_path"]
                                      ? "https://image.tmdb.org/t/p/original/" +
                                        composer["profile_path"]
                                      : "../no-image.jpg"
                                  }
                                  className="credit-person-portrait"
                                  alt="creditee portrait"
                                />
                              </li>
                            ))
                        : "Unknown composer."}
                    </ul>
                  </div>
                </div>

                {/* {TAB CONTENT 4} */}
                <div
                  className="tab-pane"
                  id="s-tab-pane"
                  role="tabpanel"
                  aria-labelledby="disabled-tab"
                  tabIndex={0}
                >
                  <div className="modal-body-content">
                    <div className="col-12 text">
                      <h1 className="fs-1 mb-2"> Reviews </h1>

                      <ul className="socialList list-group ">
                        {specific["reviews"]?.results.length !== 0 ? (
                          specific["reviews"]?.results?.map((item) => (
                            <li className=" me-3 mt-5 mb-5">
                              <div className="d-flex align-items-center">
                                <img
                                  className="review-avatar m-3"
                                  src={
                                    item["author_details"]["avatar_path"] !==
                                    null
                                      ? "https://image.tmdb.org/t/p/original/" +
                                        item["author_details"]["avatar_path"]
                                      : "../user.jpg"
                                  }
                                  alt={"user profile picture"}
                                />
                                <div>
                                  <h2 className="mb-2">
                                    {item["author_details"]["username"]}{" "}
                                    {item["author_details"]["rating"] ? (
                                      <span
                                        className={
                                          item["author_details"]["rating"] >= 7
                                            ? "text-success"
                                            : item["author_details"]["rating"] <
                                                7 &&
                                              item["author_details"][
                                                "rating"
                                              ] >= 4
                                            ? "text-warning"
                                            : item["author_details"]["rating"] <
                                              4
                                            ? "text-danger"
                                            : ""
                                        }
                                      >
                                        {" "}
                                      </span>
                                    ) : (
                                      ""
                                    )}
                                  </h2>
                                  <h5>
                                    {" "}
                                    <span
                                      className={
                                        item["author_details"]["rating"]
                                          ? "accented-outline"
                                          : ""
                                      }
                                    >
                                      {item["author_details"]["rating"]
                                        ? item["author_details"]["rating"] + "★"
                                        : ""}
                                    </span>{" "}
                                    {item["author_details"]["rating"]
                                      ? "•"
                                      : ""}
                                    <span className="text">
                                      {" "}
                                      {item["created_at"].slice(5, 7)}-
                                      {item["created_at"].slice(8, 10)}-
                                      {item["created_at"].slice(0, 4)}
                                    </span>{" "}
                                  </h5>
                                  <h5></h5>
                                </div>
                              </div>
                              <p className="">{item["content"]}</p>
                            </li>
                          ))
                        ) : (
                          <h5 className="mt-5">
                            There are no reviews for this media.
                          </h5>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
