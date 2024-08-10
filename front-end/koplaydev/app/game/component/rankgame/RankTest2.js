"use client";

import "regenerator-runtime/runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import CardFrontImage from "../CardFrontImage";
import styles from "./RankTest2.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import YellowBox from "@/app/component/boxes/YellowBox";
import GameJellyBtn from "@/app/main/component/GameJellyBtn";
import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeWrong } from "@/redux/slices/wrongList";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client"; // SockJS 임포트
import {
  disconnectWebSocket,
  getWebSocketClient,
} from "@/app/utils/websockectManager";
import { setConnected } from "@/redux/slices/webSocketSlice";

export default function RankTest2() {
  const wordList = useSelector((state) => state.gameWord);
  const [wordObjectList, setWordObjectList] = useState(wordList);
  const wordLeft = useSelector((state) => state.gameLeft);
  let { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [wrong, setWrong] = useState([]);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [timer, setTimer] = useState(null);
  const [viewWord, SetViewWord] = useState([]);
  const WordRainLevel = useSelector((state) => state.level);
  const [client, setClient] = useState(getWebSocketClient());
  const roomId = useSelector((state) => state.roomId);
  const userInfo = useSelector((state) => state.studentInfo);

  useEffect(() => {
    setWordObjectList(wordList);
    console.log(wordList);
    console.log(wordLeft);
  }, [wordList]);

  useEffect(() => {
    setClient(getWebSocketClient());
    // 한국어로 음성 인식 시작
    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });

    // 컴포넌트가 언마운트될 때 WebSocket 연결을 닫습니다.
    return () => {
      if (client) {
        client.unsubscribe("/topic/game/match");
        client.unsubscribe(`/topic/game/${roomId}`);
      }
      disconnectWebSocket();
      setClient(null);
      dispatch(setConnected(false));
      SpeechRecognition.stopListening();
    };
  }, []);

  useEffect(() => {
    if (client) {
      client.subscribe(`/user/topic/game/${roomId}`, (message) => {
        const idx = JSON.parse(message.body).index;
        const cor = JSON.parse(message.body).data[0].correct;
        if (idx === 3) {
          if (cor) {
            let wordObjectCopy = [...wordObjectList];
            wordObjectCopy[idx].state = 1;
            setWordObjectList(wordObjectCopy);
          } else {
            let wordObjectCopy = [...wordObjectList];
            wordObjectCopy[idx].state = -1;
            setWordObjectList(wordObjectCopy);
            let wrong2 = [...wrong];
            wrong2.push(wordObjectList[idx]);
            setWrong(wrong2);
          }
        }
      });
    }
  }, [client]);

  useEffect(() => {
    // 사용자가 말한 단어가 화면에 나타나는 단어와 일치하는지 확인
    let CorrectWord = viewWord.filter((data) => data.wordKor === transcript);
    if (CorrectWord.length === 1) {
      console.log("정답");
      let index = wordObjectList.findIndex(
        (data) => data.wordKor === transcript
      );
      if (client) {
        client.send(
          "/app/correct",
          {},
          JSON.stringify({
            wordIdx: index,
            roomId: roomId,
            playerId: userInfo.id,
          })
        );
      }
      let wordObjectCopy = [...wordObjectList];
      wordObjectCopy[index].state = 1;
      setWordObjectList(wordObjectCopy);

      // 점수 업데이트 메시지를 서버에 전송
      if (client) {
        client.send(
          "/app/game/1",
          {},
          JSON.stringify({
            playerId: "player1", // 실제 플레이어 ID를 넣으세요
            score: 1,
          })
        );
      }
    }

    // 사용자가 음성을 인식했을 때 타이머를 설정하여 특정 시간 후에 인식을 초기화
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

      dispatch(changeCorrectIdx(a)); // a로 바꾸기
      if (a + b === 20) {
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
    console.log("화면에 사라짐");
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
    console.log("화면에 보임");
    let copy3 = wordObjectList.map((wordObject) => ({ ...wordObject }));
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
              initial={{
                display: "none",
              }}
              className={styles.CardMain}
              style={{
                left: `${wordLeft ? wordLeft[index].left : 0}%`,
                top: "-17%",
                width: "10%",
                height: "17%",
                opacity: `${data.state === 1 || data.state === -1 ? 0 : 1}`,
              }}
              animate={{
                display: "block",
                translateY: "118vh",
                transition: {
                  duration: 10,
                  delay: index * 3,
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
