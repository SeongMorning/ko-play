"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./ChangeNation.module.scss";
import effectSound from '@/app/utils/effectSound'
import { useSelector } from "react-redux";
import { changeCurrNation } from "@/redux/slices/currNationSlice";

const mouseClickSound = 'https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/mouseClickSound.mp3';

export default function ChangeNation({
  left,
  top,
  imgSize
}) {
  const currNation = useSelector((state) => state.currNation);

  // props를 destructuring합니다.
  const nations = [
    { name: "Korea", src: "/korea-3.png" },
    { name: "Thailand", src: "/thailand-parent-choice.png" },
    { name: "China", src: "/china-3.png" },
    { name: "Vietnam", src: "/vietnam-3.png" },
  ];
  const [selectedNation, setSelectedNation] = useState(currNation);
  const handleNationClick = (nation) => {
    setSelectedNation(nation.name);
  };

  const es = effectSound(mouseClickSound, 0.7);

  return (
    <div className={styles.nationContainer} style={{ left: left, top: top }}>
      {nations.map((nation, index) => (
        <motion.img
          key={index}
          src={nation.src}
          onClick={() => {
            es.play();
            handleNationClick(nation);
          }}
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
