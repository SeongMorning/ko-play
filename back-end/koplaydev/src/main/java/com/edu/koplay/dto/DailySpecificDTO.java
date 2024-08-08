package com.edu.koplay.dto;

import lombok.Data;

import java.util.Date;

@Data
public class DailySpecificDTO {
    private Date date;
    private int correctAnswer;
    private int totalQuestion;
    private String gamePurpose;
    private int level;

    public DailySpecificDTO(Date date, int correct, int question, String gamePurpose, int gameLevel) {
        this.date = date;
        this.correctAnswer = correct;
        this.totalQuestion = question;
        this.gamePurpose = gamePurpose;
        this.level = gameLevel;
    }

}
