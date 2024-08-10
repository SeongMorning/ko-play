// store/websocketSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  connected: false,
  subscriptions: {},
};

const webSocket = createSlice({
  name: 'websocket',
  initialState,
  reducers: {
    setConnected(state, action) {
      state.connected = action.payload;
    },
    setSubscription(state, action) {
      const { destination, subscription } = action.payload;
      state.subscriptions[destination] = subscription;
    },
    clearSubscriptions(state) {
      state.subscriptions = {};
    },
  },
});

export const { setConnected, setSubscription, clearSubscriptions } = webSocket.actions;

export default webSocket;
