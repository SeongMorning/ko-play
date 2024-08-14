"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./RankGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import {
  clearSubscriptions,
  setConnected,
  setSubscription,
} from "@/redux/slices/webSocketSlice";
import { useRouter } from "next/navigation";
import { changeGameWord } from "@/redux/slices/gameWordSlice";
import API from "@/app/utils/API";
import { changegameLeft } from "@/redux/slices/gameLeftSlice";
import { changeroomId } from "@/redux/slices/roomIdSlice";
import {
  connectWebSocket,
  disconnectWebSocket,
  getWebSocketClient,
} from "@/app/utils/websockectManager";
import { changeIsRank } from "@/redux/slices/isRankSlice";
import RankGameCancelBtn from "../RankGameCancelBtn";

export default function RankGame() {
  const translationWords = useSelector((state) => state.translationWords);

  const roomId = useSelector((state) => state.roomId);
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.webSocket.connected);
  const router = useRouter();
  const [flag, setFlag] = useState(true);
  const userInfo = useSelector((state) => state.studentInfo);
  const [client, setClient] = useState(null);
  const [match, setMatch] = useState(false);

  useEffect(() => {
    dispatch(changeIsRank(true));
    const fetchRoomId = async () => {
      API.get("/games/gameRoom")
        .then((res) => {
          setFlag(!flag);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchRoomId();
  }, []);

  useEffect(() => {
    const fetchClient = async () => {
      const url = `${process.env.customKey}/gs-guide-websocket`;
      setClient(
        await connectWebSocket(url, () => {
          dispatch(setConnected(true));
        })
      );
    };
    fetchClient();
  }, []);

  useEffect(() => {
    if (isConnected && client) {
      // 구독을 설정하는 함수
      const handleMatchMessage = (message1) => {
        const { message } = JSON.parse(message1.body);
        console.log("내가입장할방번호:" + message);
        if (message) {
          setRoomId(message); // roomId 상태 업데이트
          clearInterval(matchInterval); // 인터벌 해제
          subscription1.unsubscribe(); // 첫 번째 구독 해제
          dispatch(changeroomId(message));

          // 두 번째 구독 설정
          const handleGameMessage = (message2) => {
            const data = JSON.parse(message2.body);
            if (data.index === 1) {
              setMatch(true);
              setTimeout(() => router.replace("/game/4"), 2000);
            } else if (data.index === 2) {
              dispatch(changeGameWord(data.data[0]));
              dispatch(changegameLeft(data.data[1]));
            }
          };

          const subscription2 = client.subscribe(
            `/topic/game/${message}`,
            handleGameMessage
          );

          // 방에 참여 요청
          client.send(
            "/app/join",
            {},
            JSON.stringify({ playerId: userInfo.id, roomId: message })
          );

          // 컴포넌트 언마운트 시 두 번째 구독 해제
          return () => {
            subscription2.unsubscribe();
          };
        }
      };

      // 첫 번째 구독 설정
      const subscription1 = client.subscribe(
        "/user/topic/game/match",
        handleMatchMessage
      );

      // 인터벌 설정
      const matchInterval = setInterval(() => {
        client.send("/app/match", {}, userInfo.id);
      }, 2000);

      // 컴포넌트 언마운트 시 인터벌 및 첫 번째 구독 해제
      return () => {
        clearInterval(matchInterval);
        subscription1.unsubscribe();
      };
    }
  }, [isConnected, client, userInfo.id, dispatch, router]);

  return (
    <>
      <YellowBox width="40" height="40">
        <div className={styles.textbox}>
          <span className={styles.NormalGameTitle}>
            {translationWords.rankGame}
          </span>

          <span className={styles.text1}>{translationWords.findFriend}</span>
          <span className={styles.text2}>{translationWords.waitGame}</span>
          {match ? null : (
            <div className={styles.btn}>
              <RankGameCancelBtn
                width="30"
                height="100"
                shadow="#df8ca1"
                bg="#FFD6E0"
              >
                {translationWords.cancel}
              </RankGameCancelBtn>
            </div>
          )}
        </div>
      </YellowBox>
    </>
  );
}
