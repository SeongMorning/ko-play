"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ChangeNation.module.scss";

export default function ChangeNation({
  setSelectedCountry,
  left,
  top,
  imgSize,
}) {
  // props를 destructuring합니다.
  const nations = [
    { name: "Korea", src: "/korea-3.png" },
    { name: "Thailand", src: "/thailand-parent-choice.png" },
    { name: "China", src: "/china-3.png" },
    { name: "Vietnam", src: "/vietnam-3.png" },
  ];
  const [selectedNation, setSelectedNation] = useState(null);
  const handleNationClick = (nation) => {
    setSelectedNation(nation.name);
    setSelectedCountry(nation.name);
  };

  return (
    <div className={styles.nationContainer} style={{ left: left, top: top }}>
      {nations.map((nation, index) => (
        <motion.img
          key={index}
          src={nation.src}
          onClick={() => handleNationClick(nation)}
          whileHover={{
            scale: selectedNation === nation.name ? 1.2 : 1.2,
          }}
          animate={{
            scale: selectedNation === nation.name ? 1.2 : 1,
          }}
          style={{ width: imgSize }}
          className={styles.nationImg}
        />
      ))}
    </div>
  );
}
