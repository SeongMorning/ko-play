"use client";

import { usePathname } from "next/navigation";
import styles from "./Header.module.scss";
import {motion} from "framer-motion";

export default function Headers() {
  const pathName = usePathname();
  return (
    <>
      {pathName.split("/")[1] === "game" ? null : (
        <div className={styles.header}>
          <motion.img 
          className={styles.korea} 
          src="/korea-3.png"
          whileHover={{
            scale : 1.1
          }} />
          <motion.img 
          className={styles.usa} 
          src="/thailand-parent-choice.png"
          whileHover={{
            scale : 1.1
          }} />
          <motion.img 
          className={styles.china} 
          src="/china-3.png"
          whileHover={{
            scale : 1.1
          }} />
          <motion.img 
          className={styles.vietnam} 
          src="/vietnam-3.png"
          whileHover={{
            scale : 1.1
          }} />

        </div>
      )}
    </>
  );
}
