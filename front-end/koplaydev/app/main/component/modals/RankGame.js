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

export default function RankGame() {
  const translationWords = useSelector((state) => state.translationWords);

  const roomId = useSelector((state) => state.roomId);
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.webSocket.connected);
  const router = useRouter();
  const [flag, setFlag] = useState(true);
  const userInfo = useSelector((state) => state.studentInfo);
  const [client, setClient] = useState(null);

  useEffect(() => {
    dispatch(changeIsRank(true))
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
    // console.log(isConnected)
    // if (isConnected) {
    //   setClient(getWebSocketClient());
    //   console.log(getWebSocketClient());
    // }
    if (isConnected && client) {
      // console.log("매치 연결됨")
      const subscription1 = client.subscribe(
        "/topic/game/match",
        (message1) => {
          // console.log("이거는 대기열에 넣는 작업이었습니다. ")
          let roomId = JSON.parse(message1.body).message;
          if (roomId) {
            dispatch(changeroomId(roomId));
            //방 배정이 완료되었다면?
            // console.log();
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
            client.send(
              "/app/join",
              {},
              JSON.stringify({ playerId: userInfo.id, roomId: roomId })
            );
          }
        }
      );
      client.send("/app/match", {}, userInfo.id);


      return () => {
        client.unsubscribe("/topic/game/match");
        client.unsubscribe(`/topic/game/${roomId}`);
      }

      // return () => {
      //   if (client) {
      //     client.unsubscribe("/topic/game/match");
      //     client.unsubscribe(`/topic/game/${roomId}`);
      //     dispatch(clearSubscriptions());
      //   }
      // };

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
          <span className={styles.NormalGameTitle}>{translationWords.rankGame}</span>

          <span className={styles.text1}>{translationWords.findFriend}</span>
          <span className={styles.text2}>{translationWords.waitGame}</span>
          <button
            onClick={() => {
              dispatch(changeModalIdx(0));
            }}
          >
            {translationWords.cancel}
          </button>
        </div>
      </YellowBox>
    </>
  );
}
