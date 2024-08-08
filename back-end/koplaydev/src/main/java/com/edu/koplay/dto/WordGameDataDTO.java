package com.edu.koplay.dto;

import java.util.Random;

public class WordGameDataDTO {
    private int left;
    private int state;

    public WordGameDataDTO() {
        Random random = new Random();

        // 10부터 70 사이의 랜덤 숫자 생성
        int min = 10;
        int max = 70;
        left = random.nextInt((max - min) + 1) + min;
        this.state = 0;
    }
}
