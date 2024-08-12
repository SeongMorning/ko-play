"use client";

import styles from "./StartButton.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { changeGraphLevel } from "@/redux/slices/graphLevel";
import effectSound from "@/app/utils/effectSound";
import Loading from "@/app/loading";

const buttonSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3";

export default function StartButton(props) {
  const translationWords = useSelector((state) => state.translationWords);

  const router = useRouter();
  const dispatch = useDispatch();
  const es = effectSound(buttonSound, 1);

  useEffect(() => {
    dispatch(changeModalIdx(0));
  }, []);

  const handleClick = () => {
    es.play();
    if (props.text == "비회원") {
      dispatch(changeModalIdx(6));
    }else{
      router.replace("/login"); // 로그인 페이지로 라우팅
    }
  };

  return (
    <motion.div
      className={styles.startButton}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.startButtonHover}
        onClick={handleClick}
        whileTap={{
          translateY: "1vh",
          transition: {
            duration: 0.1,
          },
        }}
      >
        <div className={styles.startButtonDot} />
        <div className={styles.startButtonDot2} />
        <div
          style={{ background: `${props.bg}` }}
          className={styles.startButtonMain}
        />
        <h2
          style={{ color: `${props.fontColor}` }}
          className={styles.text}
        >
           {props.text === "회원"
            ? `${translationWords.member}`
            : `${translationWords.nonMember}`}
          </h2>
      </motion.div>
      <div
        style={{ background: `${props.shadow}` }}
        className={styles.startButtonShadow}
      ></div>
    </motion.div>
  );
}
