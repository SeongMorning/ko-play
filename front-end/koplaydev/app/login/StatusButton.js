"use client";

import styles from "./StatusButton.module.scss";
import { motion } from "framer-motion";

export default function StatusButton() {
  return (
    <div className={styles.statusButton}>
      <div className={styles.statusButtonShadow} />
      <div className={styles.statusButtonDot} />
      <div className={styles.statusButtonDot2} />
      <div className={styles.statusButtonMain} />
      <h1 className={styles.text}>부모님</h1>
    </div>
  );
}
