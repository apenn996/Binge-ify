import "../App.css";
import {
  motion,
  animate,
  AnimationSequence,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import "../Devices.css";
import HeaderNav from "./HeaderNav";

// Animation defnitions
const header = {
  hidden: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: { delayChildren: 3, staggerChildren: 0.3 },
  },
};
const headerChild = {
  hidden: { opacity: 0, y: -120 },
  animate: {
    opacity: 1,
    y: 20,
    transition: { type: "spring", stiffness: 110 },
  },
};
const parallelCard = {
  hidden: { scale: 0.3, x: -1112, y: -200 },
  animate: {
    scale: [0.3, 0.3, 0.3, 1.2],
    x: [-1112, 60, 60, 60],
    y: [-200, -200, -200, 60],
    transition: {
      ease: "easeInOut",
      duration: 3,
      times: [0, 0.25, 0.5, 0.75, 1],
    },
  },
};
const sequence1 = [
  [".fragment1", { scale: 0.3, y: -200, x: -1500 }],
  /* x */ [
    ".fragment1",
    { scale: 0.3, y: -200, x: 0 },
    { delay: 0, duration: 0.4, ease: "easeOut" },
  ],
  /* y */ [
    ".fragment1",
    { scale: 0.3, y: 0, x: 0 },
    { delay: 0.5, duration: 0.7, ease: "easeOut" },
  ],
  /* scale */ [
    ".fragment1",
    { scale: 1.2, y: 0, x: 0 },
    { delay: 0.4, duration: 0.2, ease: "easeOut" },
  ],
];

const sequence2 = [
  [".fragment2", { scale: 0.3, y: -200, x: -1500 }],

  [
    ".fragment2",
    { scale: 0.3, y: -200, x: 0 },
    { delay: 0.1, duration: 0.4, ease: "easeOut" },
  ],
  [".fragment2", { scale: 0.3, y: 0, x: 0 }, { delay: 0.5, duration: 0.7 }],
  [
    ".fragment2",
    { scale: 1.2, y: 0, x: 0 },
    { delay: 0.3, ease: "easeOut", duration: 0.2 },
  ],
];

const sequence3 = [
  [".fragment3", { scale: 0.3, y: -200, x: -1500 }],

  [
    ".fragment3",
    { scale: 0.3, y: -200, x: 0 },
    { delay: 0.2, duration: 0.4, ease: "easeOut" },
  ],
  [".fragment3", { scale: 0.3, y: 0, x: 0 }, { delay: 0.5, duration: 0.7 }],
  [
    ".fragment3",
    { scale: 1.2, y: 0, x: 0 },
    { delay: 0.2, ease: "easeOut", duration: 0.2 },
  ],
];

const sequence4 = [
  [".fragment4", { scale: 0.3, y: -200, x: -1500 }],

  [
    ".fragment4",
    { scale: 0.3, y: -200, x: 0 },
    { delay: 0.3, duration: 0.4, ease: "easeOut" },
  ],
  [".fragment4", { scale: 0.3, y: 0, x: 0 }, { delay: 0.5, duration: 0.7 }],
  [
    ".fragment4",
    { scale: 1.2, y: 0, x: 0 },
    { delay: 0.1, ease: "easeOut", duration: 0.2 },
  ],
];

const sequence5 = [
  [".fragment5", { scale: 0.3, y: -200, x: -1500 }],

  [
    ".fragment5",
    { scale: 0.3, y: -200, x: 0 },
    { delay: 0.4, duration: 0.4, ease: "easeOut" },
  ],
  [".fragment5", { scale: 0.3, y: 0, x: 0 }, { delay: 0.5, duration: 0.7 }],
  [
    ".fragment5",
    { scale: 1.2, y: 0, x: 0 },
    { ease: "easeOut", duration: 0.2 },
  ],
];

const Binge = {
  hidden: { opacity: 0, rotate: 250, scale: 115 },
  animate: {
    opacity: 1,
    rotate: 0,
    y: 20,
    x: 0,
    scale: 1,
    transition: { ease: "easeOut", duration: 7 },
  },
};

const cards = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.2 },
  },
};
const card = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { ease: "easeInOut" } },
};

//most popular animation
const parent1 = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.5 },
  },
};
const line1 = {
  hidden: { height: 0, width: 5 },
  visible: { height: "100%", transition: { duration: 2, ease: "linear" } },
};
const circle1 = {
  hidden: { scale: 0.1 },
  visible: {
    scale: 1,
    transition: { delay: 1, type: "spring", stiffness: 170 },
  },
};

//browse at home animation
const atHomeParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.5 },
  },
};
const homeLine1 = {
  hidden: { width: 6, height: 0, top: "0px", left: "16.525%" },
  visible: { height: "13%", transition: { ease: "easeIn", duration: 0.5 } },
};
const homeLine2 = {
  hidden: { height: 5, width: 0, top: "13%", left: "16.525%" },
  visible: { width: "35%", transition: { ease: "easeOut", duration: 0.5 } },
};
const homePopup = {
  hidden: { scale: 1, backgroundColor: "rgba(235, 235, 45, 0)" },
  visible: {
    scale: 1,
    boxShadow: [
      "0px 0px 24px 6px rgba(231,195,1, 0)",
      "0px 0px 24px 6px rgba(231,195,1,0.52)",
      "0px 0px 24px 6px rgba(231,195,1, 0)",
      "0px 0px 24px 6px rgba(231,195,1,0.52)",
      "0px 0px 24px 6px rgba(231,195,1, 0)",
      "0px 0px 24px 6px rgba(231,195,1,0.52)",
      "0px 0px 24px 6px rgba(231,195,1, 0)",
      "0px 0px 24px 6px rgba(231,195,1,0.52)",
    ],
    backgroundColor: [
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
    ],
    transition: {
      delay: 1,
      ease: "easeOut",
      times: [0, 0.1, 0.15, 0.2, 0.3, 0.45, 0.7, 1],
      duration: 0.5,
    },
  },
};
//or on the go
const goParent = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { delayChildren: 0, staggerChildren: 0.5 },
  },
};
const goLine1 = {
  hidden: { height: 5, width: 0, top: "13%", left: "50%" },
  visible: { width: "40%", transition: { ease: "easeIn", duration: 0.5 } },
};
const goLine2 = {
  hidden: { height: 0, top: "13%", left: "90%" },
  visible: { height: "42.2%", transition: { ease: "linear", duration: 0.5 } },
};
const goLine3 = {
  hidden: { height: 5, width: 0, top: "55%", right: "10%" },
  visible: { width: "40%", transition: { ease: "easeOut", duration: 0.5 } },
};
const goPopup = {
  hidden: { scale: 1, backgroundColor: "rgba(235, 235, 45, 0)" },
  visible: {
    scale: 1,
    backgroundColor: [
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
      "rgba(235, 235, 45, 0)",
      "rgb(235, 235, 45)",
    ],
    boxShadow: [
      "0px -1px 54px 15px rgba(231,195,1, 0)",
      "0px -1px 54px 15px rgba(231,195,1,0.52)",
      "0px -1px 54px 15px rgba(231,195,1, 0)",
      "0px -1px 54px 15px rgba(231,195,1,0.52)",
      "0px -1px 54px 15px rgba(231,195,1, 0)",
      "0px -1px 54px 15px rgba(231,195,1,0.52)",
      "0px -1px 54px 15px rgba(231,195,1, 0)",
      "0px -1px 54px 15px rgba(231,195,1,0.52)",
    ],
    transition: {
      ease: "easeOut",
      times: [0, 0.1, 0.15, 0.2, 0.3, 0.45, 0.7, 1],
      duration: 1,
    },
  },
};
const accentedPopup = {
  initial: { scale: 0.1 },
  whileInView: { scale: 1 },
  viewport: { once: true },
  transition: { delay: 1, type: "spring", stiffness: 210 },
};
let displayInterval = 8000;
const worldArray: string[][] = [
  [
    "../no-image.jpg",
    "../no-image.jpg",
    "../no-image.jpg",
    "../no-image.jpg",
    "../no-image.jpg",
    "../no-image.jpg",
    "../no-image.jpg",
    "../no-image.jpg",
  ],
  ["../no-image.jpg", "../no-image.jpg", "../no-image.jpg"],
  ["../user.jpg"],
];
let i = 0;

const Home = () => {
  const [type, setType] = useState("world");
  const [headerType, setHeaderType] = useState("worlds");

  useEffect(() => {
    const interval = setInterval(() => {
      switch (i) {
        case 0:
          setType("characters");
          setHeaderType("characters");
          break;
        case 1:
          setType("stories");
          setHeaderType("stories");

          break;
        case 2:
          setType("world");
          setHeaderType("worlds");

          break;
        default:
          return "";
      }

      i++;
      if (i >= 3) {
        i = 0;
      }
    }, displayInterval);

    return () => clearInterval(interval);
  });

  //fix existing modals when back button is pressed and modal is opened
  useEffect(() => {
    {
      {
        let bodydiv = document?.getElementsByTagName("body");
        let modaldiv = document?.getElementsByClassName("modal-backdrop");

        for (i = 0; i < bodydiv.length; i++) {
          bodydiv[i].setAttribute("style", "");
          bodydiv[i].classList.remove("modal-open");
        }
        for (i = 0; i < modaldiv.length; i++) {
          modaldiv[i].remove();
        }
      }
    }
  }, []);

  useEffect(() => {
    const control1 = animate(sequence1 as AnimationSequence);
    const control2 = animate(sequence2 as AnimationSequence);
    const control3 = animate(sequence3 as AnimationSequence);
    const control4 = animate(sequence4 as AnimationSequence);
    const control5 = animate(sequence5 as AnimationSequence);
    control1.then(() => {
      control1.stop();
    });
    control2.then(() => {
      control2.stop();
    });
    control3.then(() => {
      control3.stop();
    });
    control4.then(() => {
      control4.stop();
    });
    control5.then(() => {
      control5.stop();
    });
  }, []);

  return (
    <div className="theme-dark">
      <link rel="stylesheet" href="devices.min.css" type="text/css"></link>

      <HeaderNav />

      <section
        style={{ height: "100vh", width: "100%" }}
        className=" section1 d-flex justify-content-center align-items-center overflow-hidden"
      >
        <div id="hero-overlay"></div>
        <div className="d-flex align-items-center justify-content-center fragmentContainer">
          <motion.div
            className="fragment fragment1"
            initial={{ x: "-1000%" }}
            style={{ bottom: -60, left: 60 }}
          >
            <img className="fragment-img" src="../barbie.png" />
          </motion.div>
          <motion.div
            className="fragment fragment2"
            initial={{ x: "-1000%" }}
            style={{ bottom: -30, left: 30 }}
          >
            <img className="fragment-img" src="../avater.jpg" />
          </motion.div>
          <motion.div
            className="fragment fragment3"
            initial={{ x: "-1000%" }}
            style={{ bottom: -60 }}
          >
            <img className="fragment-img" src="../g.png" />
          </motion.div>
          <motion.div
            className="fragment fragment4"
            initial={{ x: "-1000%" }}
            style={{ bottom: -30, right: 30 }}
          >
            <img className="fragment-img" src="../miles.png" />
          </motion.div>
          <motion.div
            className="fragment fragment5"
            initial={{ x: "-1000%" }}
            style={{ bottom: -60, right: 60 }}
          >
            <img className="fragment-img" src="../characters/johnwick.webp" />
          </motion.div>
        </div>
        <div className="row z-2">
          <div className="text d-block text-center align-items-center">
            <motion.div
              className="fw-bold d-block"
              initial="hidden"
              animate="animate"
              variants={header}
            >
              <motion.span
                variants={headerChild}
                className="hero-header me-3  d-inline-block"
              >
                Welcome{" "}
              </motion.span>
              <motion.span
                variants={headerChild}
                className="hero-header me-3 d-inline-block "
              >
                {" "}
                to{" "}
              </motion.span>
              <motion.span
                variants={headerChild}
                className="hero-header me-3 d-inline-block"
              >
                Bingify
              </motion.span>
            </motion.div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 20 }}
              transition={{ delay: 4.8 }}
              variants={headerChild}
            >
              Browse thousands of the latest movies, tv shows, and animated
              series to find your next binge.
            </motion.h3>
          </div>
        </div>
        <div id="hero-bottom-overlay"></div>
      </section>
    </div>
  );
};

export default Home;
