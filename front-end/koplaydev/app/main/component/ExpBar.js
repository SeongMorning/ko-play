"use client";

import { motion } from "framer-motion";
import styles from "./ExpBar.module.scss";
import { useSelector } from "react-redux";

export default function ExpBar() {
  const userInfo = useSelector((state)=>state.studentInfo)
  
  return (
    <>
      <div className={styles.expBarMain}>
        <div className={styles.expBar} />
        <motion.div
        initial={{
            width : 0
        }}
        animate={{
            width : `${userInfo.exp%100}%`,
            transition : {
                duration : 2,
                ease : "easeOut"
            }
        }}
          className={styles.expBarFill}
          style={{ width: `${userInfo.exp%100}%` }}
        ></motion.div>
        <span>{userInfo.exp%100}%</span>
      </div>
    </>
  );
}
