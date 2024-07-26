"use client";

import styles from "./StartButton.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function StartButton(props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login"); // 로그인 페이지로 라우팅
  };
  return (
    <motion.div 
    className={styles.startButton}
    whileHover={{
      scale : 1.1
    }}>
      <motion.div 
      className={styles.startButtonHover} 
      onClick={handleClick}
      whileTap={{
        translateY : "1vh",
        transition : {
          duration : 0.1
        }
      }}
      >
        <div className={styles.startButtonDot} />
        <div className={styles.startButtonDot2} />
        <div style={{background : `${props.bg}`}} className={styles.startButtonMain} />
        <h2 style={{color : `${props.fontColor}`}} className={styles.text}>{`${props.text}으로 시작`}</h2>
      </motion.div>
      <div style={{background : `${props.shadow}`}} className={styles.startButtonShadow}></div>
    </motion.div>
  );
}
