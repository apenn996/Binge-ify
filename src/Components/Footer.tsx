const Footer = () => {
  return (
    <div className=" footer d-flex align-items-end justify-content-center  overflow-hidden">
      <div className="d-block text-center">
        <h6 className=" text">Made by Austin Pennartz</h6>
        <h6 className=" text">
          Created with the JustWatch and TMDB(v3) developer API:{" "}
          <a href="https://developer.themoviedb.org/docs">
            https://developer.themoviedb.org/docs
          </a>
        </h6>
        <h6 className=" text">
          *All status, dates, and availabilities for media is based on US data
        </h6>
      </div>
    </div>
  );
};

export default Footer;
