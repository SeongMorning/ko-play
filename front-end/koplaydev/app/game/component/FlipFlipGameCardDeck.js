import { Boogaloo } from "next/font/google";
import styles from "./FlipFlipGameCardDeck.scss";
import CardBack from "./CardBack";
import CardFrontImage from "./CardFrontImage";
import CardFrontText from "./smugogae/CardText";

export default function FlipFlipGameCardArray({ Level }) {
  // 만약, 레벨 1, 2를 선택했다면 2*4 표 생성
  // 레벨 3, 4를 선택했다면 3*4 표 생성
  // 레벨 4, 4를 선택했다면 4*4 표 생성
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

  // 난수 생성
  function getRandom(max, min) {
    return parseInt(Math.random() * (max - min)) + min;
  }

  // 가지고 있는 데이터(의 1/2, 100이라면 50)
  // 50개의 단어 중 랜덤으로 boardSize만큼 뽑음
  function generateRandom(boardSize) {
    let randomNumberArr = [];
    for (let i = 0; i < boardSize / 2; i++) {
      let randomNumber = getRandom(50, 0);

      // 중복 검사
      // Arr 안에 생성한 난수 값이 없다면 randomNumberArr에 추가
      // Arr 안에 생성한 난수 값이 있으면 인덱스 1 감소
      if (randomNumberArr.indexOf(randomNumber) === -1) {
        randomNumberArr.push(randomNumber);
      } else {
        i--;
      }
    }
    // 배열 복사 및 병합으로 두 장씩 카드 만들기
    let pairedNumbers = [...randomNumberArr, ...randomNumberArr];

    function shuffle(array) {
      return array.sort(() => Math.random() - 0.5);
    }
    return shuffle(pairedNumbers); // 배열을 섞어 무작위로 배열함
  }

  const randomNumbers = generateRandom(boardSize);
  console.log(randomNumbers);

  return (
    <>
      {randomNumbers.map((num, id) => (
        <div key={id} className={styles.cardDeck}>
          <CardBack className={styles.cardBack} />
          <CardFrontImage className={styles.cardFrontImage} />
          <CardFrontText className={styles.cardFrontText} />
        </div>
      ))}
    </>
  );
}
