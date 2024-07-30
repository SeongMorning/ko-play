"use client";

import styles from "./MainMenuBtn.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

// props : left, top, bg, shadow, imgSrc
export default function MainMenuBtn(props) {
  const router = useRouter();
  const handleClick = () => {
    router.push(props.url);
  };
  const modals = function () {};
  return (
    <motion.div
      style={{ left: props.left, top: props.top }}
      className={styles.MainMenuBtn}
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.MainMenuBtnHover}
        onClick={handleClick}
        whileTap={{
          translateY: "1vh",
          zIndex: 20,
          transition: {
            duration: 0.1,
          },
        }}
      >
        <div
          style={{ backgroundColor: `${props.bg}` }}
          className={styles.MainMenuBtnTop}
        />
        <div className={styles.MainMenuBtnDot1} />
        <div className={styles.MainMenuBtnDot2} />
        <img src={props.imgSrc} alt="Button Icon" />
      </motion.div>
      <div
        style={{ backgroundColor: `${props.shadow}` }}
        className={styles.MainMenuBtnBottom}
      />
    </motion.div>
  );
}
