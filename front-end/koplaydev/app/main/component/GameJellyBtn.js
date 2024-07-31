"use client";

import { motion, useAnimate } from "framer-motion";
import styles from "./GameJellyBtn.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeGameIdx } from "@/redux/slices/gameSlice";

export default function GameJellyBtn(props) {
  const gameIdx = useSelector((state) => state.game);
  const dispatch = useDispatch();
  return (
    <>
      <motion.div
        className={styles.GameJellyBtn}
        style={{
          visibility: `${props.visibility}`,
        }}
        onTap={() => {
          dispatch(changeGameIdx(props.idx));
        }}
        whileHover={{
          scale: Number(`${gameIdx === 0 ? "1.1" : "1"}`),
        }}
      >
        <motion.div
          className={styles.GameJellyBtnHover}
          whileTap={{
            translateY: `${gameIdx === 0 ? "9px" : "0px"}`,
          }}
        >
          <div
            className={styles.GameJellyBtnTop}
            style={{
              background: `${gameIdx === 0 ? props.bg : "white"}`,
              color: `${props.color}`,
            }}
          >
            {gameIdx === 0 ? props.text : props.children}
          </div>
          {gameIdx === 0 && (
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
