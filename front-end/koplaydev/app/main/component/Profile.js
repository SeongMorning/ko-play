'use client'

import { useDispatch } from "react-redux";
import styles from "./Profile.module.scss";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import {motion} from 'framer-motion';

export default function Profile() {
  const dispatch = useDispatch();
  return (
    <motion.div 
    className={styles.profile}
    whileHover={{
      scale : 1.05,
      background : 'rgba(255, 255, 255, 1)'
    }}
    onClick={()=>{
      dispatch(changeModalIdx(2));
    }}>
      <div className={styles.pictureBox}>
        <img src="hehe.png" />
      </div>
      <div className={styles.profileInfo}>
        <img src="/korea-3.png" alt="" />
        <div>
          <span>123123</span>
          <span>456</span>
        </div>
        <span>123123</span>
        <span>123123</span>
      </div>
    </motion.div>
  );
}
