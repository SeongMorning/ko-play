// utils/websocketManager.js

import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

let client = null;

export const connectWebSocket = (url, onConnect) => {
  const sock = new SockJS(url);
  client = Stomp.over(sock);

  client.connect({}, () => {
    if (onConnect) {
      onConnect();
    }
  });

  return client;
};

export const disconnectWebSocket = () => {
  if (client) {
    client.disconnect();
    client = null;
  }
};

export const getWebSocketClient = () => client;
