package com.edu.koplay.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
@Data
public class GameCorrectDTO {
    // Getters and setters
    @Setter
    @Getter
    private Date date;
    private int totalQuestion;
    private int correctAnswer;
    private String gamePurpose;
    private int level;

    public GameCorrectDTO(Date date, int totalQuestion, int correctAnswer, String gamePurpose, int level) {
        this.date = date;
        this.totalQuestion = totalQuestion;
        this.correctAnswer = correctAnswer;
        this.gamePurpose = gamePurpose;
        this.level = level;
    }



    @Override
    public String toString() {
        return "GameResultDTO{" +
                "date=" + date +
                ", totalCorrect=" + totalQuestion +
                ", gamePurpose='" + gamePurpose + '\'' +
                '}';
    }
}
