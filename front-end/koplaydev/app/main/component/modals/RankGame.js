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

export default function RankGame() {
  const roomId = useSelector((state) => state.roomId);
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.webSocket.connected);
  const router = useRouter();
  const [flag, setFlag] = useState(true);
  const userInfo = useSelector((state) => state.studentInfo);
  const [client, setClient] = useState(null);

  useEffect(() => {
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
      setClient(await connectWebSocket(url, () => {
        dispatch(setConnected(true));
      }));
    }
    fetchClient();
    // return ()=>{
    //   disconnectWebSocket();
    //   dispatch(setConnected(false));
    // }
  }, []);

  useEffect(() => {
    console.log(isConnected)
    // if (isConnected) {
    //   setClient(getWebSocketClient());
    //   console.log(getWebSocketClient());
    // }
    if (isConnected && client) {
      console.log("매치 연결됨")
      const subscription1 = client.subscribe(
        "/topic/game/match",
        (message1) => {
          let roomId = JSON.parse(message1.body).message;
          if (roomId) {
            dispatch(changeroomId(roomId));
            client.send(
              "/app/join",
              {},
              JSON.stringify({ playerId: userInfo.id, roomId: roomId })
            );
            const subscription2 = client.subscribe(
              `/topic/game/${roomId}`,
              (message2) => {
                if (JSON.parse(message2.body).index === 1) {
                  setTimeout(() => router.push("/game/4"), 2000);
                } else if (JSON.parse(message2.body).index === 2) {
                  dispatch(changeGameWord(JSON.parse(message2.body).data[0]));
                  dispatch(changegameLeft(JSON.parse(message2.body).data[1]));
                }
              }
            );
            dispatch(
              setSubscription({
                destination: `/topic/game/${roomId}`,
                subscription : subscription2,
              })
            );
          }
        }
      );
      dispatch(
        setSubscription({ destination: "/topic/game/match", subscription :subscription1 })
      );
      client.send("/app/match", {}, userInfo.id);

      return () => {
        if (client) {
          client.unsubscribe("/topic/game/match");
          client.unsubscribe(`/topic/game/${roomId}`);
          dispatch(clearSubscriptions());
        }
      };

      // client.connect({}, (frame) => {
      //   client.subscribe("/topic/game/match", (message1) => {

      //     let roomId = JSON.parse(message1.body).message;

      //     if(roomId != null && roomId != undefined && roomId != 0){
      //       client.send("/app/join", {}, JSON.stringify({ playerId: userInfo.id, roomId: roomId }));

      //       client.subscribe(`/topic/game/${roomId}`, (message2) => {
      //         if (message2.body.startsWith("Joined")) {
      //           console.log(message2.body);
      //         } else if (JSON.parse(message2.body).message === "Game started") {
      //           setTimeout(() => router.push("/game/4"), 2000);
      //           // router.push("/game/4");
      //         } else {
      //           console.log(JSON.parse(message2.body).message.data);
      //           dispatch(changeGameWord(JSON.parse(message2.body).message.data[0]));
      //           dispatch(changegameLeft(JSON.parse(message2.body).message.data[1]));
      //         }
      //       })
      //     }

      //   });

      //   client.send("/app/match", {},userInfo.id);

      // });
    }
  }, [isConnected, client]);

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
