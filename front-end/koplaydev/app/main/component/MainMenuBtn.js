"use client";

import styles from "./MainMenuBtn.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeNum } from "@/redux/slices/testSlice";

// props : left, top, bg, shadow, imgSrc
export default function MainMenuBtn(props) {
  const dispatch = useDispatch();
  const num = useSelector((state) => state.test);

  return (
    <motion.div
      style={{ left: props.left, top: props.top }}
      className={styles.MainMenuBtn}
      onClick={()=>{
        dispatch(changeNum(props.idx))
      }}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.MainMenuBtnHover}
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
