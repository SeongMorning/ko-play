"use client";
import { motion } from "framer-motion";
import styles from "./ChangeNation.module.scss";

export default function ChangeNation(props, setSelectedCountry) {
  const nations = [
    { name: "Korea", src: "/korea-3.png" },
    { name: "Thailand", src: "/thailand-parent-choice.png" },
    { name: "China", src: "/china-3.png" },
    { name: "Vietnam", src: "/vietnam-3.png" },
  ];

  return (
    <div
      className={styles.nationContainer}
      style={{ left: props.left, top: props.top }}
    >
      {nations.map((nation, index) => (
        <motion.img
          key={index}
          src={nation.src}
          onClick={() => setSelectedCountry(nation.name)}
          whileHover={{
            scale: 1.1,
          }}
          className={styles.nationImg}
        />
      ))}
    </div>
  );
}
