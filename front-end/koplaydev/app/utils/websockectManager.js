// utils/websocketManager.js

import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

let client = null;

// export const connectWebSocket = (url, onConnect) => {
//   const sock = new SockJS(url);
//   client = Stomp.over(sock);

//   client.connect({}, () => {
//     onConnect();
//   });

//   return client;
// };

export const connectWebSocket = (url, onConnect) => {
  return new Promise((resolve, reject) => {
    const sock = new SockJS(url);
    const client1 = Stomp.over(sock);

    client1.connect({}, () => {
      onConnect();
      client = client1;
      resolve(client1);
    }, (error) => {
      reject(error);
    });
  });
};

export const disconnectWebSocket = () => {
  if (client) {
    client.disconnect();
    client = null;
  }
};

export const getWebSocketClient = () => client;
