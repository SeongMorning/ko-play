package com.edu.koplay.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import lombok.Data;

import java.util.Random;
@Data
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordGameDataDTO {
    private int left;
    private int state;

    public WordGameDataDTO() {
        Random random = new Random();

        // 10부터 70 사이의 랜덤 숫자 생성
        int min = 10;
        int max = 70;
        this.left = random.nextInt((max - min) + 1) + min;
        this.state = 0;
    }
}
