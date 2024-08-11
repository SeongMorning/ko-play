"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./LevelJellyBtn.module.scss";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { changeListenLevel, changeReadLevel, changeSpeechLevel } from "@/redux/slices/levelSlice";
import { changeGraphLevel } from "@/redux/slices/graphLevel";

export default function LevelJellyBtn(props) {
  const levelList = useSelector((state) => state.level);
  let gamePurposeIdx = useSelector((state) => state.gamePurpose);
  const graphLevel = useSelector((state)=> state.graphLevel);
  const dispatch = useDispatch();

  return (
    <motion.div
      onClick={()=>{
        if(gamePurposeIdx===1){
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
          dispatch(changeSpeechLevel(1));
        }else if(gamePurposeIdx===2){
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
          dispatch(changeReadLevel(1));
        }else if(gamePurposeIdx===3){
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
          dispatch(changeListenLevel(1));
        }else{
          console.log('레벨변경은 회원가입 후 가능합니다 ~ ');
          dispatch(changeGraphLevel(1));
        }
      }}
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
            color: `${(props.level === levelList[gamePurposeIdx-1]) || (gamePurposeIdx === 0 && props.level === graphLevel) ? props.shadow : props.color}` ,
          }}
        >
          {props.level}
          {/* <RecommendImg gamePurposeIdx={gamePurposeIdx} level={props.level}/> */}
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
