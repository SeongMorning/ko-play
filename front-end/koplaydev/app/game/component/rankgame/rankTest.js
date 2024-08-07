'use client';

import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const RankTest = () => {
    const [message, setMessage] = useState('');
    console.log(message)

    useEffect(() => {
        const socket = new SockJS('ws://localhost:8080/gs-guide-websocket');
        const stompClient = Stomp.over(socket);

        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/greetings', (greeting) => {
                setMessage(JSON.parse(greeting.body).content);
            });
        });

        return () => {
            if (stompClient) {
                stompClient.disconnect();
            }
        };
    }, []);

    const sendName = () => {
        stompClient.send('/app/hello', {}, JSON.stringify({ name: 'World' }));
    };

    return (
        <div>
            <button onClick={sendName}>Send Hello</button>
            <div>{message}</div>
        </div>
    );
};

export default RankTest;