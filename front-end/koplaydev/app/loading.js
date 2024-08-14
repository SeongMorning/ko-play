"use client"; // 클라이언트 컴포넌트로 설정

import styles from "./loading.module.scss";
import { motion } from "framer-motion";
export default function Loading() {

  const text = Array.from("... 로딩중 ...");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <>
      <div className={styles.loading}>
      <motion.img
        animate={{
          translateY: [0, 5, 3, 1, 0],
          transition: {
            repeat: Infinity,
            duration: 4,
          },
        }}
        className={styles.cloud}
        src="/cloud.png"
      />
      <img
          src="/starship2.png" // Update this URL to your mascot's public URL
          alt="Mascot"
          className={styles.mascot}
        />
        <div className={styles.text}>
          {text.map((letter, index) => (
            <span key={index} className={styles.letter}>
              {letter}
            </span>
          ))}
        </div>
      </div>
      <div>로딩페이지2</div>
    </>
  );
}
