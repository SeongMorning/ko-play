'use client'

import styles from './LevelJellyBtn.module.scss';
import {motion} from 'framer-motion';

export default function LevelJellyBtn(props) {
  return (
    <motion.div
      className={styles.LevelJellyBtn}
      whileHover={{
        scale: 1.1,
      }}
    >
      <motion.div
        className={styles.LevelJellyBtnHover}
        whileTap={{
          translateY: "1vh",
        }}
      >
        <div
          className={styles.LevelJellyBtnTop}
          style={{ background: `${props.bg}`, color: `${props.color}` }}
        >
          {props.level}
        </div>
        <div className={styles.LevelJellyBtnDot} />
        <div className={styles.LevelJellyBtnDot2} />
      </motion.div>
      <div
        className={styles.LevelJellyBtnBottom}
        style={{ background: `${props.shadow}` }}
      />
    </motion.div>
  );
}
