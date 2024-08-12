"use client";

import modifyStudentInfoAxios from "@/app/axios/modifyStudentInfoAxios";
import styles from "./LogoutModalBtn.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useRouter } from "next/navigation";
import logoutAxios from "@/app/axios/logoutAxios";
import { persistor } from '../../../redux/reduxStore';

export default function LogoutModalBtn(props) {
  const userInfo = useSelector((state) => state.studentInfo);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <motion.div
      className={styles.LogoutModalBtn}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        transition: {
          duration: 1,
        },
      }}
      onClick={async () => {
        if (props.bg === "#ffb703") {
          function getCookieValue(name) {
            const cookieArray = document.cookie.split(";");
            for (let i = 0; i < cookieArray.length; i++) {
              const cookie = cookieArray[i].trim();
              if (cookie.startsWith(name + "=")) {
                return cookie.substring(name.length + 1);
              }
            }
            return null;
          }
          // 쿠키에서 Authorization 토큰 가져오기
          const authToken = getCookieValue("Authorization");
          if (authToken == null) {
            throw error;
          }
          dispatch({ type: 'RESET_ALL' });
          persistor.purge();

          const response = await logoutAxios();

          if (response != null) {
            //null이 아니면 성공

            router.push("/");
          }
        } else {
          props.setLogoutModal(!props.logoutModal);
        }
      }}
    >
      <motion.div
        className={styles.LogoutModalBtnTop}
        style={{
          backgroundColor: props.bg,
        }}
        whileTap={{
          backgroundColor: `${props.shadow}`,
          translateY: "5px",
          translateX: "-5px",
        }}
      >
        {props.children}
      </motion.div>
      <div
        style={{
          backgroundColor: props.shadow,
        }}
        className={styles.LogoutModalBtnBottom}
      />
    </motion.div>
  );
}
