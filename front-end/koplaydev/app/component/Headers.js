"use client";

import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import { motion } from "framer-motion";

export default function Headers() {
  const pathName = usePathname();
  const exceptList = ["game", "tutorial"];

  const shouldHideHeader = exceptList.some((word) => pathName.includes(word));
  // slice를 setNation 으로 바꾸면 안되겠지...
  // default
  return (
    <>
      {!shouldHideHeader && (
        <div className={styles.header}>
          <motion.img
            className={styles.korea}
            src="/korea-3.png"
            whileHover={{
              scale: 1.1,
            }}
          />
          <motion.img
            className={styles.usa}
            src="/thailand-parent-choice.png"
            whileHover={{
              scale: 1.1,
            }}
          />
          <motion.img
            className={styles.china}
            src="/china-3.png"
            whileHover={{
              scale: 1.1,
            }}
          />
          <motion.img
            className={styles.vietnam}
            src="/vietnam-3.png"
            whileHover={{
              scale: 1.1,
            }}
          />
        </div>
      )}
    </>
  );
}
