"use client";
import { motion } from "framer-motion";
import styles from "./BlueBtn.module.scss";

// props : width, height, top, left, radius, click
export default function BlueBtn(props) {
  return (
    <>
      <motion.div
        className={styles.blueBtn}
        whileHover={{
          scale: 1.1,
        }}
        whileTap={{
          translateY: "1vh",
          transition: {
            duration: 0.1,
          },
        }}
        style={{
          width: props.width,
          height: props.height,
          left: props.left,
          top: props.top,
          borderRadius: props.radius,
        }}
        onClick={props.click}
      >
        {props.text}
      </motion.div>
    </>
  );
}
