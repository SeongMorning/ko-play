"use client";

import "regenerator-runtime/runtime";
import html2canvas from "html2canvas";
import { useCallback, useEffect, useRef, useState } from "react";
import CardFrontImage from "../CardFrontImage";
import styles from "./RankTest2.module.scss";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import YellowBox from "@/app/component/boxes/YellowBox";

import { changeCorrectIdx } from "@/redux/slices/correct";
import { changeWrong } from "@/redux/slices/wrongList";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import {
  disconnectWebSocket,
  getWebSocketClient,
} from "@/app/utils/websockectManager";
import { setConnected } from "@/redux/slices/webSocketSlice";
import produce from "immer";
import LevelJellyBtn from "@/app/game/component/GameJellyBtn";
import RankGameJellyBtn from "../RankGameJellyBtn";
import OpenVidu from "@/app/utils/openvidu/OpenVidu";
import OpenViduItem from "@/app/utils/openvidu/OpenVidu";
import closeSession from "@/app/utils/openvidu/sessionCheckAndDelete";
import Cam from "@/app/avatar/component/Cam";
import { changeExp } from "@/redux/slices/expSlice";
import { changeInCorrect } from "@/redux/slices/Incorrect";
import { changeLoadingIdx } from "@/redux/slices/loadingSlice";
import { changeGamePurposeIdx } from "@/redux/slices/gamePurposeSlice";
import pictureAxios from "@/app/axios/pictureAxios";
import { changeIsRank } from "@/redux/slices/isRankSlice";

export default function RankTest2() {
  const wordList = useSelector((state) => state.gameWord);
  const [wordObjectList, setWordObjectList] = useState(() =>
    wordList.map((word) => ({ ...word }))
  );
  const wordLeft = useSelector((state) => state.gameLeft);
  let { transcript, listening, resetTranscript } = useSpeechRecognition();
  const [wrong, setWrong] = useState([]);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [modalFlag, setModalFlag] = useState(true);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const [timer, setTimer] = useState(null);
  const [viewWord, SetViewWord] = useState([]);
  const WordRainLevel = useSelector((state) => state.level);
  const [client, setClient] = useState(getWebSocketClient());
  const roomId = useSelector((state) => state.roomId);
  const userInfo = useSelector((state) => state.studentInfo);
  const captureRef = useRef(null);
  const [count, setCount] = useState(10);
  const [capturedImage, setCapturedImage] = useState(null);
  const correctCnt = useSelector((state) => state.correct);
  let [unitScore, setUnitScore] = useState(3);

  useEffect(() => { }, []);

  const handleCaptureClick = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current, {
        backgroundColor: null,
        scale: 2,
      }).then((canvas) => {

        const image = canvas.toDataURL("image/png");

        // 데이터 URL을 Blob이 아닌 File 객체로 변환
        const byteString = atob(image.split(',')[1]);
        const mimeString = image.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);

        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }

        const file = new File([ab], 'image.png', { type: mimeString });

        setCapturedImage(file);
      });
    }
  };

  const handleSaveImage = async () => {
    //axios 호출
    const res = await pictureAxios(capturedImage,'image');
    if (res) {
      console.log(res);
    }
  };

  useEffect(() => {
    if (!modalFlag) {
      let timer;
      if (count !== null && count > 0) {
        timer = setTimeout(() => setCount(count - 1), 1000);
        console.log(count)
      } else if (count === 0) {
        setCount(0);
        handleCaptureClick();
      }

      return () => clearTimeout(timer);
    }
  }, [modalFlag, count]);

  useEffect(() => {
    setWordObjectList(wordList);
  }, [wordList]);

  useEffect(() => {
    const websocketClient = getWebSocketClient();
    setClient(websocketClient);

    return () => {
      if (client) {
        console.log("언마운트됨");
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
      const subscription = client.subscribe(
        `/user/topic/ingame/${roomId}`,
        (message) => {
          const { index, data } = JSON.parse(message.body);
          const { correct: cor, wordIdx } = data[0];

          if (index === 3 || index === 4) {
            setWordObjectList((prevList) => {
              const updatedList = [...prevList].map((wordObject) => ({
                ...wordObject,
              }));
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
              console.log("게임종료!");
              setModal(true);
              client.send("/app/out", {}, JSON.stringify({ playerId: userInfo.id }));
              SpeechRecognition.stopListening();
            }
          }
        }
      );

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
        dispatch(
          changeWrong(wordObjectList.filter((data) => data.state === -1))
        );
        setCorrect(a);
        setIncorrect(b);
        client.send("/app/out", {}, JSON.stringify({ playerId: userInfo.id }));
        console.log("게임종료!");
        setModal(true);
        SpeechRecognition.stopListening();
      }
    }
  }, [wordObjectList]);

  useEffect(() => {
    let CorrectWord = viewWord.filter((data) => data.wordKor === transcript);
    if (CorrectWord.length === 1) {
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
    }
    if (transcript) {
      if (timer) {
        clearTimeout(timer);
      }
      const newTimer = setTimeout(() => {
        resetTranscript();
      }, 500);
      setTimer(newTimer);
    }
  }, [transcript]);

  const changeResultList = useCallback(
    (index) => {
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
    },
    [wordObjectList, client, roomId, userInfo.id]
  );

  const changeResultList2 = useCallback((index) => {
    setWordObjectList((prevList) => {
      const updatedList = [...prevList].map((prev) => ({ ...prev }));
      updatedList[index].state = 10;
      return updatedList;
    });
  }, []);

  const handleCloseSession = async () => {
    console.log("closeSession");
    await closeSession();
  };

  return (
    <>
      <span className={styles.InputBox}>{transcript}</span>
      <div>
        {modal ? (
          <>
            {modalFlag ? (
              <motion.div
                className={styles.modal}
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
              >
                <YellowBox width="40" height="70">
                  <div className={styles.text}>
                    <span className={styles.finish}>게임종료</span>
                    <span className={styles.correct}>
                      정답 개수 : {correct}
                    </span>
                    <span className={styles.incorrect}>
                      오답 개수 : {incorrect}
                    </span>
                    <span className={styles.retry}>
                      기념사진을 촬영해보세요.
                    </span>
                    <span className={styles.addExp}>
                      촬영을 원하면 "예" 버튼을 누르세요.
                    </span>
                    <div className={styles.buttons}>
                      <div className={styles.Yes}>
                        <RankGameJellyBtn
                          setModalFlag={setModalFlag}
                          bg="#FFD6E0"
                          shadow="#E07A93"
                          text="예"
                        />
                      </div>
                      <div className={styles.No}>
                        <RankGameJellyBtn
                          setModalFlag={setModalFlag}
                          bg="#A2D2FF"
                          shadow="#4DA3F2"
                          text="아니요"
                          onClick={handleCloseSession}
                        />
                      </div>
                    </div>
                  </div>
                </YellowBox>
              </motion.div>
            ) : (
              <motion.div
                className={styles.modal}
                initial={{ opacity: 0, translateY: 10 }}
                animate={{ opacity: 1, translateY: 0 }}
              >
                <YellowBox width="40" height="70">
                  {capturedImage ? (
                    <img
                      src={URL.createObjectURL(capturedImage)}
                      alt="Captured"
                      className={styles.capturedImage}
                    />
                  ) : (
                    <Cam ref={captureRef} width="100%" left="0%" top="4%" />
                  )}
                  {count !== 0 ? (
                    <span className={styles.CamText}>
                      {count}초 후에 촬영됩니다.
                    </span>
                  ) : (
                    <>
                      <div className={styles.out}>
                        <span>저장할래?</span>
                        <span
                          onClick={() => {
                            handleSaveImage();
                            dispatch(changeExp(unitScore * correctCnt));
                            dispatch(changeInCorrect(true));
                            dispatch(changeLoadingIdx(1));
                            dispatch(changeGamePurposeIdx(4));
                            handleCloseSession();
                          }}
                        >
                          예
                        </span>
                        <span onClick={() => {
                          dispatch(changeExp(unitScore * correctCnt));
                          dispatch(changeInCorrect(true));
                          dispatch(changeLoadingIdx(1));
                          dispatch(changeGamePurposeIdx(4));
                          handleCloseSession();
                        }}>아니요</span>
                      </div>
                    </>
                  )}
                </YellowBox>
              </motion.div>
            )}
          </>
        ) : null}
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
              transition: { duration: 3, delay: index * 1 },
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
