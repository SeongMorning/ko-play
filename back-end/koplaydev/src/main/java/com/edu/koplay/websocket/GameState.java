package com.edu.koplay.websocket;

import lombok.Data;

@Data
public class GameState {
    private String player1;
    private String player2;
    private int player1Score;
    private int player2Score;
    private String winner;
    private boolean gameFinished;
    private boolean gameStarted;

    public GameState() {
        this.player1Score = 0;
        this.player2Score = 0;
        this.winner = null;
        this.gameFinished = false;
        this.gameStarted = false;
    }
    public void startGame(){
        this.gameStarted = true;
    }
    public boolean isGameStarted(){
        return this.gameStarted;
    }

    public void updateScore(String playerId) {
        if (playerId.equals(this.player1)) {
            player1Score ++;
        } else if (playerId.equals(this.player2)) {
            player2Score ++;
        }
        checkWinCondition();
    }

    private void checkWinCondition() {
        if (player1Score >= 20) {
            winner = this.player1;
            gameFinished = true;
        } else if (player2Score >= 20) {
            winner = this.player2;
            gameFinished = true;
        }
    }

    public boolean isGameFinished() {
        return gameFinished;
    }

    public String getWinner() {
        return winner;
    }
}

