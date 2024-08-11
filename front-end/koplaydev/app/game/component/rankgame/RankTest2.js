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
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { disconnectWebSocket, getWebSocketClient } from "@/app/utils/websockectManager";
import { setConnected } from "@/redux/slices/webSocketSlice";
import produce from "immer";

export default function RankTest2() {
  const wordList = useSelector((state) => state.gameWord);
  const [wordObjectList, setWordObjectList] = useState(() => wordList.map((word) => ({ ...word })));
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
  }, [wordList]);

  useEffect(() => {
    const websocketClient = getWebSocketClient();
    setClient(websocketClient);

    SpeechRecognition.startListening({ language: "ko-KR", continuous: true });

    return () => {
      if (client) {
        console.log('언마운트됨');
        client.unsubscribe("/topic/game/match");
        client.unsubscribe(`/topic/ingame/${roomId}`);
      }
      disconnectWebSocket();
      setClient(null);
      dispatch(setConnected(false));
      SpeechRecognition.stopListening();
    };
  }, [client, roomId, dispatch]);

  useEffect(() => {
    if (client) {
      const subscription = client.subscribe(`/user/topic/ingame/${roomId}`, (message) => {
        const { index, data } = JSON.parse(message.body);
        const { correct: cor, wordIdx } = data[0];
  
        if (index === 3 || index === 4) {
          setWordObjectList((prevList) => {
            const updatedList = [...prevList].map((wordObject) => ({ ...wordObject }));
            updatedList[wordIdx].state = cor ? 1 : -1;
            
            if (cor) {
              // setCorrect(correct + 1);
              // dispatch(changeCorrectIdx(correct));
            } else {
              setWrong((prev) => [...prev, updatedList[wordIdx]]);
              // setIncorrect(incorrect + 1);
              dispatch(changeWrong(wrong));
            }
  
            return updatedList;
          });
          if (correct + incorrect === 20) {
            console.log('게임종료!');
            setModal(true);
            SpeechRecognition.stopListening();
          }
        }
      });
  
      return () => {
        subscription.unsubscribe();
      };
    }
  }, [client, roomId, dispatch]);

  useEffect(() => {
    if (wordObjectList) {
      let viewWords = wordObjectList.filter((data) => data.state === 10);
      SetViewWord(viewWords);

      const a = wordObjectList.filter((data) => data.state === 1).length;
      const b = wordObjectList.filter((data) => data.state === -1).length;
      dispatch(changeCorrectIdx(a));
      if (a + b === 20) {
        setCorrect(a);
        setIncorrect(b);
        client.send("/app/out", {}, JSON.stringify({playerId: userInfo.id}));
        console.log('게임종료!');
        setModal(true);
        SpeechRecognition.stopListening();
      }
    }
  }, [wordObjectList]);

  useEffect(() => {
    let CorrectWord = viewWord.filter((data) => data.wordKor === transcript);
    if (CorrectWord.length === 1){
      let index = wordObjectList.findIndex((data) => data.wordKor === transcript);
      if(client){
        client.send("/app/correct", {}, JSON.stringify({wordIdx : index, roomId : roomId, playerId : userInfo.id}))
      }
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

  const changeResultList = useCallback((index) => {
    if (wordObjectList[index].state !== 1 && client) {
      client.send(
        "/app/incorrect",
        {},
        JSON.stringify({
          wordIdx: index,
          roomId: roomId,
          playerId: userInfo.id,
        })
      );
    }
  }, [wordObjectList, client, roomId, userInfo.id]);

  const changeResultList2 = useCallback((index) => {
    setWordObjectList((prevList) => {
      const updatedList = [...prevList].map((prev) => ({...prev}));
      updatedList[index].state = 10;
      return updatedList;
    });
  }, []);
  

  return (
    <>
      <span className={styles.InputBox}>{transcript}</span>
      <div>
        {modal && (
          <motion.div
            className={styles.modal}
            initial={{ opacity: 0, translateY: 10 }}
            animate={{ opacity: 1, translateY: 0 }}
          >
            <YellowBox width="40" height="70">
              <div className={styles.text}>
                <span className={styles.finish}>게임종료</span>
                <span className={styles.correct}>정답 개수 : {correct}</span>
                <span className={styles.incorrect}>오답 개수 : {incorrect}</span>
                <span className={styles.retry}>틀린 단어를 다시 학습하시겠습니까?</span>
                <span className={styles.addExp}>학습 시 추가 경험치가 있습니다.</span>
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
        {wordObjectList.map((data, index) => (
          <motion.div
            key={index}
            initial={{ display: "none" }}
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
              transition: { duration: 10, delay: index * 3 },
            }}
            onViewportEnter={() => changeResultList2(index)}
            onViewportLeave={() => changeResultList(index)}
          >
            <CardFrontImage imgSrc={data.imgUrl} />
          </motion.div>
        ))}
      </div>
    </>
  );
}
