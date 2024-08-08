package com.edu.koplay.websocket;

import org.springframework.stereotype.Service;

import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class GameRoomManager {

    private final ConcurrentHashMap<Long, GameRoom> rooms = new ConcurrentHashMap<>();  // 방 목록을 관리하는 ConcurrentHashMap
    private final AtomicLong roomIdCounter = new AtomicLong();  // 방 ID 생성기
    private  long newRoomId;
    /**
     * 플레이어를 새로운 방에 추가하거나 기존 방에 참여시킵니다.
     *
     * @param clientId 클라이언트 ID
     * @return 참가한 GameRoom 객체
     */
    public GameRoom createOrJoinRoom(String clientId) {
        for (GameRoom room : rooms.values()) {  // 현재 존재하는 모든 방을 탐색
            if (!room.isFull()) {  // 방에 자리가 있으면
                room.addClient(clientId);  // 클라이언트를 방에 추가
                return room;  // 방을 반환
            }
        }
        // 모든 방이 가득 찼거나 방이 없는 경우 새로운 방을 생성
        newRoomId = roomIdCounter.incrementAndGet();  // 새로운 방 ID 생성
        GameRoom newRoom = new GameRoom(newRoomId);  // 새로운 GameRoom 객체 생성
        newRoom.addClient(clientId);  // 클라이언트를 새로운 방에 추가
        rooms.put(newRoomId, newRoom);  // 방을 맵에 추가
        return newRoom;  // 생성된 방을 반환
    }

    /**
     * 특정 방 ID로 방을 가져옵니다.
     *
     * @param roomId 방 ID
     * @return GameRoom 객체
     */
    public GameRoom getRoom(Long roomId) {
        return rooms.get(roomId);  // 방 ID로 방을 반환
    }

    public long getNewRoomId() {
        return newRoomId;
    }
}

