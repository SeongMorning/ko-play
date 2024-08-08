package com.edu.koplay.websocket;

public class GameStartMessage {
    private String message;

    public GameStartMessage() {
    }

    public GameStartMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
}
