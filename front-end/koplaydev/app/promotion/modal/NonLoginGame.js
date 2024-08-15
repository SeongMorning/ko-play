"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "../component/GameJellyBtn";
import styles from "./NonLoginGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import LevelJellyBtn from "../component/LevelJellyBtn";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import EasyBtn from "../component/EasyBtn";
import DifficultyBtn from "../component/DifficultyBtn";
import gameListAxios from "@/app/axios/gameListAxios";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import { changeGameIdx } from "@/redux/slices/gameSlice";
import {
  changeListenLevel,
  changeReadLevel,
  changeSpeechLevel,
} from "@/redux/slices/levelSlice";
import effectSound from "@/app/utils/effectSound";
import { changeTranslationWords } from "@/redux/slices/translationWords";
import translations from "@/app/axios/translations";

const buttonSound =
  "https://ko-play.s3.ap-northeast-2.amazonaws.com/audio/effect/buttonSound.mp3";

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
let gameList = [["게임비"], ["뒤집기"], ["스무고개"]];

export default function NormalGame() {
  const translationWords = useSelector((state) => state.translationWords);
  const buttonEs = effectSound(buttonSound, 1);

  useEffect(() => {
    if (translationWords) {
      gameList[0][0] = translationWords.wordRain;
      gameList[1][0] = translationWords.flipflip;
      gameList[2][0] = translationWords.smugogae;
      propObject[0].text = translationWords.speak;
      propObject[1].text = translationWords.read;
      propObject[2].text = translationWords.listen;
    }
  }, [translationWords]);

  const dispatch = useDispatch();
  const gamePurposeIdx = useSelector((state) => state.gamePurpose);
  const ref = useRef(null);

  useEffect(() => {
    const fetchGameList = async () => {
      const data = await gameListAxios();
      if (data) {
        let speechGame = data.filter((value) => value.gamePurposeIdx === 1);
        let readGame = data.filter((value) => value.gamePurposeIdx === 2);
        let listenGame = data.filter((value) => value.gamePurposeIdx === 3);
        // console.log(speechGame)
        // console.log(readGame)
        // console.log(translationWords.wordRain)
        gameList[0][0] = speechGame[0].gameName;
        gameList[1][0] = readGame[0].gameName;
        gameList[2][0] = listenGame[0].gameName;
      }
      dispatch(changeSpeechLevel(1));
      dispatch(changeReadLevel(1));
      dispatch(changeListenLevel(1));
      dispatch(changeTranslationWords(await translations("ko-KR")));
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
                  buttonEs.play();
                  dispatch(changeGamePurposeIdx(0));
                }}
              ></img>
            )}
          </div>
          <span className={styles.NormalGameTitle}>
            {translationWords.normalGame}
          </span>
          <div className={styles.headerright}>
            <img
              src="/close.png"
              onClick={() => {
                buttonEs.play();
                dispatch(changeGamePurposeIdx(0));
                dispatch(changeModalIdx(0));
              }}
            ></img>
          </div>
        </div>
        <GameSelect
          idx={gamePurposeIdx}
          gamestart={translationWords.gamestart}
        />
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
          style={{
            cursor: `${
              props.idx === 0 ? "url('/smile-star-hover.svg') 30 30, auto" : ""
            }`,
          }}
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
                    {data}
                    <motion.div
                      className={styles.gameStart}
                      whileHover={{
                        backgroundColor: "rgba(0, 0, 0, 0.8)",
                        color: "rgba(154, 205, 50, 1)",
                      }}
                      onClick={() => {
                        dispatch(changeGameIdx(props.idx));
                        router.replace(`/promotion/game/${props.idx}`);
                      }}
                    >
                      {props.gamestart}
                    </motion.div>
                  </div>
                ))}
              {index === 0 && (
                <div className={styles.gameInfo}>
                  <span>우주에서 내려오는 그림을 말해요.</span>
                  <span>총 10개의 그림이 내려와요.</span>
                  <span>생각보다 어려울지도.. 화이팅!</span>
                </div>
              )}
              {index === 1 && (
                <div className={styles.gameInfo}>
                  <span>카드를 뒤집어 그림과 단어를 맞춰요.</span>
                  <span>처음에 보여주는 카드를 잘 보세요</span>
                  <span>쉬우면 타임어택으로 즐겨도 좋아요!</span>
                </div>
              )}
              {index === 2 && (
                <div className={styles.gameInfo}>
                  <span>주어지는 설명을 듣고 그림을 골라요.</span>
                  <span>설명는 총 5개이고 다시듣기도 있어요.</span>
                  <span>한번에 맞추면 더 많은 경험치가?</span>
                </div>
              )}
            </motion.div>
          </GameJellyBtn>
        </motion.div>
      ))}
    </div>
  );
};
