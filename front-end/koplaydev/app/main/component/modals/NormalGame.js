"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "../GameJellyBtn";
import styles from "./NormalGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import LevelJellyBtn from "../LevelJellyBtn";
import { changeGameIdx } from "@/redux/slices/gameSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";

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

let levelList = [1, 2, 3, 4, 5];

export default function NormalGame() {
  const dispatch = useDispatch();
  const gameIdx = useSelector((state) => state.game);
  return (
    <YellowBox width={"70"} height={"80"}>
      <div className={styles.NormalGameMain}>
        <div className={styles.header}>
          {gameIdx === 0 ? null : (
            <button
              onClick={() => {
                dispatch(changeGameIdx(0));
              }}
            >
              임시 뒤로가기
            </button>
          )}
          <span className={styles.NormalGameTitle}>일 반 게 임</span>
          <button
          onClick={()=>{
            dispatch(changeGameIdx(0));
            dispatch(changeModalIdx(0));
          }}>임시 나가기</button>
        </div>
        <GameSelect idx={gameIdx} />
        {gameIdx === 0 ? null : (
          <motion.div
            className={styles.LevelJellyBtn}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              transition: {
                duration: 1,
              },
            }}
          >
            {levelList.map((data, index) => (
              <div className={styles.LevelBtn}>
                <LevelJellyBtn
                  level={data}
                  bg={propObject[gameIdx - 1].bg}
                  shadow={propObject[gameIdx - 1].shadow}
                  color={propObject[gameIdx - 1].color}
                />
              </div>
            ))}
          </motion.div>
        )}
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
            transition: {
              duration: 1,
            },
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
          >
            여기에 게임종류 컴포넌트
          </GameJellyBtn>
        </motion.div>
      ))}
    </div>
  );
};
