import MovieModal from "./MovieModal";
import MovieTooltip from "./MovieTooltip";
import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MediaListProps {
  genres: never[];
  media: never[];
  typeofmedia: string;
  listId: number;
  myfunct: (item: string) => void;
  handleLoad: (item: number) => void;
  thisId: string;
  special: boolean;
}

const header = {
  hidden: { opacity: 1 },
  animate: { opacity: 1, transition: { staggerChildren: 0.3 } },
};
const headerChild = {
  hidden: { opacity: 1, x: 30 },
  animate: {
    opacity: 1,
    x: -10,
    color: "#fff200",
    transition: { type: "spring", stiffness: 210 },
  },
};

let myindex: number;

const MediaList = ({
  genres,
  media,
  typeofmedia,
  listId,
  myfunct,
  thisId,
  special,
  handleLoad,
}: MediaListProps) => {
  const myRefname = useRef<HTMLButtonElement>(null);
  const [mediaList, setMediaList] = useState<never[]>(media);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    setMediaList(media);
  }, [media]);

  const handleId = () => {
    // console.log(index.toString() + listId.toString());
    // console.log(thisId);
    myfunct(myindex.toString() + listId.toString());
  };

  return (
    <div className="d-flex overflow-y-hidden">
      {mediaList
        ? mediaList.map((mediaItem, thisMediaItemIndex) => (
            <motion.div
              initial="hidden"
              whileHover="animate"
              variants={header}
              className="d-flex "
            >
              {special ? (
                <motion.h1
                  variants={headerChild}
                  className="top10-number outlined"
                >
                  {thisMediaItemIndex + 1}
                </motion.h1>
              ) : (
                ""
              )}
              <div
                key={thisMediaItemIndex}
                tabIndex={-1}
                className={
                  " card mb-4 me-4 p-0 overflow-hidden text movie-card"
                }
                onMouseDown={() => {
                  setIndex(thisMediaItemIndex);
                  myindex = thisMediaItemIndex;
                  handleId();
                }}
                onMouseUp={() => {
                  myRefname.current?.click();
                }}
              >
                {/* only generate a button and modal if the index your click equals index of list mediaItem */}
                {thisId ===
                thisMediaItemIndex.toString() + listId.toString() ? (
                  <div>
                    <button
                      key={thisMediaItemIndex.toString() + listId.toString()}
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
                      genres={genres ? genres : []}
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
                ) : (
                  ""
                )}
                {/* poster for media list card mediaItem  */}
                <img
                  key={Math.random()}
                  src={
                    mediaItem["poster_path"]
                      ? "https://image.tmdb.org/t/p/w500/" +
                        mediaItem["poster_path"]
                      : "../no-image.jpg"
                  }
                  className="movie-card-img border-light unrounded"
                  alt={"poster image for " + mediaItem["original_title"]}
                />
                {!special ? (
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
                ) : (
                  ""
                )}
              </div>
            </motion.div>
          ))
        : ""}
      {!special ? (
        <div
          className="list-load-more d-flex justify-content-center align-items-center"
          onClick={() => {
            handleLoad(listId);
          }}
        >
          <img
            src="../public/load-arrow-icon.png"
            className="list-load-icon d-flex"
          ></img>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default MediaList;
