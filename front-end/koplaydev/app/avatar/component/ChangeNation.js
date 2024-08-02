"use client";
import { motion } from "framer-motion";
import styles from "./ChangeNation.module.scss";

export default function ChangeNation() {
  return (
    <div className={styles.nationContainer}>
      <motion.img
        src="/korea-3.png"
        whileHover={{
          scale: 1.1,
        }}
      />
      <motion.img
        src="/thailand-parent-choice.png"
        whileHover={{
          scale: 1.1,
        }}
      />
      <motion.img
        src="/china-3.png"
        whileHover={{
          scale: 1.1,
        }}
      />
      <motion.img
        src="/vietnam-3.png"
        whileHover={{
          scale: 1.1,
        }}
      />
    </div>
  );
}
