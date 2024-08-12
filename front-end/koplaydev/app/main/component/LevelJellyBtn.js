"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./LevelJellyBtn.module.scss";
import { motion } from "framer-motion";
import { changeListenLevel, changeReadLevel, changeSpeechLevel } from "@/redux/slices/levelSlice";
import { changeGraphLevel } from "@/redux/slices/graphLevel";
import effectSound from '@/app/utils/effectSound'

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function LevelJellyBtn(props) {
  const dispatch = useDispatch();
  const levelList = useSelector((state) => state.level);
  let gamePurposeIdx = useSelector((state) => state.gamePurpose);
  const graphLevel = useSelector((state)=> state.graphLevel);
  const es = effectSound(buttonSound, 1);

  return (
    <motion.div
      onClick={()=>{
        es.play();
        
        if(gamePurposeIdx===1){
          dispatch(changeSpeechLevel(props.level));
        }else if(gamePurposeIdx===2){
          dispatch(changeReadLevel(props.level));
        }else if(gamePurposeIdx===3){
          dispatch(changeListenLevel(props.level));
        }else{
          dispatch(changeGraphLevel(props.level));
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
          <RecommendImg gamePurposeIdx={gamePurposeIdx} level={props.level}/>
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

const RecommendImg = ({gamePurposeIdx, level}) => {
  const userInfo = useSelector((state) => state.studentInfo);
  if(gamePurposeIdx === 1 && userInfo.speechLevel === level){
    return <img className={styles.recommend} src="/recommend.png"/>
  }else if(gamePurposeIdx === 2 && userInfo.readingLevel === level){
    return <img className={styles.recommend} src="/recommend.png"/>
  }else if(gamePurposeIdx === 3 && userInfo.listeningLevel === level){
    return <img className={styles.recommend} src="/recommend.png"/>
  }else{
    return null;
  }
}
