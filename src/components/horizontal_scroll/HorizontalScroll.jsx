import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "@react-spring/web";
import "./HorizontalScroll.css";

const img = [
  { url: "/images/earring1.jpg", description: "Test Image 1" },
  { url: "/images/earring2.jpg", description: "Test Image 2" },
  { url: "/images/flower-image.jpg", description: "Test Image 3" },
];

const images = [{ url: "/images/lady.jpg", description: "Test Image" }];

const HorizontalScroll = () => {
  const [currPos, setCurrPos] = useState(0);
  const modelRef = useRef(null);
  const carouselRefs = useRef([]);

  const [{ x, y, scale, zIndex }, setSprings] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    zIndex: 1,
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    if (modelRef.current && carouselRefs.current[currPos]) {
      const modelRect = modelRef.current.getBoundingClientRect();
      const targetRect = carouselRefs.current[currPos].getBoundingClientRect();

      const modelWidth = modelRect.width;
      const modelHeight = modelRect.height;
      const targetWidth = targetRect.width;
      const targetHeight = targetRect.height;

      const scaleFactor = Math.min(
        targetWidth / modelWidth,
        targetHeight / modelHeight
      );

      const left =
        targetRect.left +
        targetWidth / 2 -
        modelRect.left -
        (modelWidth * scaleFactor) / 2;
      const top =
        targetRect.top +
        targetHeight / 2 -
        modelRect.top -
        (modelHeight * scaleFactor) / 2;

      setSprings({
        x: left,
        y: top,
        scale: scaleFactor,
        zIndex: 10,
      });
    }
  }, [currPos, setSprings]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrPos((prev) => (prev + 1) % img.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const List = ({ startingIndex }) => (
    <div className="container3">
      {img.slice(startingIndex, startingIndex + 2).map((item, index) => (
        <div
          key={index}
          className="item"
          ref={(el) => (carouselRefs.current[index] = el)}
        >
          <div className="image-box">
            <animated.img
              src={item.url}
              alt={item.description}
              style={{
                width: scale.to((s) => s * 90),
                height: scale.to((s) => s * 90),
                objectFit: "contain",
                zIndex: currPos === index ? zIndex : 1,
                transform:
                  currPos === index
                    ? x.to(
                        (x) => `translate(${x}px, ${y}px) scale(${scale.get()})`
                      )
                    : "none",
              }}
            />
          </div>
          <div className="text-box">
            <p>{item.description}</p>
          </div>
        </div>
      ))}
    </div>
  );

  const Model = ({ img }) => (
    <animated.div
      ref={modelRef}
      style={{
        position: "absolute",
        transform: scale.to((s) => `scale(${s})`),
        zIndex: 1,
        transition: "transform 0.8s ease-in-out",
      }}
    >
      <img src={img} alt="Model" style={{ width: "60%", height: "auto" }} />
    </animated.div>
  );

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
                    backgroundColor: "#dfe6e9",
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
                      alt={images[0].description}
                      style={{
                        maxWidth: "85%",
                        maxHeight: "120%",
                        objectFit: "cover",
                        marginTop: "50px",
                      }}
                    />
                    {currPos >= 0 && <Model img={img[currPos].url} />}
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
          <List startingIndex={0} />
        </div>
      </div>
    </div>
  );
};

export default HorizontalScroll;
