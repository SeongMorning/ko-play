package com.edu.koplay.dto;

import lombok.Data;

import java.util.Date;

@Data
public class DailySpecificDTO {
    private Date date;
    private int correct;
    private int question;
    private String gamePurpose;
    private int gameLevel;

    public DailySpecificDTO(Date date, int correct, int question, String gamePurpose, int gameLevel) {
        this.date = date;
        this.correct = correct;
        this.question = question;
        this.gamePurpose = gamePurpose;
        this.gameLevel = gameLevel;
    }

}
