"use client";

import { usePathname } from "next/navigation";
import styles from "./Headers.module.scss";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function Headers() {
  const userInfo = useSelector((state) => state.studentInfo);
  const parent = useSelector((state) => state.parent);
  const [selectedNation, setSelectedNation] = useState(null);
  const pathName = usePathname();
  const exceptList = ["game", "tutorial"];

  useEffect(() => {
    const defaultNation = userInfo.nation || parent.nationality || "Korea";
    setSelectedNation(defaultNation);
  }, [userInfo.nation, parent.nationality]);

  const nations = [
    { name: "Korea", src: "/korea-3.png" },
    { name: "Thailand", src: "/thailand-parent-choice.png" },
    { name: "China", src: "/china-3.png" },
    { name: "Vietnam", src: "/vietnam-3.png" },
  ];

  const handleNationClick = (nation) => {
    setSelectedNation(nation.name);
  };

  const shouldHideHeader = exceptList.some((word) => pathName.includes(word));

  return (
    <>
      {!shouldHideHeader && (
        <div className={styles.header}>
          {nations.map((nation, index) => (
            <motion.img
              key={index}
              src={nation.src}
              onClick={() => handleNationClick(nation)}
              whileHover={{
                scale: 1.2,
                transition: { duration: 0.2 },
              }}
              animate={{
                scale: selectedNation === nation.name ? 1.4 : 1,
                transition: {
                  duration: 0.3,
                },
              }}
            />
          ))}
        </div>
      )}
    </>
  );
}
