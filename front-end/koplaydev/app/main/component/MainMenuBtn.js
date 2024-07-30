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
  // 애니메이션이 위아래로 왔다갔다하게.
  const modals = function () {};
  return (
    <motion.div
      style={{ left: props.left, top: props.top }}
      className={styles.FlatRoundBtn}
      onClick={handleClick}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.FlatRoundBtnHover}
        onClick={handleClick}
        whileTap={{
          translateY: "0.3vw",
          transition: {
            duration: 0.1,
          },
        }}
      >
        <div
          style={{ backgroundColor: `${props.bg}` }}
          className={styles.FlatRoundBtnTop}
        />
        <div className={styles.FlatRoundBtnDot1} />
        <div className={styles.FlatRoundBtnDot2} />
        <img src={props.imgSrc} />
      </motion.div>
      <div
        style={{ backgroundColor: `${props.shadow}` }}
        className={styles.FlatRoundBtnBottom}
      />
    </motion.div>
  );
}
