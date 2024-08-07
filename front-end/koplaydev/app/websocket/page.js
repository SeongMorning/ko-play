'use client';

import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

const RankTest = () => {
    const [message, setMessage] = useState('');
    const stompClientRef = useRef(null);
    const connectedRef = useRef(false); // 연결 상태를 추적하는 ref
    useEffect(()=>{
        console.log(message);
        setMessage("12")
    }, [message])
    
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
        const stompClient = Stomp.over(socket);
        stompClientRef.current = stompClient;
        stompClient.connect({}, (frame) => {
            console.log('Connected: ' + frame);
            connectedRef.current = true; // 연결 상태를 true로 설정
            stompClient.subscribe('/topic/greetings', (greeting) => {
                setMessage(JSON.parse(greeting.body).content);
            });
        });

        return () => {
            if (stompClientRef.current) {
                stompClientRef.current.disconnect();
                connectedRef.current = false; // 연결 상태를 false로 설정
            }
        };
    }, []);

    const sendName = () => {
        if (connectedRef.current && stompClientRef.current) {
            stompClientRef.current.send('/app/hello', {}, JSON.stringify({ name: 'World' }));
        } else {
            console.log('STOMP client is not connected.');
        }
    };

    return (
        <div>
            <button onClick={sendName}>Send Hello</button>
            <div>{message}</div>
        </div>
    );
};

export default RankTest;
