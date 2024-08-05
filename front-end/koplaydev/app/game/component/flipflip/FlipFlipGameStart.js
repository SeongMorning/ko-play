"use client";

import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeWrong } from "@/redux/slices/wrongList";
import { motion } from "framer-motion";
import styles from "./FlipFlipGameStart.module.scss";
import CardBack from "./CardBack";
import CardFrontImage from "./CardFrontImage";
import CardFrontText from "./CardFrontText";
import FlipFlipGameJellyBtn from "./FlipFlipGameJellyBtn";
import YellowBox from "@/app/component/boxes/YellowBox";

import elephantImg from "./image/elephant.png";
import catImg from "./image/cat.png";
import bearImg from "./image/bear.png";
import rabbitImg from "./image/rabbit.png";
import snakeImg from "./image/snake.png";
import dolphinImg from "./image/dolphin.png";
import tigerImg from "./image/tiger.png";
import penguinImg from "./image/penguin.png";
import fishImg from "./image/fish.png";
import camelImg from "./image/camel.png";
import chickImg from "./image/chick.png";
import cowImg from "./image/cow.png";
import frogImg from "./image/frog.png";
import koalaImg from "./image/koala.png";
import mouseImg from "./image/mouse.png";
import pufferImg from "./image/puffer-fish.png";
import shellImg from "./image/shell.png";
import snailImg from "./image/snail.png";
import octopusImg from "./image/octopus.png";


export default function FlipFlipGameStart({ Level, Recommend }) {
  const [flippedIndices, setFlippedIndices] = useState([]); // 뒤집힌 카드 인덱스를 저장
  const [cardDeck, setCardDeck] = useState([]); // 카드 덱 (게임 보드)을 저장
  const [matchedCards, setMatchedCards] = useState(new Set()); // 매칭된 카드들을 저장
  const [canFlip, setCanFlip] = useState(false); // 카드 클릭 가능 여부를 저장
  const [showAll, setShowAll] = useState(false); // 모든 카드를 보여줄지 여부를 저장
  const [initialFlip, setInitialFlip] = useState(true); // 게임 시작 시 초기 카드 뒤집기 여부를 저장
  const [timeLeft, setTimeLeft] = useState(10); // 남은 시간을 저장 (초 단위)
  const [cardStates, setCardStates] = useState([]); // 카드의 상태를 저장
  const [totalScore, setTotalScore] = useState(0);
  const [modal, setModal] = useState(null);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [wrong, setWrong] = useState([]);

  const timerRef = useRef(null); // 타이머를 제어하기 위한 ref
  const dispatch = useDispatch();
  const wrongAnswers = useSelector((state) => state.wrong);

  // 게임 레벨에 따라 보드 크기를 결정
  const getBoardSize = () => {
    if (Level === 1 || Level === 2) {
      return 8;
    } else if (Level === 3 || Level === 4) {
      return 12;
    } else {
      return 16;
    }
  };

  const getScore = () => {
    if (Level === Recommend) {
      return 30;
    } else if (Recommend - Level === 1) {
      return 20;
    } else if (Recommend - Level >= 2) {
      return 10;
    } else {
      return 30; // 현재 추천 레벨보다 게임 레벨이 1이상으로 높을 때
    }
  };

  const boardSize = getBoardSize();

  // 특정 범위 내에서 랜덤 숫자를 생성
  function getRandom(max, min) {
    return parseInt(Math.random() * (max - min)) + min;
  }

  // 카드 쌍의 인덱스를 무작위로 생성하여 배열로 반환
  function generateRandomCardIndices(boardSize) {
    let randomNumberArr = [];
    for (let i = 0; i < boardSize / 2; i++) {
      let randomNumber = getRandom(19, 1); // 최대 19개의 이미지와 텍스트 쌍
      if (randomNumberArr.indexOf(randomNumber) === -1) {
        randomNumberArr.push(randomNumber);
      } else {
        i--;
      }
    }
    return randomNumberArr;
  }

  // 컴포넌트가 마운트될 때 카드 덱을 초기화
  useEffect(() => {
    const randomCardIndices = generateRandomCardIndices(boardSize);

    const deck = [
      { idx: 1, text: "곰", text2: "bear", img: bearImg },
      { idx: 2, text: "돌고래", text2: "dolphin", img: dolphinImg },
      { idx: 3, text: "코끼리", text2: "elephant", img: elephantImg },
      { idx: 4, text: "물고기", text2: "fish", img: fishImg },
      { idx: 5, text: "고양이", text2: "cat", img: catImg },
      { idx: 6, text: "펭귄", text2: "penguin", img: penguinImg },
      { idx: 7, text: "토끼", text2: "rabbit", img: rabbitImg },
      { idx: 8, text: "뱀", text2: "snake", img: snakeImg },
      { idx: 9, text: "호랑이", text2: "tiger", img: tigerImg },
      { idx: 10, text: "낙타", text2: "camel", img: camelImg },
      { idx: 11, text: "병아리", text2: "chick", img: chickImg },
      { idx: 12, text: "소", text2: "cow", img: cowImg },
      { idx: 13, text: "개구리", text2: "frog", img: frogImg },
      { idx: 14, text: "코알라", text2: "koala", img: koalaImg },
      { idx: 15, text: "복어", text2: "puffer", img: pufferImg },
      { idx: 16, text: "쥐", text2: "mouse", img: mouseImg },
      { idx: 17, text: "소라", text2: "shell", img: shellImg },
      { idx: 18, text: "달팽이", text2: "snail", img: snailImg },
      { idx: 19, text: "문어", text2: "octopus", img: octopusImg },
    ];

    // 카드 쌍을 만들고 섞기
    let pairedCards = randomCardIndices.flatMap((randomIdx) => {
      const card = deck.find((card) => card.idx === randomIdx);
      return [
        { ...card, showImage: true }, // 첫 번째 카드: 이미지
        { ...card, showImage: false }, // 두 번째 카드: 텍스트
      ];
    });

    pairedCards = pairedCards.sort(() => Math.random() - 0.5); // 카드 덱을 섞음

    setCardDeck(pairedCards);

    const initialStates = pairedCards.map(() => ({
      flipped: false,
      isMatch: false,
    })); // 카드 상태 초기화
    setCardStates(initialStates);

    dispatch(changeCorrectIdx(0));
    // dispatch(changeWrong([]));
  }, [boardSize]);


  // 게임 시작 시 초기 카드 뒤집기 및 카드 클릭 가능 상태 설정
  useEffect(() => {
    if (initialFlip) {
      setTimeout(() => {
        setShowAll(true); // 모든 카드를 보여줌
        setTimeout(() => {
          setShowAll(false); // 카드 뒷면을 다시 보여줌
          setInitialFlip(false); // 초기 카드 뒤집기 종료
          setCanFlip(true); // 이제 카드 클릭 가능
        }, 8000); // 8초 동안 카드 앞면을 보여줌
      }, 1000); // 1초 후에 초기 카드 뒤집기 시작
    }
  }, [initialFlip]);

  // 타이머 시작 함수
  const startTimer = () => {
    if (timerRef.current === null) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timerRef.current);
            timerRef.current = null; // 타이머 초기화
            setCanFlip(false); // 시간이 끝나면 카드 클릭 비활성화
            setTotalScore(0); // 시간 초과 시 점수 0으로 설정
            setModal('timeout');
            // let copy2 = [...wordObjectList];
            // copy2
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    }
  };

  // 타이머 멈추기 함수
  const stopTimer = () => {
    if (timerRef.current !== null) {
      clearInterval(timerRef.current);
      timerRef.current = null; // 타이머 초기화
    }

    const matchedCount = matchedCards.size;
    const incorrectCount = (boardSize / 2) - matchedCount;

    setCorrect(matchedCount);
    setIncorrect(incorrectCount);

    setTimeout(() => {
      if (modal === null) {
        setModal('complete');
      }
    }, 2000);
  };

  // 카드 클릭 가능 상태가 변경될 때 타이머를 시작
  useEffect(() => {
    if (canFlip && !initialFlip) {
      startTimer();
    }
  }, [canFlip, initialFlip]);

  // 두 개의 카드가 뒤집혔을 때 매칭을 확인
  useEffect(() => {
    if (flippedIndices.length === 2) {
      setCanFlip(false); // 매칭 확인 중에는 추가 카드 클릭 비활성화

      const [firstIdx, secondIdx] = flippedIndices;
      const firstCard = cardDeck[firstIdx];
      const secondCard = cardDeck[secondIdx];

      if (firstCard.idx === secondCard.idx) {
        setTimeout(() => {
          setCardStates((prev) =>
            prev.map((state, i) =>
              i === firstIdx || i === secondIdx
                ? { ...state, isMatch: true }
                : state
            )
          );
          setMatchedCards((prev) => {
            const newMatchedCards = new Set(prev).add(firstCard.idx);
            const newCorrectCount = newMatchedCards.size;
            const newIncorrectCount = (boardSize / 2) - newCorrectCount;
            setCorrect(newCorrectCount)
            setIncorrect(newIncorrectCount)
            dispatch(changeCorrectIdx(newCorrectCount));
            if (newCorrectCount === boardSize / 2) {
              stopTimer(); // 모든 카드가 매칭되면 타이머 중지
              const score = getScore();
              setTotalScore(score);
              setCanFlip(false); // 카드 클릭 비활성화
              // 틀린 단어들은 
              //dispatch(changeWrong(wrong)); 오답 목록을 Redux 상태로 디스패치
              // dispatch(changeWrong(wrong))
            }
            return newMatchedCards;
          });
          setFlippedIndices([]);
          setCanFlip(true); // 다시 클릭 가능
        }, 500);
      } else {
        setTimeout(() => {
          setFlippedIndices([]); // 뒤집힌 카드 배열 초기화
          setCardStates((prev) =>
            prev.map((state, i) =>
              i === firstIdx || i === secondIdx
                ? { ...state, flipped: false, isMatch: false }
                : state
            ));
          setCanFlip(true); // 다시 카드 클릭 가능
          addToWrongList(firstCard.idx); // 중복 체크 후 wrong 배열에 추가
          addToWrongList(secondCard.idx); // 중복 체크 후 wrong 배열에 추가

        }, 1000);
      }
    }
  }, [flippedIndices, cardDeck, matchedCards, boardSize]);

  // 게임 종료 시 오답 목록을 Redux 상태로 디스패치
  useEffect(() => {
    if (modal === 'complete' || modal === 'timeout') {
      const wrongCards = cardDeck.filter(card => !matchedCards.has(card.idx));
      dispatch(changeWrong(wrongCards)); // 오답 목록을 Redux 상태로 디스패치

      const matchedCount = matchedCards.size;
      const incorrectCount = (boardSize / 2) - matchedCount;

      setCorrect(matchedCount);
      setIncorrect(incorrectCount);
    }
  }, [modal, matchedCards, cardDeck, dispatch]);


  // 중복 체크 함수
  const addToWrongList = (index) => {
    setWrong((prev) => {
      // 기존 wrong 배열에서 이미 존재하는 인덱스가 있는지 확인
      // Set을 사용하여 중복 제거
      const newWrongSet = new Set(prev);
      newWrongSet.add(index);
      return Array.from(newWrongSet);
    });
  };


  // 카드 클릭 처리 함수
  const handleCardClick = (index) => {
    if (canFlip && !flippedIndices.includes(index) && !matchedCards.has(cardDeck[index].idx)) {
      setFlippedIndices((prev) => [...prev, index]);
      setCardStates((prev) =>
        prev.map((state, i) =>
          i === index ? { ...state, flipped: true } : state
        )
      );
    }
  };

  // 카드가 뒤집혔는지 여부를 확인
  const isCardFlipped = (index) =>
    flippedIndices.includes(index) ||
    matchedCards.has(cardDeck[index].idx) ||
    showAll;

  // 타이머를 M:SS 형식으로 변환
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.container}>
      <div className={styles.timerContainer}>
        <img className={styles.alarm} src="/flipflip-game-alarm2.png" />
        <div className={styles.timer}>{formatTime(timeLeft)}</div> {/* 타이머 표시 */}
      </div>
      <div className={styles.cardContainer}>
        {cardDeck.map((card, index) => (
          <div
            key={index}
            className={`
              ${styles.cardDeck}
              ${cardStates[index]?.flipped ? styles.flipped : ''}
              `}
            onClick={() => handleCardClick(index)}
          >
            {isCardFlipped(index) ? (
              card.showImage ? (
                <CardFrontImage
                  className={styles.cardFrontImage}
                  imgSrc={card.img}
                  alt={card.text}
                  isMatch={cardStates[index].isMatch}
                />
              ) : (
                <CardFrontText
                  className={styles.cardFrontText}
                  text={card.text}
                  isMatch={cardStates[index].isMatch}
                />
              )
            ) : (
              <CardBack className={styles.cardBack} />
            )}
          </div>
        ))}
      </div>
      {/* {matchedCards.size === boardSize / 2 && (
        <div className={styles.scoreContainer}>
          <h2>게임 클리어! 총 점수: {totalScore}</h2>
        </div>
      )}
      {matchedCards.size !== boardSize / 2 && timeLeft === 0 && (
        <div className={styles.scoreContainer}>
          <h2>게임 오버! 총 점수: {totalScore}</h2>
        </div>
      )} */}

      <div>
        {/* 모두 맞았을 때 모달 */}
        {modal === 'complete' && (
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
                <span className={styles.incorrect}>오답 개수 : {incorrect}</span>
                <span className={styles.comment}>
                  모든 단어를 맞혔습니다.
                </span>
                <div className={styles.buttons}>
                  <div className={styles.check}>
                    <FlipFlipGameJellyBtn bg="#A2D2FF" shadow="#4DA3F2" text="확인" />
                  </div>
                </div>
              </div>
            </YellowBox>
          </motion.div>
        )}
        {modal === 'timeout' && (
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
                <span className={styles.incorrect}>오답 개수 : {incorrect}</span>
                <span className={styles.retry}>
                  틀린 단어를 다시 학습하시겠습니까?
                </span>
                <span className={styles.addExp}>
                  학습 시 추가 경험치가 있습니다.
                </span>
                <div className={styles.buttons}>
                  <div className={styles.Yes}>
                    <FlipFlipGameJellyBtn bg="#FFD6E0" shadow="#E07A93" text="예" />
                  </div>
                  <div className={styles.No}>
                    <FlipFlipGameJellyBtn bg="#A2D2FF" shadow="#4DA3F2" text="아니요" />
                  </div>
                </div>
              </div>
            </YellowBox>
          </motion.div>
        )}
      </div>
    </div>
  );
}