"use client";

import styles from "./PwBlueBox.module.scss";
import { motion } from "framer-motion";

export default function PwBlueBox(props) {
  return (
    <div
      className={styles.PwBlueBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      onClick={() => props.setPwFlag(!props.pwFlag)}
    >
      <motion.div
        className={styles.PwBlueBoxTop}
        whileTap={{
          backgroundColor: "#df8ca1",
          translateY: "5px",
          translateX: "-5px",
        }}
      >
        {props.children}
      </motion.div>
      <div className={styles.PwBlueBoxBottom} />
    </div>
  );
}
