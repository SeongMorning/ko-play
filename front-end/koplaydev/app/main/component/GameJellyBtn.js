"use client";

import { motion, useAnimate } from "framer-motion";
import styles from "./GameJellyBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import effectSound from '@/app/utils/effectSound'


export default function GameJellyBtn(props) {
  const gamePurposeIdx = useSelector((state) => state.gamePurpose);
  const dispatch = useDispatch();

  return (
    <>
      <motion.div
        className={styles.GameJellyBtn}
        style={{
          visibility: `${props.visibility}`,
        }}
        onTap={() => {
          dispatch(changeGamePurposeIdx(props.idx));
        }}
        whileHover={{
          scale: Number(`${gamePurposeIdx === 0 ? "1.1" : "1"}`),
        }}
      >
        <motion.div
          className={styles.GameJellyBtnHover}
          whileTap={{
            translateY: `${gamePurposeIdx === 0 ? "9px" : "0px"}`,
          }}
        >
          <div
            className={styles.GameJellyBtnTop}
            style={{
              background: `${gamePurposeIdx === 0 ? props.bg : "white"}`,
              color: `${props.color}`,
            }}
          >
            {gamePurposeIdx === 0 ? props.text : props.children}
          </div>
          {gamePurposeIdx === 0 && (
            <>
              <div className={styles.GameJellyBtnDot} />
              <div className={styles.GameJellyBtnDot2} />
            </>
          )}
        </motion.div>
        <div
          className={styles.GameJellyBtnBottom}
          style={{ background: `${props.shadow}` }}
        />
      </motion.div>
    </>
  );
}
