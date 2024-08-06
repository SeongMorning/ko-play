"use client";

import "regenerator-runtime/runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import CardFrontImage from "./CardFrontImage";
import styles from "./WordRainStart.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "./GameJellyBtn";
import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeWrong } from "@/redux/slices/wrongList";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function WordRainStart() {
  const wordList = useSelector((state) => state.gameWord);
  const [wordObjectList, setWordObjectList] = useState(wordList);

  useEffect(() => {
    setWordObjectList(wordList);
  }, [wordList]);

  let { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [wrong, setWrong] = useState([]);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [timer, setTimer] = useState(null);
  const [viewWord, SetViewWord] = useState([]);
  const WordRainLevel = useSelector((state) => state.level);

  useEffect(() => {
    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });
  }, []);

  useEffect(() => {
    let CorrectWord = viewWord.filter((data) => data.wordKor === transcript);
    if (CorrectWord.length === 1) {
      let index = wordObjectList.findIndex(
        (data) => data.wordKor === transcript
      );
      let wordObjectCopy = [...wordObjectList];
      wordObjectCopy[index].state = 1;
      setWordObjectList(wordObjectCopy);
    }
    if (transcript) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        resetTranscript();
      }, 1000);
      setTimer(newTimer);
    }
  }, [transcript]);

  useEffect(() => {
    if (wordObjectList) {
      let viewWords = wordObjectList.filter((data) => data.state === 10);
      SetViewWord(viewWords);
      let a = wordObjectList.filter((data) => data.state === 1).length; // 정답
      let b = wordObjectList.filter((data) => data.state === -1).length; // 오답
      console.log(a);
      console.log(b);

      dispatch(changeCorrectIdx(a)); // a로 바꾸기
      if (a + b === 10) {
        setCorrect(a);
        setIncorrect(b);
        dispatch(changeCorrectIdx(a));
        setModal(true);
        dispatch(changeWrong(wrong));
        SpeechRecognition.stopListening();
      }
    }
  }, [wordObjectList]);

  // 시간초과시 실행되는 함수
  const changeResultList = useCallback((index) => {
    if (wordObjectList[index].state !== 1) {
      let copy2 = [...wordObjectList];
      copy2[index].state = -1;
      setWordObjectList(copy2);
      let wrong2 = [...wrong];
      wrong2.push(wordObjectList[index]);
      setWrong(wrong2);
    }
  });

  // 화면에 보이면 실행되는 함수
  const changeResultList2 = useCallback((index) => {
    let copy3 = wordObjectList.map(wordObject => ({...wordObject}))
    copy3[index].state = 10;
    setWordObjectList(copy3);
  });

  return (
    <>
      <span className={styles.InputBox}>{transcript}</span>
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
                <span className={styles.finish}>게임종료</span>
                <span className={styles.correct}>정답 개수 : {correct}</span>
                <span className={styles.incorrect}>
                  오답 개수 : {incorrect}
                </span>
                <span className={styles.retry}>
                  틀린 단어를 다시 학습하시겠습니까?
                </span>
                <span className={styles.addExp}>
                  학습 시 추가 경험치가 있습니다.
                </span>
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
              key={index}
              className={styles.CardMain}
              style={{
                left: `${data.left}%`,
                top: "-17%",
                width: "10%",
                height: "17%",
                opacity: `${data.state === 1 ? 0 : 1}`,
              }}
              animate={{
                translateY: "118vh",
                transition: {
                  duration: 10,
                  delay: index * [10, 5, 5, 3, 3][WordRainLevel[0] - 1],
                },
              }}
              onViewportEnter={() => changeResultList2(index)}
              onViewportLeave={() => changeResultList(index)}
            >
              <CardFrontImage imgSrc={data.imgUrl} />
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
