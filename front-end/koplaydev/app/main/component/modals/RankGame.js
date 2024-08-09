"use client";

import YellowBox from "@/app/component/boxes/YellowBox";
import styles from "./RankGame.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { changeModalIdx } from "@/redux/slices/modalSlice";
import { useEffect, useState } from "react";
import {
  connectWebSocket,
  getStompClient,
} from "@/redux/slices/webSocketSlice";
import { useRouter } from "next/navigation";
import { changeGameWord } from "@/redux/slices/gameWordSlice";
import axios from "axios";
import API from "@/app/utils/API";
import { changegameLeft } from "@/redux/slices/gameLeftSlice";
import { changeroomId } from "@/redux/slices/roomIdSlice";

export default function RankGame() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.webSocket.isConnected);
  const router = useRouter();
  let [roomId, setRoomId] = useState();
  const [flag, setFlag] = useState(true);
  const userInfo = useSelector((state) => state.studentInfo)

  useEffect(() => {
    const fetchRoomId = async () => {
      API.get("/games/gameRoom")
        .then((res) => {
          console.log(res.data.data + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@")
          console.log("대기열 등록 완료!!! 기다리세요 ~~")
        })
        .catch((e) => {
          console.log(e);
        });
    };
    fetchRoomId();
  }, []);

  useEffect(() => {
    const url = `${process.env.customKey}/gs-guide-websocket`;
    dispatch(connectWebSocket(url));
  }, [dispatch]);

  useEffect(() => {
    if (isConnected) {
      const client = getStompClient();
      client.connect({}, (frame) => {
        console.log("loginId : " + roomId);

        client.subscribe("/topic/game/match", (message1) => {

          let roomId = message1.body.message;
          console.log("첫번째구독" + message1.body.message);

          if(roomId != null && roomId != undefined && roomId != 0){
            client.subscribe(`/topic/game/${roomId}`, (message2) => {
              console.log("consolegameroomID: " + message2.body);
              if (message2.body.startsWith("Joined")) {
                console.log(message2.body);
              } else if (JSON.parse(message2.body).message === "Game started") {
                setTimeout(() => router.push("/game/4"), 2000);
                // router.push("/game/4");
              } else {
                console.log(JSON.parse(message2.body).message.data);
                dispatch(changeGameWord(JSON.parse(message2.body).message.data[0]));
                dispatch(changegameLeft(JSON.parse(message2.body).message.data[1]));
              }
            })
          }

        });
        
        client.send("/app/match", {}, JSON.stringify(userInfo.id));
        client.send("/app/join", {}, JSON.stringify(userInfo.id));

        setFlag(!flag);
      });
    }
  }, [isConnected, roomId]);

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
