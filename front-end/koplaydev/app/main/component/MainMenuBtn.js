"use client";

import styles from "./MainMenuBtn.module.scss";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import axios from "axios";
import logoutAxios from "@/app/axios/logoutAxios";
import { useState } from "react";
import YellowBox from "@/app/component/boxes/YellowBox";
import LogoutModalBtn from "./LogoutModalBtn";

// props : left, top, bg, shadow, imgSrc
export default function MainMenuBtn(props) {
  const [logoutModal, setLogoutModal] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <>
      {logoutModal && (
        <motion.div
          className={styles.logoutModal}
          initial={{
            translateY: "5px",
            opacity: 0,
          }}
          animate={{
            translateY: "0px",
            opacity: 1,
          }}
        >
          <YellowBox width="40" height="30">
            <div className={styles.textBox}>
              <span className={styles.text}>로그아웃 하시겠습니까?</span>
              <div className={styles.BtnBox}>
                <LogoutModalBtn
                  width={"25"}
                  height={"50"}
                  bg="#ffb703"
                  shadow="#fb8500"
                  logoutModal={logoutModal}
                  setLogoutModal={setLogoutModal}
                >
                  <span>예</span>
                </LogoutModalBtn>
                <LogoutModalBtn
                  width={"25"}
                  height={"50"}
                  bg="#edede9"
                  shadow="#d6ccc2"
                  logoutModal={logoutModal}
                  setLogoutModal={setLogoutModal}
                >
                  <span>아니요</span>
                </LogoutModalBtn>
              </div>
            </div>
          </YellowBox>
        </motion.div>
      )}
      <motion.div
        style={{ left: props.left, top: props.top }}
        className={styles.MainMenuBtn}
        onClick={async () => {
          if (props.idx > 0 && props.idx <= 1000) {
            dispatch(changeModalIdx(props.idx));
          } else if (props.idx === 1001) {
            router.push("/album");
          } else if (props.idx === 1002) {
            router.push("/mypage");
          } else if (props.idx === 1003) {
            router.push("/avatar");
          } else if (props.idx === 1004) {
            dispatch(changeModalIdx(5));
          } else if (props.idx === -1) {
            // 쿠키에서 특정 값을 가져오는 함수
            setLogoutModal(!logoutModal);
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
        {props.tooltip && ( // 툴팁이 존재하면 툴팁을 표시
          <span className={styles.tooltip}>{props.tooltip}</span>
        )}
      </motion.div>
    </>
  );
}
