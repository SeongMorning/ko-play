package com.edu.koplay.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ExpDTO {
    private int exp;
    private Date date;


    public ExpDTO(int exp, Date date) {
        this.exp = exp;
        this.date = date;
    }
}
