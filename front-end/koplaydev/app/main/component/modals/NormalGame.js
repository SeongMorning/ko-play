"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "../GameJellyBtn";
import styles from "./NormalGame.module.scss";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import LevelJellyBtn from "../LevelJellyBtn";

let propObject = [
  {
    bg: "#FFD6E0",
    shadow: "#E07A93",
    text: "말하기",
    color: "#E07A93",
  },
  {
    bg: "#A2D2FF",
    shadow: "#4DA3F2",
    text: "읽기",
    color: "#4DA3F2",
  },
  {
    bg: "#FDD127",
    shadow: "#C89F00",
    text: "듣기",
    color: "#F48400",
  },
];

export default function NormalGame() {
  const gameIdx = useSelector((state) => state.game);
  return (
    <YellowBox width={"70"} height={"80"}>
      <div className={styles.NormalGameMain}>
        <span className={styles.NormalGameTitle}>일 반 게 임</span>
        <GameSelect idx={gameIdx} />
        <div>
          <LevelJellyBtn/>
        </div>
      </div>
    </YellowBox>
  );
}

const GameSelect = (props) => {
  let widthList = Array(3).fill(26);
  if (props.idx !== 0) {
    widthList = [...Array(3).fill(0)];
    widthList[props.idx - 1] = 80;
  }
  return (
    <div className={styles.GameJelly}>
      {propObject.map((data, index) => (
        <motion.div
          className={styles.Btn}
          style={{ cursor: `${props.idx === 0 ? "pointer" : ""}` }}
          animate={{
            width: `${widthList[index]}%`,
            translateX: `${
              props.idx === 1 ? "6%" : props.idx === 3 ? "-6%" : 0
            }`,
            transition : {
              duration : 1
            }
          }}
        >
          <GameJellyBtn
            bg={data.bg}
            shadow={data.shadow}
            text={props.idx === 0 ? data.text : ""}
            color={data.color}
            idx={index + 1}
            visibility={
              props.idx === 0 || props.idx === index + 1 ? "visible" : "hidden"
            }
          >여기에 게임종류 컴포넌트</GameJellyBtn>
        </motion.div>
      ))}
    </div>
  );
};
