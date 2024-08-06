"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeWrong } from "@/redux/slices/wrongList";
import { changeCorrectIdx } from "@/redux/slices/correct";
import Hint from "./Hint";
import Options from "./Options";
import { motion } from "framer-motion";
import YellowBox from "@/app/component/boxes/YellowBox";
import SmuGameJellyBtn from "./SmuGameJellyBtn";
import styles from "./SmuGameStart.module.scss";
import TalkBalloon from "@/app/component/TalkBalloon";
import PlayJellyBtn from "./PlayJellyBtn";
import { changeExp } from "@/redux/slices/expSlice";

export default function SmuGameStart() {
  const dispatch = useDispatch();
  const wordList = useSelector((state) => state.gameWord);
  const userInfo = useSelector((state) => state.studentInfo);
  const recommendLevel = userInfo.listeningLevel;
  const levelList = useSelector((state) => state.level);
  const listenLevel = levelList[2];
  const { hints, chosenWords } = useSelector((state) => state.hints);
  const exp = useSelector((state) => state.exp);
  const wrongAnswers = useSelector((state) => state.wrong);
  const correctAnswers = useSelector((state) => state.correct);

  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState(null);
  const [reset, setReset] = useState(false);
  const [playHint, setPlayHint] = useState(false);
  const [modal, setModal] = useState(false);

  const [totalExp, setTotalExp] = useState(0);
  const [unitScore, setUnitScore] = useState(0);
  const [pointByHints, setPointByHints] = useState(0);
  const [speechSpeed, setSpeechSpeed] = useState(1);

  useEffect(() => {
    if (listenLevel === 1) {
      setSpeechSpeed(0.7);
    } else if (listenLevel === 2) {
      setSpeechSpeed(0.85);
    } else if (listenLevel === 3) {
      setSpeechSpeed(1);
    } else if (listenLevel === 4) {
      setSpeechSpeed(1.15);
    } else if (listenLevel === 5) {
      setSpeechSpeed(1.3);
    }
  }, [listenLevel]);

  useEffect(() => {
    if (listenLevel - recommendLevel <= -2) {
      setUnitScore(5);
      setPointByHints(1);
    } else if (listenLevel - recommendLevel == -1) {
      setUnitScore(6);
      setPointByHints(1);
    } else if (listenLevel - recommendLevel == 0) {
      setUnitScore(10);
      setPointByHints(2);
    } else {
      setUnitScore(15);
      setPointByHints(3);
    }
  }, [listenLevel, recommendLevel]);

  useEffect(() => {
    startGame();
  }, [wordList]);

  const startGame = async () => {
    dispatch(changeCorrectIdx(0));
    dispatch(changeWrong([]));
    setCurrentHintIndex(0);
    setCurrentQuestion(0);
    setCorrectWord(null);
    setGameOver(false);
    setReset((prev) => !prev);
    setModal(false);
  };

  const handleNextHint = () => {
    window.speechSynthesis.cancel();
    if (currentHintIndex < hints[currentQuestion].length - 1) {
      setCurrentHintIndex(currentHintIndex + 1);
      setPlayHint(true);
    }
  };

  const handleRepeatHint = () => {
    window.speechSynthesis.cancel();
    setPlayHint(true);
  };

  const handleGuess = (guess) => {
    window.speechSynthesis.cancel();
    setCorrectWord(chosenWords[currentQuestion].wordKor);
    if (guess === chosenWords[currentQuestion].wordKor) {
      dispatch(changeCorrectIdx(correctAnswers + 1));
      const expEarned = unitScore - currentHintIndex * pointByHints;
      setTotalExp((prevTotalExp) => prevTotalExp + expEarned);
    } else {
      dispatch(changeWrong([...wrongAnswers, chosenWords[currentQuestion]]));
    }
    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < chosenWords.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentHintIndex(0);
      setCorrectWord(null);
      setReset((prev) => !prev);
      setPlayHint(false);
    } else {
      setGameOver(true);
      setModal(true);
      dispatch(changeExp(totalExp));
    }
  };

  return (
    <>
      <div className={styles.characterContainer}>
        <img className={styles.myVideo} src="/character-dancingMachine.gif" />
        <div className={styles.videoBack}></div>
      </div>
      {gameOver && modal && (
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
              <span className={styles.correct}>
                정답 개수 : {correctAnswers}
              </span>
              <span className={styles.incorrect}>
                오답 개수 : {wrongAnswers.length}
              </span>
              <span className={styles.retry}>
                틀린 단어를 다시 학습하시겠습니까?
              </span>
              <span className={styles.addExp}>
                학습 시 추가 경험치가 있습니다.
              </span>
              <div className={styles.buttons}>
                <div className={styles.Yes}>
                  <SmuGameJellyBtn bg="#FFD6E0" shadow="#E07A93" text="예" />
                </div>
                <div className={styles.No}>
                  <SmuGameJellyBtn
                    bg="#A2D2FF"
                    shadow="#4DA3F2"
                    text="아니요"
                  />
                </div>
              </div>
            </div>
          </YellowBox>
        </motion.div>
      )}
      <div className={styles.gameContainer}>
        <Hint
          hint={hints[currentQuestion]?.[currentHintIndex]}
          playHint={playHint}
          rate={speechSpeed}
          onEnd={() => setPlayHint(false)}
        />
        {!gameOver && (
          <div style={{ width: "100%" }}>
            <TalkBalloon
              width="15vw"
              left="45vw"
              bottom="25vh"
              text={`문제 남은 힌트 ${
                hints[currentQuestion]?.length - currentHintIndex || 0
              }`}
            />
            <Options
              words={wordList[currentQuestion]}
              onGuess={handleGuess}
              correctWord={chosenWords[currentQuestion].wordKor}
              reset={reset}
            />
            <PlayJellyBtn
              top="-10vh"
              onClick={handleRepeatHint}
              imgSrc="/replay.png"
            />
            <PlayJellyBtn
              left="10vw"
              top="-10vh"
              onClick={handleNextHint}
              disabled={
                currentHintIndex >= (hints[currentQuestion]?.length || 0)
              }
              imgSrc="/nextplay.png"
            />
          </div>
        )}
      </div>
    </>
  );
}
