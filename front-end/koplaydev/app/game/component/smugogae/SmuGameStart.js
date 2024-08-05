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
import { OpenAiUtill } from "@/app/utils/OpenAiUtill";
import TalkBalloon from "@/app/component/TalkBalloon";
import PlayJellyBtn from "./PlayJellyBtn";
import { changeExp } from "@/redux/slices/expSlice";

const words = [
  [
    {
      imgSrc: "/korea-3.png",
      word: "사과",
      word2: "xiǎogǒu",
    },
    {
      imgSrc: "/korea-3.png",
      word: "바나나",
      word2: "xiǎogǒu",
    },
    {
      imgSrc: "/korea-3.png",
      word: "포도",
      word2: "xiǎogǒu",
    },
  ],
  [
    {
      imgSrc: "/korea-3.png",
      word: "오렌지",
      word2: "con hổ",
    },
    {
      imgSrc: "/korea-3.png",
      word: "딸기",
      word2: "con hổ",
    },
    {
      imgSrc: "/korea-3.png",
      word: "키위",
      word2: "con hổ",
    },
  ],
  [
    {
      imgSrc: "/korea-3.png",
      word: "배",
      word2: "เสือ",
    },
    {
      imgSrc: "/korea-3.png",
      word: "수박",
      word2: "เสือ",
    },
    {
      imgSrc: "/korea-3.png",
      word: "복숭아",
      word2: "เสือ",
    },
  ],
];
function convertTo3x3Grid(data) {
  const grid = [];
  for (let i = 0; i < 3; i++) {
    grid.push(data.slice(i * 3, i * 3 + 3));
  }
  return grid;
}
const data = [
  {
    imgUrl: "",
    wordChina: "苹果",
    wordKor: "사과",
    wordThailand: "แอปเปิ้ล",
    wordVietnam: "táo",
  },
  {
    imgUrl: "",
    wordChina: "香蕉",
    wordKor: "바나나",
    wordThailand: "กล้วย",
    wordVietnam: "chuối",
  },
  {
    imgUrl: "",
    wordChina: "葡萄",
    wordKor: "포도",
    wordThailand: "องุ่น",
    wordVietnam: "nho",
  },
  {
    imgUrl: "",
    wordChina: "橙子",
    wordKor: "오렌지",
    wordThailand: "ส้ม",
    wordVietnam: "cam",
  },
  {
    imgUrl: "",
    wordChina: "草莓",
    wordKor: "딸기",
    wordThailand: "สตรอเบอร์รี่",
    wordVietnam: "dâu",
  },
  {
    imgUrl: "",
    wordChina: "猕猴桃",
    wordKor: "키위",
    wordThailand: "กีวี่",
    wordVietnam: "kiwi",
  },
  {
    imgUrl: "",
    wordChina: "梨",
    wordKor: "배",
    wordThailand: "ลูกแพร์",
    wordVietnam: "lê",
  },
  {
    imgUrl: "",
    wordChina: "西瓜",
    wordKor: "수박",
    wordThailand: "แตงโม",
    wordVietnam: "dưa hấu",
  },
  {
    imgUrl: "",
    wordChina: "桃子",
    wordKor: "복숭아",
    wordThailand: "ลูกท้อ",
    wordVietnam: "đào",
  },
];
export default function SmuGameStart() {
  const wordList = useSelector((state) => state.gameWord);
  const [wordObjectList, setWordObjectList] = useState([]);
  const test = convertTo3x3Grid(data);
  useEffect(() => {
    const wordData = convertTo3x3Grid(wordList);
    setWordObjectList(wordData);
    console.log(wordObjectList);
  }, [wordList]);

  const userInfo = useSelector((state) => state.studentInfo);
  const recommendLevel = userInfo.listeningLevel;
  const levelList = useSelector((state) => state.level);
  const listenLevel = levelList[2];
  let initialSpeechSpeed = 1;
  if (listenLevel === 1) {
    initialSpeechSpeed = 0.7;
  } else if (listenLevel === 2) {
    initialSpeechSpeed = 0.85;
  } else if (listenLevel === 3) {
    initialSpeechSpeed = 1;
  } else if (listenLevel === 4) {
    initialSpeechSpeed = 1.15;
  } else if (listenLevel === 5) {
    initialSpeechSpeed = 1.3;
  }
  let unitScore = 0;
  let totalexp = 0;
  let pointByHints = 0;
  useEffect(() => {
    if (listenLevel - recommendLevel <= -2) {
      unitScore = 5;
      pointByHints = 1;
    } else if (listenLevel - recommendLevel == -1) {
      unitScore = 6;
      pointByHints = 1;
    } else if (listenLevel - recommendLevel == 0) {
      unitScore = 10;
      pointByHints = 2;
    } else {
      unitScore = 15;
      pointByHints = 3;
    }
  });
  const exp = useSelector((state) => state.exp);

  const [speechSpeed, setSpeechSpeed] = useState(initialSpeechSpeed);
  const [currentWords, setCurrentWords] = useState([]);
  const [hints, setHints] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [correctWord, setCorrectWord] = useState(null);
  const [reset, setReset] = useState(false);
  const [playHint, setPlayHint] = useState(false);

  const dispatch = useDispatch();
  const wrongAnswers = useSelector((state) => state.wrong);
  const correctAnswers = useSelector((state) => state.correct);

  const [modal, setModal] = useState(false);

  useEffect(() => {
    startGame();
    console.log(test);
  }, []);

  const startGame = async () => {
    // const chosenWords = words.map(
    const chosenWords = wordObjectList.map(
      (wordSet) => wordSet[Math.floor(Math.random() * wordSet.length)]
    );
    setCurrentWords(chosenWords);

    try {
      const hintsResponse = await Promise.all(
        chosenWords.map((wordObj) => {
          return new Promise((resolve) => {
            let msg = `나는 한국 다문화 가정의 초등학교 저학년 아이와 놀이를 하고 있어. 나는 "${wordObj.word}"에 대해 힌트를 줘야 해. 시작은 매우 광범위한 힌트부터 마지막으로 갈수록 구체적으로 무조건 5개의 힌트를 줘. 정답을 알려주면 안 돼. 응답 방식은 Hint1:... Hint2:... 이런 식으로 줘`;
            resolve(OpenAiUtill.prompt(msg));
          })
            .then((result) => {
              return result.message.content
                .split("\n")
                .map((h) => h.trim().replace(/Hint\d+: /, ""));
            })
            .catch((err) => {
              console.error("Error fetching hints:", err);
              return ["힌트를 가져오는 데 문제가 발생했습니다."];
            });
        })
      );
      setHints(hintsResponse);
    } catch (error) {
      console.error("Error fetching hints:", error);
      setHints(
        chosenWords.map(() => ["힌트를 가져오는 데 문제가 발생했습니다."])
      );
    }

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
    setCorrectWord(currentWords[currentQuestion].word);
    if (guess === currentWords[currentQuestion].word) {
      dispatch(changeCorrectIdx(correctAnswers + 1));
      totalexp += unitScore - currentHintIndex * pointByHints;
      dispatch(changeExp(totalexp));
    } else {
      dispatch(changeWrong([...wrongAnswers, currentWords[currentQuestion]]));
    }
    setTimeout(handleNextQuestion, 2000);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < currentWords.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setCurrentHintIndex(0);
      setCorrectWord(null);
      setReset((prev) => !prev);
      setPlayHint(false);
    } else {
      setGameOver(true);
      setModal(true);
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
              words={wordObjectList[currentQuestion].map(
                (wordObj) => wordObj.word
              )}
              onGuess={handleGuess}
              correctWord={currentWords[currentQuestion]?.word}
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
