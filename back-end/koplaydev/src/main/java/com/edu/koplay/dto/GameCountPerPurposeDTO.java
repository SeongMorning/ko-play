package com.edu.koplay.dto;

import lombok.Data;

@Data
public class GameCountPerPurposeDTO {
    private int count;
    private String purposeName;

    public GameCountPerPurposeDTO(int count, String purposeName) {
        this.count = count;
        this.purposeName = purposeName;
    }
}
