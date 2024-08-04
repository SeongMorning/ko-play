"use client";

import { useDispatch, useSelector } from "react-redux";
import styles from "./Profile.module.scss";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { motion } from "framer-motion";
import ExpBar from "./ExpBar";
import axios from "axios";
import { useEffect } from "react";

export default function Profile() {
  const token = useSelector((state) => state.token);
  console.log(token);
  const userInfo = useSelector((state) => state.studentInfo);
  console.log(userInfo);

  const dispatch = useDispatch();
  return (
    <motion.div
      className={styles.profile}
      whileHover={{
        scale: 1.05,
        background: "rgba(255, 255, 255, 1)",
      }}
      onClick={() => {
        dispatch(changeModalIdx(2));
      }}
    >
      <div className={styles.pictureBox}>
        <img src="hehe.png" />
      </div>
      <div className={styles.profileInfo}>
        <div className={styles.ExpBar}>
          <span>Lv.123</span>
          <ExpBar />
        </div>
        <span className={styles.nickname}>이름가나다라마</span>
        <span className={styles.games}>총 게임수 : 13판</span>
        <span className={styles.avatar}>열린코스튬 120/150</span>
      </div>
    </motion.div>
  );
}
