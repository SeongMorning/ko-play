"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./LevelJellyBtn.module.scss";
import { motion } from "framer-motion";
import { changeListenLevel, changeReadLevel, changeSpeechLevel } from "@/redux/slices/levelSlice";

export default function LevelJellyBtn(props) {
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.level);
  let gameIdx = useSelector((state) => state.game);
  const graphLevel = useSelector((state)=> state.graphLevel);
  return (
    <motion.div
      onClick={()=>{
        if(gameIdx===1){
          dispatch(changeSpeechLevel(props.level));
        }else if(gameIdx===2){
          dispatch(changeReadLevel(props.level));
        }else if(gameIdx===3){
          dispatch(changeListenLevel(props.level));
        }else{

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
            color: `${(props.level === levelList[gameIdx-1]) || (gameIdx === 0 && props.level === graphLevel) ? props.shadow : props.color}` ,
          }}
        >
          {props.level}
          <RecommendImg gameIdx={gameIdx} level={props.level}/>
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

const RecommendImg = ({gameIdx, level}) => {
  const userInfo = useSelector((state) => state.studentInfo);
  if(gameIdx === 1 && userInfo.speechLevel === level){
    return <img className={styles.recommend} src="/recommend.png"/>
  }else if(gameIdx === 2 && userInfo.readingLevel === level){
    return <img className={styles.recommend} src="/recommend.png"/>
  }else if(gameIdx === 3 && userInfo.listeningLevel === level){
    return <img className={styles.recommend} src="/recommend.png"/>
  }else{
    return null;
  }
}
