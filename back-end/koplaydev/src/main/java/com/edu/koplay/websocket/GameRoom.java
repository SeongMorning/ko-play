package com.edu.koplay.websocket;

import java.util.ArrayList;
import java.util.List;

public class GameRoom {
    private final long roomId;
    private final List<String> clients = new ArrayList<>();
    private final int maxClients = 2;
    private GameState gameState;

    public GameRoom(long roomId) {
        this.roomId = roomId;
        this.gameState = new GameState(); // 게임 상태 초기화
    }

    public void addClient(String clientId) {
        if (!isFull()) {
            clients.add(clientId);
        }
    }

    public boolean isFull() {
        return clients.size() == maxClients;
    }

    public GameState getGameState() {
        return gameState;
    }

    public long getRoomId() {
        return roomId;
    }

    public List<String> getClients() {
        return clients;
    }
}
