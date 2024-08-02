package com.edu.koplay.dto;

import com.edu.koplay.model.Game;
import com.edu.koplay.model.GameData;
import com.edu.koplay.model.Parent;
import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDataDTO {
    private Long gameIdx;
    private int correct;
    private int totalQuestion;
    private int gameLevel;
    private int gainedExp;

    public GameDataDTO(final GameData gameData) {
        this.gameIdx = gameData.getGame().getGameIdx();
        this.correct = gameData.getCorrect();
        this.totalQuestion = gameData.getTotalQuestion();
        this.gameLevel = gameData.getGameLevel();
        this.gainedExp = gameData.getGainedExp();
    }

    public static GameData toEntity(final GameDataDTO dto) {
        return GameData.builder()
                .correct(dto.getCorrect())
                .totalQuestion(dto.getTotalQuestion())
                .gameLevel(dto.getGameLevel())
                .gainedExp(dto.getGainedExp())
                .build();
    }

}
