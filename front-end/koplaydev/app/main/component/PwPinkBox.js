"use client";

import modifyStudentInfoAxios from "@/app/axios/modifyStudentInfoAxios";
import styles from "./PwPinkBox.module.scss";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function PwPinkBox(props) {
    
    const userInfo = useSelector((state) => state.studentInfo);
    const changePw = async ()=> {
        await modifyStudentInfoAxios({...userInfo, pw : props.afterPw})
    }

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
            props.setPwFlag(!props.pwFlag);
            changePw();
        }else if(props.bg==="#FDD127"){ // 뒤로가기
            props.setPwFlag(!props.pwFlag);
        }else{ // 재설정하러 가기
            props.setAfterPw("")
            props.setAfterPwOK("")
            props.setPwFlag(!props.pwFlag);
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
