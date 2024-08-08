package com.edu.koplay.websocket;

public class GameState {
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

    public void updateScore(String playerId, int score) {
        if (playerId.equals("player1")) {
            player1Score += score;
        } else if (playerId.equals("player2")) {
            player2Score += score;
        }
        checkWinCondition();
    }

    private void checkWinCondition() {
        if (player1Score >= 10) {
            winner = "player1";
            gameFinished = true;
        } else if (player2Score >= 10) {
            winner = "player2";
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

