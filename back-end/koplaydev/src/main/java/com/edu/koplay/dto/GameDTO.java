package com.edu.koplay.dto;

import com.edu.koplay.model.GamePurpose;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GameDTO {
    private Long gameIdx;
    private String gameName;
    private boolean isRank;
    private String gamePurpose;

    public GameDTO(final GamePurpose gamePurpose) {
        this.gameIdx = gamePurpose.getGame().getGameIdx();
        this.gameName = gamePurpose.getGame().getGameName();
        this.isRank = gamePurpose.getGame().getIsRank();
        this.gamePurpose = gamePurpose.getGamePurpose();
    }

}
