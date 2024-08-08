// store/webSocketSlice.js
import { createSlice } from "@reduxjs/toolkit";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let stompClient = null;

const webSocket = createSlice({
  name: "webSocket",
  initialState: {
    isConnected: false,
  },
  reducers: {
    setConnected: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const { setConnected } = webSocket.actions;

export const connectWebSocket = (url) => (dispatch) => {
  const socket = new SockJS(url);
  stompClient = Stomp.over(socket);

  stompClient.debug = (str) => console.log(str);
  stompClient.connect(
    {},
    () => {
      console.log("STOMP connected");
      dispatch(setConnected(true));
      stompClient.subscribe("/topic/game/1", (message) => {
        console.log("Received message: ", message.body);
      });
      stompClient.send("/join",{},JSON.stringify({
        playerId: "player1", // 실제 플레이어 ID를 넣으세요
      }));
    },
    (error) => {
      console.log("STOMP disconnected", error);
      dispatch(setConnected(false));
    }
  );

  return () => {
    if (stompClient) {
      stompClient.disconnect(() => {
        console.log("STOMP disconnected");
        dispatch(setConnected(false));
      });
    }
  };
};

export const getStompClient = () => stompClient;

export default webSocket;
