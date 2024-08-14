package com.edu.koplay.websocket;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayDeque;
import java.util.HashMap;
import java.util.Map;
import java.util.Queue;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.atomic.AtomicLong;
import java.util.stream.Collectors;

@Service
public class GameRoomManager {
    Logger logger = LoggerFactory.getLogger(getClass());
    private final ConcurrentHashMap<Long, GameRoom> rooms = new ConcurrentHashMap<>();  // 방 목록을 관리하는 ConcurrentHashMap
    public static final AtomicLong roomIdCounter = new AtomicLong();  // 방 ID 생성기
//    public static long newRoomId = roomIdCounter.incrementAndGet();;
    // 대기자 명단 대기열
    public static Queue<String> waitingQueue = new ArrayDeque<>();
    //userId, roomId를 키와 벨류로 가지는 map
    public static Map<String, Long> userIdAndRoom = new HashMap<>();
//    public static Long roomId = 1L;
    /**
     * 플레이어를 새로운 방에 추가하거나 기존 방에 참여시킵니다.
     *
     * @param clientId 클라이언트 ID
     * @return 참가한 GameRoom 객체
     */
    public GameRoom createOrJoinRoom(Long roomId, String clientId) {
        logger.info(clientId+" ->"+roomId);
        for (GameRoom room : rooms.values()) {  // 현재 존재하는 모든 방을 탐색
            if(room.getRoomId() == roomId){
                room.addClient(clientId);
                rooms.put(room.getRoomId(), room);
                return room;
            }
        }

        GameRoom newRoom = new GameRoom(roomId);  // 새로운 GameRoom 객체 생성
        newRoom.addClient(clientId);  // 클라이언트를 새로운 방에 추가
        rooms.put(roomId, newRoom);  // 방을 맵에 추가
        return newRoom;  // 생성된 방을 반환
    }

    public void deleteRoom(String clientId) {
        if(userIdAndRoom.containsKey(clientId)) {
            Long roomId = userIdAndRoom.get(clientId);
            //사용자와 방 매핑된거 지워주기
            userIdAndRoom.remove(clientId);
            if(rooms.containsKey(roomId)) {
                rooms.remove(roomId);
            }
        }
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

//    public long getNewRoomId() {
//        return newRoomId;
//    }
    /**
     * 모든 방의 상태를 반환합니다.
     *
     * @return 방 ID와 상태를 포함하는 맵
     */
    public Map<Long, String> getAllRoomsStatus() {
        return rooms.entrySet().stream()
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        entry -> entry.getValue().toString()
                ));
    }
}

