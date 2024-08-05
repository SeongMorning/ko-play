package com.edu.koplay.batch;

import java.util.ArrayList;
import java.util.List;
public class Top3Players {
    private Long studentIdx;
    private Long gameCount;

    // Static list to hold the top 3 players
    private static List<Top3Players> topPlayers = new ArrayList<>();

    public Top3Players(Long studentIdx, Long gameCount) {
        this.studentIdx = studentIdx;
        this.gameCount = gameCount;
    }

    public Long getStudentIdx() {
        return studentIdx;
    }

    public void setStudentIdx(Long studentIdx) {
        this.studentIdx = studentIdx;
    }

    public Long getGameCount() {
        return gameCount;
    }

    public void setGameCount(Long gameCount) {
        this.gameCount = gameCount;
    }

    @Override
    public String toString() {
        return "Top3Players{" +
                "studentIdx=" + studentIdx +
                ", gameCount=" + gameCount +
                '}';
    }

    // Static method to update the list of top players
    public static void updateTopPlayers(List<Top3Players> players) {
        topPlayers = players;
    }

    // Static method to get the list of top players
    public static List<Top3Players> getTopPlayers() {
        return topPlayers;
    }
}
