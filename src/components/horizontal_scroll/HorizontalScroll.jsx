import React, { useState, useEffect, useRef } from "react";
import { useSpring, animated } from "react-spring";
import "./HorizontalScroll.css";

const img = [
  { url: "/images/earring1.jpg", description: "Test Image 1" },
  { url: "/images/earring2.jpg", description: "Test Image 2" },
  { url: "/images/flower-image.jpg", description: "Test Image 3" },
];

const images = [{ url: "/images/lady.jpg", description: "Test Image " }];

const HorizontalScroll = () => {
  const [currPos, setCurrPos] = useState(0);
  const modelRef = useRef(null);
  const carouselRefs = useRef([]);

  const [animProps, setAnimProps] = useSpring(() => ({
    top: 0,
    left: 0,
    zIndex: 1,
    scale: 1,
    // config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    if (modelRef.current && carouselRefs.current[currPos]) {
      const modelRect = modelRef.current.getBoundingClientRect();
      const targetRect = carouselRefs.current[currPos].getBoundingClientRect();

      const top = targetRect.top - modelRect.top + window.scrollY;
      const left = targetRect.left - modelRect.left + window.scrollX;

      setAnimProps({ top, left, zIndex: 0, scale: 1 }); // Adjust scale of Animation
    }
  }, [currPos, setAnimProps]);

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
                width: animProps.scale.to((s) => s * 90), // Adjust widtth
                height: animProps.scale.to((s) => s * 90), // Adjust height
                objectFit: "cover",
                objectPosition: "center",
                zIndex: currPos === index ? 10 : 1,
                transform: currPos === index ? "translate(-350px, 0)" : "none",
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
        top: animProps.top,
        left: animProps.left,
        zIndex: animProps.zIndex,
        transition: "top 0.8s ease-in-out, left 0.8s ease-in-out",
        transform: animProps.scale.to((s) => `scale(${s})`),
      }}
    >
      <img src={img} alt="Model" style={{ width: "60%", height: "auto" }} />
    </animated.div>
  );

  return (
    <div className="horizontal-scroll">
      <div className="box">
        <div className="left-side">
          <div className="para1">Earrings</div>
          <div className="container">
            <div className="vertical-line">
              <div className="horizontal-line">
                <div className="container5">
                  <div className="imagebox">
                    <img
                      src={images[0].url}
                      alt={images[0].description}
                      style={{
                        maxWidth: "80%",
                        maxHeight: "300px",
                        objectFit: "cover",
                        marginTop: "20px",
                        marginLeft: "160px",
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
