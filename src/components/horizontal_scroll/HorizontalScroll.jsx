import React, { useState, useEffect } from "react";
import "./HorizontalScroll.css";
import Earring from "../motion/Earring";

const img = [
  { url: "/images/earring1.jpg", description: "Test Image 1" },
  { url: "/images/earring2.jpg", description: "Test Image 2" },
  { url: "/images/flower-image.jpg", description: "Test Image 3" },
];

const images = [{ url: "/images/lady.jpg", description: "Test Image " }];
//let animateClass = "";
//let changeClass = "";
const HorizontalScroll = () => {
  const [currentIndexes, setCurrentIndexes] = useState([0, 1]);

  const handleNext = () => {
    setCurrentIndexes(([firstIndex, secondIndex]) => [
      (firstIndex + 1) % img.length,
      (secondIndex + 1) % img.length,
    ]);
  };

  /* const animateToPhoto = () => {
    animateClass = "add-jewelery";
    changeClass = "change-jewelery";
    console.log("function runned");
  }; */

  useEffect(() => {
    const interval = setInterval(handleNext, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, []);

  /*const styleAddJewelry = {
    zIndex: 10,
    transition: "transform 0.8s ease-in-out",
    transform: "translate(-560px, -92px)",
  };

  const styleChangeJewelry = {
    zIndex: 10,
    transition: "transform 0.8s ease-in-out",
    transform: "translate(-350px, 0)",
  }; */

  return (
    <div className="horizontal-scroll">
      <div className="box">
        <div className="left-side">
          <div
            className="para1"
            style={{
              fontSize: "24px",
              marginLeft: "100px",
              marginRight: "50px",
              paddingRight: "20px",
              paddingLeft: "80px",
              marginTop: "40px",
              display: "flex",
            }}
          >
            Earrings
          </div>
          <div className="container">
            <div className="vertical-line">
              <div className="horizontal-line">
                <div
                  className="container5"
                  style={{
                    width: "50%",
                    height: "240px",
                    backgroundColor: "dfe6e9",
                    marginTop: "40px",
                    alignItems: "center",
                    marginBottom: "60px",
                    paddingBottom: "50px",
                    marginRight: "30px",
                    paddingLeft: "40px",
                    marginLeft: "150px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div className="imagebox">
                    <img
                      src={images[0].url}
                      alt={img[0].description}
                      style={{
                        maxWidth: "85%",
                        maxHeight: "120%",
                        objectFit: "cover",
                        marginTop: "50px",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-side">
          <div className="container1">
            <div className="para">
              Every bloom has the power to inspire us to love unconditionally.
              These earrings, in radiant bloom, are certainly nothing short of
              that.
            </div>
            <div className="try">Try Now</div>
          </div>
          <div className="container3">
            <div className="item">
              <div className="image-box">
                <Earring>
                  <img
                    src={img[currentIndexes[0]].url}
                    alt={img[currentIndexes[0]].description}
                    //   style={animateClass === "add-jewelery" ? styleAddJewelry : {}}
                    //   onClick={animateToPhoto}
                  />
                </Earring>
              </div>
              <div className="text-box">
                <p>{img[currentIndexes[0]].description}</p>
              </div>
            </div>
            <div className="item">
              <div className="image-box">
                <img
                  src={img[currentIndexes[1]].url}
                  alt={img[currentIndexes[1]].description}
                />
              </div>
              <div className="text-box">
                <p>{img[currentIndexes[1]].description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HorizontalScroll;
