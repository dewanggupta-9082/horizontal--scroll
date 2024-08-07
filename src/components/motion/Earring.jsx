import { motion, useInView } from "framer-motion";
import React from "react";

const Earring = ({ children }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      animate={
        isInView
          ? {
              x: [-40, -550],
              y: [-50, -40],
              scale: [0.8, 0.4],
            }
          : {}
      }
      transition={{
        duration: 2,
        ease: "easeInOut",
        delay: 1,
      }}
      style={{
        overflow: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
};

export default Earring;
