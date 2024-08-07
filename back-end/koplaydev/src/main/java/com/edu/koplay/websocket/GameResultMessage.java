package com.edu.koplay.websocket;

public class GameResultMessage {
    private String winner;

    public GameResultMessage() {
    }

    public GameResultMessage(String winner) {
        this.winner = winner;
    }

    public String getWinner() {
        return winner;
    }

    public void setWinner(String winner) {
        this.winner = winner;
    }
}
