"use client";

import { motion } from "framer-motion";
import styles from "./ExpBar.module.scss";
import { useState } from "react";

export default function ExpBar() {
  const [progress, setProgress] = useState(50);
  return (
    <>
      <div className={styles.expBarMain}>
        <div className={styles.expBar} />
        <motion.div
        initial={{
            width : 0
        }}
        animate={{
            width : `${progress}%`,
            transition : {
                duration : 2,
                ease : "easeOut"
            }
        }}
          className={styles.expBarFill}
          style={{ width: `${progress}%` }}
        ></motion.div>
        <span>{progress}%</span>
      </div>
    </>
  );
}
