"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import CardFrontImage from "./CardFrontImage";
import styles from "./WordRainStart.module.scss";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import YellowBox from "@/app/component/boxes/YellowBox";
import BlueBox from "@/app/component/boxes/BlueBox";
import PinkBox from "@/app/component/boxes/PinkBox";
import GameJellyBtn from "./GameJellyBtn";
import { changeCorrectIdx } from "@/redux/slices/correct";

export default function WordRainStart() {
  const [wordObjectList, setWordObjectList] = useState([
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이1",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이2",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이3",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이4",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이5",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이6",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이7",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이8",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이9",
    },
    {
      left: Math.random() * 60 + 10,
      imgSrc: "/korea-3.png",
      word: "호랑이10",
    },
  ]);

  const [resultList, setResultList] = useState([1, 0, 0, 1, 0, 0, 0, 1, 0, 0]);
  const [wrong, setWrong] = useState([]);
  const [cnt, setCnt] = useState(0);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);

  useEffect(() => {
    let a = resultList.filter((data) => data === 1).length; // 정답
    let b = resultList.filter((data) => data === -1).length; // 오답
    dispatch(changeCorrectIdx(b)); // a로 바꾸기
    if (a + b === 10) {
      // dispatch(changeLoadingIdx(1));
      setCorrect(a);
      setIncorrect(b);
      setModal(true);
    }
  }, [resultList]);

  const changeResultList = useCallback((index) => {
    setCnt(cnt + 1);
    if (resultList[index] !== 1) {
      let copy2 = [...resultList];
      copy2[index] = -1;
      setResultList(copy2);
      let wrong2 = [...wrong];
      wrong2.push(wordObjectList[index]);
      setWrong(wrong2);
    }
  });

  return (
    <div>
      {modal && (
        <motion.div
          className={styles.modal}
          initial={{
            opacity: 0,
            translateY: 10,
          }}
          animate={{
            opacity: 1,
            translateY: 0,
          }}
        >
          <YellowBox width="40" height="70">
            <div className={styles.text}>
              <span class={styles.finish}>게임종료</span>
              <span class={styles.correct}>정답 개수 : {correct}</span>
              <span class={styles.incorrect}>오답 개수 : {incorrect}</span>
              <span class={styles.retry}>
                틀린 단어를 다시 학습하시겠습니까?
              </span>
              <span class={styles.addExp}>학습 시 추가 경험치가 있습니다.</span>
              <div className={styles.buttons}>
                <div className={styles.Yes}>
                  <GameJellyBtn bg="#FFD6E0" shadow="#E07A93" text="예" />
                </div>
                <div className={styles.No}>
                  <GameJellyBtn bg="#A2D2FF" shadow="#4DA3F2" text="아니요" />
                </div>
              </div>
            </div>
          </YellowBox>
        </motion.div>
      )}
      {wordObjectList.map((data, index) => {
        return (
          <motion.div
            className={styles.CardMain}
            style={{
              left: `${data.left}%`,
              top: "-17%",
              width: "10%",
              height: "17%",
            }}
            animate={{
              translateY: "118vh",
              transition: {
                duration: 1,
                delay: index * 1,
              },
            }}
            onViewportLeave={() => changeResultList(index)}
          >
            <CardFrontImage imgSrc={data.imgSrc} />
          </motion.div>
        );
      })}
    </div>
  );
}
