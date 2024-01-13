import { useContext } from "react";
// import { themeContext } from "./Full";

const Theme = () => {
  // const [theme, setTheme] = useContext(themeContext);

  const handleChange = () => {
    // setTheme(!theme);
  };

  return (
    <div className="col-1 bg-secondary2 fortypixels d-flex align-items-center justify-content-center rounded-pill">
      <div className="form-check form-switch ">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Theme
        </label>
      </div>
    </div>
  );
};

export default Theme;
