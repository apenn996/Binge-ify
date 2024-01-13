interface MovieToolTipProps {
  description: string;
  title: string;
  mediaType: string;
  rating: number;
}

const MovieTooltip = ({
  description,
  title,
  mediaType,
  rating,
}: MovieToolTipProps) => {
  return (
    <div className="movie-tooltip p-3 d-flex align-items-center flex-column">
      <h3 className=" fw-bold">{title}</h3>
      {/* <ul className="col-12 d-flex align-items-start  flex-column">
        <li>
          <h5>{mediaType === "tv" ? "TV show" : "Movie"}</h5>
        </li>
        <li>
          <h5>{rating} / 10</h5>
        </li>
      </ul> */}
      <div></div>
    </div>
  );
};

export default MovieTooltip;
