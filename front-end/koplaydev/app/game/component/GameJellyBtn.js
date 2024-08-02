"use client";

import { motion } from "framer-motion";
import styles from './GameJellyBtn.module.scss';
import { useDispatch } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";

export default function LevelJellyBtn(props) {
    const dispatch = useDispatch()
  return (
    <motion.div
      className={styles.LevelJellyBtn}
      style={{
        width : `${props.width}%`,
        height : `${props.height}%`
      }}
      whileHover={{
        scale: [1, 1.1, 1],
        transition : {
          duration : 0.3
        }
      }}
      onClick={()=>{
        if(props.text === "예"){

        }else{

        }
        dispatch(changeLoadingIdx(1));

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
            color: props.color ,
          }}
        >
          {props.text}
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
