"use client";

import styles from "./Title.module.scss";
import { motion } from "framer-motion";

export default function Title() {
  let title1 = Array.from("누구나 쉽게 배우는 한글");
  let title2 = Array.from("한글로 연결되는 우리, 문화로 풍부해지는 세상");

  const container = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <div className={styles.promotionTitle}>
      <motion.div
        className={styles.promotionTitle1}
        variants={container}
        initial="hidden"
        animate="visible"
      >
        {title1.map((data, index) => {
          return <motion.span key={index} variants={letterVariants}>{data}</motion.span>;
        })}
      </motion.div>
      <motion.div className={styles.promotionTitle2}>
        {title2.map((data, index) =>
          index < 12 ? (
            <motion.span key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {data}
            </motion.span>
          ) : (
            <motion.span key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2 }}
            >
              {data}
            </motion.span>
          )
        )}
      </motion.div>
    </div>
  );
}
