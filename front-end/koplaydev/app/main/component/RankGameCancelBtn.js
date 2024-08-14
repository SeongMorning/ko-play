"use client";

import { useDispatch } from "react-redux";
import styles from "./RankGameCancelBtn.module.scss";
import { motion } from "framer-motion";
import { changeModalIdx } from "@/redux/slices/modalSlice";

const buttonSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3';

export default function RankGameCancelBtn(props) {
  
    const dispatch = useDispatch();
    const cancelClick = () => {
      dispatch(changeModalIdx(0));
      const fetchCancelMatch = async () => {
        API.delete("/games/cancel")
          .then((res) => {
            console.log("큐에서삭제완료");
          })
          .catch((e) => {
            console.log(e);
          });
      };
      fetchCancelMatch();
    };
  return (
    <motion.div
      className={styles.RankGameCancelBtn}
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
      onClick={()=>{
        cancelClick();
      }}
    >
      <motion.div
        className={styles.RankGameCancelBtnTop}
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
        className={styles.RankGameCancelBtnBottom}
      />
    </motion.div>
  );
}
