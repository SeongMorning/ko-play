"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./RankGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useEffect } from "react";
import {
  connectWebSocket,
  getStompClient,
} from "@/redux/slices/webSocketSlice";
import { useRouter } from "next/navigation";
import { changeGameWord } from "@/redux/slices/gameWordSlice";

export default function RankGame() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.webSocket.isConnected);
  const router = useRouter();

  useEffect(() => {
    const url = "http://localhost:8080/gs-guide-websocket";
    dispatch(connectWebSocket(url));
  }, [dispatch]);

  useEffect(() => {
    if (isConnected) {
      const client = getStompClient();
      client.connect({}, (frame) => {
        client.subscribe("/topic/game/1", (message) => {
          if (message.body.startsWith("Joined")) {
            router.push("/game/4");
            console.log("Received message: ", message.body);
          } else {
            console.log("Received message: ", JSON.parse(message.body).message.data);
            if(JSON.parse(message.body).message.data){
              dispatch(changeGameWord(JSON.parse(message.body).message.data))
            }
          }
        });
        client.send("/app/join", {}, JSON.stringify("player1"));
      });
    }
  }, [isConnected]);

  return (
    <>
      <YellowBox width="40" height="40">
        <div className={styles.textbox}>
          <span className={styles.text1}>친구를 찾고있어요.</span>
          <span className={styles.text2}>잠시만 기다려주세요.</span>
          <button
            onClick={() => {
              dispatch(changeModalIdx(0));
            }}
          >
            취소
          </button>
        </div>
      </YellowBox>
    </>
  );
}
