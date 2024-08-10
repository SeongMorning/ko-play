package com.edu.koplay.websocket.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CorrectDTO {
    private String wordIdx;
    private boolean isCorrect;
}
