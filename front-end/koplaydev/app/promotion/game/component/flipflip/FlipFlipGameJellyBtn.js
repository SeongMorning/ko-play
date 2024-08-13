"use client";

import { motion } from "framer-motion";
import styles from './FlipFlipGameJellyBtn.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { changeCorrectIdx } from "@/redux/slices/correct";
import incorrect, { changeInCorrect } from "@/redux/slices/Incorrect";
import { useEffect, useState } from "react";
import { changeExp } from "@/redux/slices/expSlice";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";

export default function FlipFlipGameJellyBtn(props) {
    const dispatch = useDispatch()
    const router = useRouter();

    const userInfo = useSelector((state) => state.studentInfo);
    const recommendLevel = userInfo.readingLevel;

    const nowLevel = useSelector((state)=> state.level)[1];
    const correctCnt = useSelector((state) => state.correct)
    const FlipFlipLevel = useSelector((state) => state.level);

    const getQuestion = () => { 
      if(FlipFlipLevel[1] === 1 || FlipFlipLevel[1] === 2) {
          return 4;
      } else if(FlipFlipLevel[1] === 3 || FlipFlipLevel[1] === 4) {
          return 6;
      } else {
          return 8;
      }}
  
      const question = getQuestion();

    const [unitScore, setUnitScore] = useState(0);

    useEffect(()=>{
      if(recommendLevel - nowLevel === 0){
        setUnitScore(30 / question);
      }else if(recommendLevel - nowLevel === 1){
        setUnitScore(20 / question);
      }else if(recommendLevel - nowLevel >= 2){
        setUnitScore(10 / question);
      }else{
        setUnitScore(30 / question);
      }
    },[recommendLevel, nowLevel])


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
        dispatch(changeGamePurposeIdx(0));
        dispatch(changeLoadingIdx(-1));
        dispatch(changeCorrectIdx(0));
        if(props.text === "예"){
          router.replace('/login')
        }else if(props.text === "아니요" || props.text === "확인"){
          router.replace('/')
        }else{
          router.replace("/n");
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
