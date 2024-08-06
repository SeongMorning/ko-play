"use client";

import modifyStudentInfoAxios from "@/app/axios/modifyStudentInfoAxios";
import styles from "./PwPinkBox.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";

export default function PwPinkBox(props) {
    const userInfo = useSelector((state) => state.studentInfo);
    const changePw = async ()=> {
        await modifyStudentInfoAxios({...userInfo, pw : props.afterPw})
    }
    const dispatch = useDispatch();

  return (
    <motion.div
      className={styles.PwPinkBox}
      style={{
        width: `${props.width}%`,
        height: `${props.height}%`,
      }}
      initial={{
        opacity : 0
      }}
      animate={{
        opacity : 1,
        transition : {
            duration : 1
        }
      }}
      onClick={() => {
        if(props.bg==="#A1D2FF"){ // 변경
            props.setIsPwChange(!props.isPwChange);
            changePw();
        }else if(props.bg==="#FDD127"){ // 뒤로가기
            props.setPwFlag(!props.pwFlag);
        }else if(props.bg==="#FFD6E0"){ // 재설정하러 가기
            props.setAfterPw("");
            props.setAfterPwOK("");
            props.setPwFlag(!props.pwFlag);
        }else{
          dispatch(changeModalIdx(0));
          props.setPwFlag(!props.pwFlag);
          changePw();
        }
      }}
    >
      <motion.div
        className={styles.PwPinkBoxTop}
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
        className={styles.PwPinkBoxBottom}
      />
    </motion.div>
  );
}
