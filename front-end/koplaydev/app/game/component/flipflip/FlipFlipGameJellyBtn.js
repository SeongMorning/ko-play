"use client";

import { motion } from "framer-motion";
import styles from './FlipFlipGameJellyBtn.module.scss';
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeInCorrect } from "@/redux/slices/Incorrect";
import { useEffect, useState } from "react";
import { changeExp } from "@/redux/slices/expSlice";

export default function FlipFlipGameJellyBtn(props) {
    const dispatch = useDispatch()
    const router = useRouter();
    const userInfo = useSelector((state) => state.studentInfo).speechLevel;
    const recommendLevel = userInfo.speechLevel
    const nowLevel = useSelector((state)=> state.level)[0];
    const correctCnt = useSelector((state) => state.correct)
    // let unitScore = 0;
    const [unitScore, setUnitScore] = useState(0);

    useEffect(()=>{
      if(recommendLevel - nowLevel === 0){
        setUnitScore(30);
      }else if(recommendLevel - nowLevel === 1){
        setUnitScore(20);
      }else if(recommendLevel - nowLevel >= 2){
        setUnitScore(10);
      }else{
        setUnitScore(30);
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
        if(props.text === "예"){
          console.log(unitScore)
          // console.log(correctCnt)
          dispatch(changeExp(unitScore))
          dispatch(changeInCorrect(true));
          dispatch(changeLoadingIdx(1));
        }else if(props.text === "아니요"){
          dispatch(changeExp(Math.round((unitScore) / 2)))
          dispatch(changeInCorrect(false));
          dispatch(changeLoadingIdx(1));
        }else{
        dispatch(changeModalIdx(0));
        dispatch(changeLoadingIdx(-1));
        dispatch(changeCorrectIdx(0));
          router.push("/main");
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
