"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "../GameJellyBtn";
import styles from "./NormalGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import LevelJellyBtn from "../LevelJellyBtn";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import EasyBtn from "../EasyBtn";
import DifficultyBtn from "../DifficultyBtn";
import gameListAxios from "@/app/axios/gameListAxios";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import { changeGameIdx } from "@/redux/slices/gameSlice";

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
let gameList = [["게임비"], ["플립플립"], ["스무고개"]];

export default function NormalGame() {
  const dispatch = useDispatch();
  const gamePurposeIdx = useSelector((state) => state.gamePurpose);
  const ref = useRef(null);

  useEffect(() => {
    const fetchGameList = async () => {
      const data = await gameListAxios();
      if (data) {
        console.log(data);
        let speechGame = data.filter((value) => value.gamePurposeIdx === 1);
        let readGame = data.filter((value) => value.gamePurposeIdx === 2);
        let listenGame = data.filter((value) => value.gamePurposeIdx === 3);

        gameList = [[...speechGame], [...readGame], [...listenGame]];
      }
    };
    fetchGameList();
  }, []);

  return (
    <YellowBox width={"70"} height={"80"}>
      <div className={styles.NormalGameMain}>
        <div ref={ref} className={styles.header}>
          <div className={styles.headerleft}>
            {gamePurposeIdx === 0 ? null : (
              <img
                src="/back2.png"
                onClick={() => {
                  dispatch(changeGamePurposeIdx(0));
                }}
              ></img>
            )}
          </div>
          <span className={styles.NormalGameTitle}>일 반 게 임</span>
          <div className={styles.headerright}>
            <img
              src="/close.png"
              onClick={() => {
                dispatch(changeGamePurposeIdx(0));
                dispatch(changeModalIdx(0));
              }}
            ></img>
          </div>
        </div>
        <GameSelect idx={gamePurposeIdx} />
        {gamePurposeIdx === 0 ? null : (
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
            <div className={styles.EasyBtn}>
              <EasyBtn
                bg={propObject[gamePurposeIdx - 1].bg}
                shadow={propObject[gamePurposeIdx - 1].shadow}
                color={propObject[gamePurposeIdx - 1].color}
              />
            </div>
            {levelList.map((data, index) => (
              <div key={index} className={styles.LevelBtn}>
                <LevelJellyBtn
                  level={data}
                  bg={propObject[gamePurposeIdx - 1].bg}
                  shadow={propObject[gamePurposeIdx - 1].shadow}
                  color={propObject[gamePurposeIdx - 1].color}
                />
              </div>
            ))}
            <div className={styles.EasyBtn}>
              <DifficultyBtn
                bg={propObject[gamePurposeIdx - 1].bg}
                shadow={propObject[gamePurposeIdx - 1].shadow}
                color={propObject[gamePurposeIdx - 1].color}
              />
            </div>
          </motion.div>
        )}
      </div>
    </YellowBox>
  );
}

const GameSelect = (props) => {
  let widthList = Array(3).fill(26);
  const dispatch = useDispatch();
  const router = useRouter();

  if (props.idx !== 0) {
    widthList = [...Array(3).fill(0)];
    widthList[props.idx - 1] = 80;
  }
  return (
    <div className={styles.GameJelly}>
      {propObject.map((data, index) => (
        <motion.div
          key={index}
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
                gameList[props.idx - 1].map((data, index) => (
                  <div key={index} className={styles.gameItem}>
                    {data.gameName}
                    <motion.div
                      className={styles.gameStart}
                      whileHover={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "rgba(154, 205, 50, 1)",
                      }}
                      onClick={() => {
                        dispatch(changeGameIdx(data.gameIdx))
                        router.push(`/game/${data.gameIdx}`);
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
