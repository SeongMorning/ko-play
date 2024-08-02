"use client";

import styles from "./MainMenuBtn.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";

// props : left, top, bg, shadow, imgSrc
export default function MainMenuBtn(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <motion.div
      style={{ left: props.left, top: props.top }}
      className={styles.MainMenuBtn}
      onClick={()=>{
        if(props.idx >0 && props.idx <= 1000){
          dispatch(changeModalIdx(props.idx));
        }else if(props.idx === 1001){
          router.push('/album');
        }else if(props.idx === 1002){
          router.push('/mypage');
        }else if(props.idx === 1003){
          router.push('/avatar');
        }else if(props.idx === 10000){
          router.push('/123');
        }else if(props.idx === -1){
          router.push('/');
        }
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
