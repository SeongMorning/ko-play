"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./FlipFlipGameCardDeck.module.scss";
import CardBack from "./CardBack";
import CardFrontImage from "./CardFrontImage";
import CardFrontText from "./CardFrontText";
import elephantImg from "./image/elephant.png";
import kittyImg from "./image/kitty.png";
import bearImg from "./image/bear.png";
import rabbitImg from "./image/rabbit.png";
import snakeImg from "./image/snake.png";
import dolphinImg from "./image/dolphin.png";
import tigerImg from "./image/tiger.png";
import penguinImg from "./image/penguin.png";
import fishImg from "./image/fish.png";

export default function FlipFlipGameCardArray({ Level }) {
  const [flippedIndices, setFlippedIndices] = useState([]); // 뒤집힌 카드 인덱스를 저장
  const [cardDeck, setCardDeck] = useState([]); // 카드 덱 (게임 보드)을 저장
  const [matchedCards, setMatchedCards] = useState(new Set()); // 매칭된 카드들을 저장
  const [canFlip, setCanFlip] = useState(false); // 카드 클릭 가능 여부를 저장
  const [showAll, setShowAll] = useState(false); // 모든 카드를 보여줄지 여부를 저장
  const [initialFlip, setInitialFlip] = useState(true); // 게임 시작 시 초기 카드 뒤집기 여부를 저장
  const [timeLeft, setTimeLeft] = useState(180); // 남은 시간을 저장 (초 단위)
  const [cardStates, setCardStates] = useState([]); // 카드의 상태를 저장

  const timerRef = useRef(null); // 타이머를 제어하기 위한 ref

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

  const boardSize = getBoardSize();

  // 특정 범위 내에서 랜덤 숫자를 생성
  function getRandom(max, min) {
    return parseInt(Math.random() * (max - min)) + min;
  }

  // 카드 쌍의 인덱스를 무작위로 생성하여 배열로 반환
  function generateRandomCardIndices(boardSize) {
    let randomNumberArr = [];
    for (let i = 0; i < boardSize / 2; i++) {
      let randomNumber = getRandom(9, 0);
      if (randomNumberArr.indexOf(randomNumber) === -1) {
        randomNumberArr.push(randomNumber);
      } else {
        i--;
      }
    }
    let pairedNumbers = [...randomNumberArr, ...randomNumberArr];
    return pairedNumbers.sort(() => Math.random() - 0.5);
  }

  // 컴포넌트가 마운트될 때 카드 덱을 초기화
  useEffect(() => {
    const randomCardIndices = generateRandomCardIndices(boardSize);

    const deck = [
      { idx: 1, text: "곰", img: bearImg },
      { idx: 2, text: "돌고래", img: dolphinImg },
      { idx: 3, text: "코끼리", img: elephantImg },
      { idx: 4, text: "물고기", img: fishImg },
      { idx: 5, text: "고양이", img: kittyImg },
      { idx: 6, text: "펭귄", img: penguinImg },
      { idx: 7, text: "토끼", img: rabbitImg },
      { idx: 8, text: "뱀", img: snakeImg },
      { idx: 9, text: "호랑이", img: tigerImg }
    ];

    const shuffledCards = randomCardIndices.map((randomIdx) => {
      const card = deck.find((card) => card.idx === randomIdx);
      const showImage = Math.random() < 0.5; // 카드에 이미지 또는 텍스트를 랜덤으로 할당
      return { ...card, showImage };
    });

    setCardDeck(shuffledCards);
    setCardStates(shuffledCards.map(() => ({ flipped: false }))); // 카드 상태 초기화
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
        setMatchedCards((prev) => new Set(prev).add(firstCard.idx)); // 매칭된 카드 저장
        setCardStates((prev) =>
          prev.map((state, i) =>
            i === firstIdx || i === secondIdx
              ? { ...state, flipped: true }
              : state
          )
        );
        setFlippedIndices([]); // 뒤집힌 카드 배열 초기화
        setCanFlip(true); // 다시 카드 클릭 가능
      } else {
        setTimeout(() => {
          setFlippedIndices([]); // 뒤집힌 카드 배열 초기화
          setCardStates((prev) =>
            prev.map((state, i) =>
              i === firstIdx || i === secondIdx
                ? { ...state, flipped: false }
                : state
            )
          );
          setCanFlip(true); // 다시 카드 클릭 가능
        }, 1000);
      }
    }

    // 모든 카드가 매칭되었는지 확인
    if (matchedCards.size === boardSize / 2) {
      stopTimer(); // 모든 카드가 매칭되면 타이머 중지
      setCanFlip(false); // 카드 클릭 비활성화
    }
  }, [flippedIndices, cardDeck, matchedCards, boardSize]);

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
      <img className={styles.alarm} src="/flipflip-game-alarm.png"/>
      <div className={styles.timer}>{formatTime(timeLeft)}</div> {/* 타이머 표시 */}
      <div className={styles.cardContainer}>
        {cardDeck.map((card, index) => (
          <div
            key={index}
            className={`${styles.cardDeck} ${cardStates[index]?.flipped ? styles.flipped : ''}`}
            onClick={() => handleCardClick(index)}
          >
            {/* <CardBack className={styles.cardBack} /> */}
            {isCardFlipped(index) ? (
              card.showImage ? (
                <CardFrontImage
                  className={styles.cardFrontImage}
                  imgSrc={card.img}
                  alt={card.text}
                />
              ) : (
                <CardFrontText
                  className={styles.cardFrontText}
                  text={card.text}
                />
              )
            ) : (
              <CardBack className={styles.cardBack} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
