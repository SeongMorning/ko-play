"use client";

import styles from "./StarBg.module.scss";
import { motion } from "framer-motion";

//props : left, top, right, width, duration, rotate, imgSrc
export default function StarBg(props) {
  return (
    <motion.img
      className={styles.star}
      src={props.imgSrc}
      style={{
        left: props.left,
        top: props.top,
        right: props.right,
        width: props.width,
        transform: "rotate(-60deg)",
        transformOrigin: "0 0",
      }}
      animate={{
        scale : [1, 1.1, 0.9, 1],
        transition: {
          repeat: Infinity,
          duration: props.duration,
        },
      }}
    />
  );
}
