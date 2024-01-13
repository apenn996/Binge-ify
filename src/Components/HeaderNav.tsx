import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const navUnderline = {
  hidden: { width: 0 },
  hover: { width: "100%", transition: { ease: "easeOut" } },
};

const HeaderNav = () => {
  return (
    <div className=" theme-dark text header-nav position-absolute col-12 overflow-hidden d-flex justify-content-center">
      <div className="nav-container d-flex col-11 justify-content-between align-items-center flex-wrap">
        <Link
          to="/home"
          className="d-flex align-items-center text-white text-decoration-none"
          
        >
          <div className="brand fs-1 p-0 m-0  fw-bold">BINGE</div>
          <div className="d-flex flex-column justify-content-center">
            <div className="vertical-brand-text fs-6 p-0 m-0 fw-bold ">ify</div>
          </div>
        </Link>

        <motion.ul className="nav-page-list nav-list  fw-bold d-flex align-items-center justify-conent-center ">
          <motion.li
            initial="hidden"
            animate="hidden"
            whileHover="hover"
            className=" fs-4 nav-page-list-item"
          >
            {" "}
            <Link to="/home">Home</Link>
            <motion.div variants={navUnderline} className="nav-list-underline">
              {" "}
            </motion.div>
          </motion.li>
          <motion.li
            initial="hidden"
            animate="hidden"
            whileHover="hover"
            className=" fs-4 nav-page-list-item"
          >
            {" "}
            <Link to="/movies">Movies</Link>
            <motion.div variants={navUnderline} className="nav-list-underline">
              {" "}
            </motion.div>
          </motion.li>
          <motion.li
            initial="hidden"
            animate="hidden"
            whileHover="hover"
            className=" fs-4 nav-page-list-item"
          >
            {" "}
            <Link to="/series">Series</Link>
            <motion.div variants={navUnderline} className="nav-list-underline">
              {" "}
            </motion.div>
          </motion.li>
        </motion.ul>
        <div className="search-icon">
          <Link className=" position-absolute" to="/search"></Link>
          <img
            className=""
            src="../search-icon.png"
            alt="search-icon"
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderNav;
