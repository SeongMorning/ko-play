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

export default function RankGame() {
  const dispatch = useDispatch();
  const isConnected = useSelector((state) => state.webSocket.isConnected);

  useEffect(() => {
    const url = "http://localhost:8080/gs-guide-websocket";
    dispatch(connectWebSocket(url));
  }, [dispatch]);

  useEffect(() => {
    if (isConnected) {
      const client = getStompClient();
      
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
