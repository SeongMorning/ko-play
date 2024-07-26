"use client";

import styles from "./ZellyButton.module.scss";
import { motion } from "framer-motion";

export default function ZellyButton(props) {
  return (
    <div className={styles.zellyButton}>
      <div className={styles.zellyButtonDot} />
      <div className={styles.zellyButtonDot2} />
      <div
        style={{ background: `${props.shadow}` }}
        className={styles.zellyButtonShadow}
      />
      <div
        style={{ background: `${props.bg}` }}
        className={styles.zellyButtonMain}
      />
      <h1 className={styles.text}>{props.text}</h1>
    </div>
  );
}
