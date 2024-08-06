package com.edu.koplay.dto;

import lombok.Data;

import java.util.Date;

@Data
public class AllAveragePerPurposeDTO {
    private Date date;
    private int correct;
    private int total;
    private String gamePurpose;

    public AllAveragePerPurposeDTO(Date date,int correct, int total, String gamePurpose) {
        this.date = date;
        this.correct = correct;
        this.total = total;
        this.gamePurpose = gamePurpose;

    }
}
