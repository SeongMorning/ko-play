"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./LevelJellyBtn.module.scss";
import { motion } from "framer-motion";
import { changeGraphLevelIdx } from "@/redux/slices/graphLevelSlice";

export default function LevelJellyBtn(props) {
  const dispatch = useDispatch();
  const graphLevel = useSelector((state) => state.graphLevel);
  return (
    <motion.div
      onClick={()=>{
        dispatch(changeGraphLevelIdx(props.level))
      }}
      className={styles.LevelJellyBtn}
      style={{
        width : `${props.width}%`,
        height : `${props.height}%`
      }}
      whileHover={{
        scale: [1, 1.1, 1],
        transition : {
          duration : 0.5
        }
      }}
    >
      <motion.div
        className={styles.LevelJellyBtnHover}
        whileTap={{
          translateY: "6px",
        }}
      >
        <div
          className={styles.LevelJellyBtnTop}
          style={{
            background: `${props.bg}`,
            color: `${props.level === graphLevel ? props.shadow : props.color}` ,
          }}
        >
          {props.level}
        </div>
        <div className={styles.LevelJellyBtnDot} />
        <div className={styles.LevelJellyBtnDot2} />
      </motion.div>
      <div
        className={styles.LevelJellyBtnBottom}
        style={{ background: `${props.shadow}` }}
      />
    </motion.div>
  );
}
