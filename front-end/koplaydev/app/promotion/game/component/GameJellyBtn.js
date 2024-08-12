"use client";

import { motion } from "framer-motion";
import styles from "./GameJellyBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function LevelJellyBtn(props) {
  const dispatch = useDispatch();
  const router = useRouter();
  const userInfo = useSelector((state) => state.studentInfo);
  const recommendLevel = userInfo.speechLevel;
  const nowLevel = useSelector((state) => state.level)[0];
  let [unitScore, setUnitScore] = useState(0);

  useEffect(() => {
    if (nowLevel - recommendLevel <= -3) {
      setUnitScore(1);
    } else if (nowLevel - recommendLevel === -2) {
      setUnitScore(2);
    } else if (nowLevel - recommendLevel === -1) {
      setUnitScore(3);
    } else if (nowLevel - recommendLevel === 0) {
      setUnitScore(5);
    } else {
      setUnitScore(6);
    }
  }, [recommendLevel, nowLevel]);

  return (
    <motion.div
      className={styles.LevelJellyBtn}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      whileHover={{
        scale: [1, 1.1, 1],
        transition: {
          duration: 0.3,
        },
      }}
      onClick={() => {
        dispatch(changeGamePurposeIdx(0));
        dispatch(changeLoadingIdx(-1));
        dispatch(changeCorrectIdx(0));
        if (props.text === "예") {
          router.push('/login')
        } else if (props.text === "아니요") {
          router.push('/')
        } else {
          router.push("/");
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
            color: props.color,
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
