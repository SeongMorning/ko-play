package com.edu.koplay.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ExpDTO {
    private Date date;
    private int exp;
    private long accumExp;

    public ExpDTO(Date date, int exp, int accumExp ) {
        this.exp = exp;
        this.date = date;
        this.accumExp = accumExp;

    }
}
