"use client";

import styles from "./MainMenuBtn.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import axios from 'axios';
import logoutAxios from "@/app/axios/logoutAxios";

// props : left, top, bg, shadow, imgSrc
export default function MainMenuBtn(props) {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <motion.div
      style={{ left: props.left, top: props.top }}
      className={styles.MainMenuBtn}
      onClick={async () => {
        if (props.idx > 0 && props.idx <= 1000) {
          dispatch(changeModalIdx(props.idx));
        } else if (props.idx === 1001) {
          router.push('/album');
        } else if (props.idx === 1002) {
          router.push('/mypage');
        } else if (props.idx === 1003) {
          router.push('/avatar');
        } else if (props.idx === 10000) {
          router.push('/123');
        } else if (props.idx === -1) {
          // 쿠키에서 특정 값을 가져오는 함수
          function getCookieValue(name) {
            const cookieArray = document.cookie.split(';');
            for (let i = 0; i < cookieArray.length; i++) {
              const cookie = cookieArray[i].trim();
              if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
              }
            }
            return null;
          }
          // 쿠키에서 Authorization 토큰 가져오기
          const authToken = getCookieValue('Authorization');
          if (authToken == null) {
            throw error;
          }

          const response = await logoutAxios();
          if(response != null){
            //null이 아니면 성공
            router.push("/")
          }
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
