package com.edu.koplay.dto;

import com.edu.koplay.model.GamePurpose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
public class GameResultDTO {
    private Long roomId;
    private String playerId;
    private int correct;

    public GameResultDTO(Long roomId, String playerId, int correct) {
        this.roomId = roomId;
        this.playerId = playerId;
        this.correct = correct;
    }
}
