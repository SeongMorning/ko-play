"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "../GameJellyBtn";
import styles from "./NormalGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import LevelJellyBtn from "../LevelJellyBtn";
import { changeGameIdx } from "@/redux/slices/gameSlice";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useRef } from "react";
import { NodeNextRequest } from "next/dist/server/base-http/node";
import { useRouter } from "next/navigation";

let propObject = [
  {
    bg: "#FFD6E0",
    shadow: "#E07A93",
    text: "말하기",
    color: "white",
  },
  {
    bg: "#A2D2FF",
    shadow: "#4DA3F2",
    text: "읽기",
    color: "white",
  },
  {
    bg: "#FDD127",
    shadow: "#C89F00",
    text: "듣기",
    color: "white",
  },
];

let levelList = [1, 2, 3, 4, 5];
let gameList = [["게임비", "123", "123"], ["뒤집기"], ["듣고맞추기"]];

export default function NormalGame() {
  const dispatch = useDispatch();
  const gameIdx = useSelector((state) => state.game);
  const ref = useRef(null);

  console.log(ref);
  return (
    <YellowBox width={"70"} height={"80"}>
      <div className={styles.NormalGameMain}>
        <div ref={ref} className={styles.header}>
          <div className={styles.headerleft}>
            {gameIdx === 0 ? null : (
              <img
                src="/back2.png"
                onClick={() => {
                  dispatch(changeGameIdx(0));
                }}
              ></img>
            )}
          </div>
          <span className={styles.NormalGameTitle}>일 반 게 임</span>
          <div className={styles.headerright}>
            <img
              src="/close.png"
              onClick={() => {
                dispatch(changeGameIdx(0));
                dispatch(changeModalIdx(0));
              }}
            ></img>
          </div>
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
  const router = useRouter();

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
            <motion.div
              className={styles.gameItems}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  duration: 3,
                },
              }}
            >
              {props.idx !== 0 &&
                gameList[props.idx - 1].map((data) => (
                  <div className={styles.gameItem}>
                    {data}
                    <motion.div
                      className={styles.gameStart}
                      whileHover={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "rgba(154, 205, 50, 1)",
                      }}
                      onClick={()=>{
                        router.push(`/game/${props.idx}`)
                      }}
                    >
                      시작
                    </motion.div>
                  </div>
                ))}
            </motion.div>
          </GameJellyBtn>
        </motion.div>
      ))}
    </div>
  );
};
