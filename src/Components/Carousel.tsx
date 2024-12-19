import ModalLoader from "./ModalLoader";
import HeaderNav from "./HeaderNav";
interface CarouselProps {
  medias: never[];
  typeofmedia: string;
  tvGenres: never[];
  movieGenres: never[];
  listId: number;
  myfunct: (item: string) => void;
  thisId: string;
}
// Math.floor(Math.random() * (max - min + 1)) + min
//to randomize featured media from an array of length 20
let rand = [
  Math.floor(Math.random() * (6 - 0 + 1)) + 0,
  Math.floor(Math.random() * (12 - 7 + 1)) + 7,
  Math.floor(Math.random() * (19 - 13 + 1)) + 13,
];

const Carousel = ({
  medias,
  tvGenres,
  movieGenres,
  listId,
  myfunct,
  thisId,
  typeofmedia,
}: CarouselProps) => {

  return (
    <div id="carousel" className="carousel slide ">
      <div className="carousel-overlay-bottom "></div>

      <div className="carousel-indicators ">
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#carousel"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
      </div>
      <div className="carousel-inner  ">
      <HeaderNav />
        <div className="carousel-item active  ">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" +
              medias
                .filter((media, index) => index === rand[0])
                .map((media) => media["backdrop_path"])
            }
            className="carousel-image  w-100"
            alt="carousel image"
          />

          <div className="d-flex justify-content-center position-relative ">
            <div className="carousel-caption text-start col-11">
              <div className="col-12">
                <h1 className="carousel-title col-12 col-lg-6 fw-bold">
                  {medias
                    .filter((media, index) => index === rand[0])
                    .map((media) =>
                      typeofmedia === "movie" ? media["title"] : media["name"]
                    )}
                </h1>
                <h5>
                  {medias
                    .filter((media, index) => index === rand[0])
                    .map((media) =>
                      (typeofmedia === "movie"
                        ? (media["release_date"] as string)
                        : (media["first_air_date"] as string)
                      ).substring(0, 4)
                    )}
                </h5>
                <p className="carousel-description  col-lg-6">
                  {medias
                    .filter((media, index) => index === rand[0])
                    .map((media) => media["overview"])}
                </p>
                <div className="loader-parent  ">
                  <ModalLoader
                    listId={listId + 0}
                    myfunct={myfunct}
                    thisId={thisId}
                    mediaList={medias.filter(
                      (media, index) => index === rand[0]
                    )}
                    tvGenres={tvGenres}
                    movieGenres={movieGenres}
                    typeofmedia={typeofmedia}
                  ></ModalLoader>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="carousel-item">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" +
              medias
                .filter((media, index) => index === rand[1])
                .map((media) => media["backdrop_path"])
            }
            className="carousel-image d-block w-100"
            alt="carousel image"
          />
          <div className="d-flex justify-content-center position-relative ">
            <div className="carousel-caption text-start col-11">
              <div className="col-12">
                <h1 className="carousel-title col-12 col-lg-6">
                  {medias
                    .filter((media, index) => index === rand[1])
                    .map((media) =>
                      typeofmedia === "movie" ? media["title"] : media["name"]
                    )}
                </h1>
                <h5>
                  {medias
                    .filter((media, index) => index === rand[1])
                    .map((media) =>
                      (typeofmedia === "movie"
                        ? (media["release_date"] as string)
                        : (media["first_air_date"] as string)
                      ).substring(0, 4)
                    )}
                </h5>
                <p className="carousel-description  col-lg-6 ">
                  {medias
                    .filter((media, index) => index === rand[1])
                    .map((media) => media["overview"])}
                </p>
                <div className="position-absolute ">
                  <ModalLoader
                    listId={listId + 1}
                    myfunct={myfunct}
                    thisId={thisId}
                    mediaList={medias.filter(
                      (media, index) => index === rand[1]
                    )}
                    tvGenres={tvGenres}
                    movieGenres={movieGenres}
                    typeofmedia={typeofmedia}
                  ></ModalLoader>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src={
              "https://image.tmdb.org/t/p/original/" +
              medias
                .filter((media, index) => index === rand[2])
                .map((media) => media["backdrop_path"])
            }
            className="carousel-image d-block w-100"
            alt="carousel image"
          />
          <div className="d-flex justify-content-center position-relative ">
            <div className="carousel-caption text-start col-11">
              <div className="col-12">
                <h1 className="carousel-title col-12 col-lg-6">
                  {medias
                    .filter((media, index) => index === rand[2])
                    .map((media) =>
                      typeofmedia === "movie" ? media["title"] : media["name"]
                    )}
                </h1>
                <h5>
                  {medias
                    .filter((media, index) => index === rand[2])
                    .map((media) =>
                      (typeofmedia === "movie"
                        ? (media["release_date"] as string)
                        : (media["first_air_date"] as string)
                      ).substring(0, 4)
                    )}
                </h5>
                <p className="carousel-description  col-lg-6">
                  {medias
                    .filter((media, index) => index === rand[2])
                    .map((media) => media["overview"])}
                </p>
                <div className="position-absolute ">
                  <ModalLoader
                    listId={listId + 2}
                    myfunct={myfunct}
                    thisId={thisId}
                    mediaList={medias.filter(
                      (media, index) => index === rand[2]
                    )}
                    tvGenres={tvGenres}
                    movieGenres={movieGenres}
                    typeofmedia={typeofmedia}
                  ></ModalLoader>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev z-1"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next z-1"
        type="button"
        data-bs-target="#carousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;
