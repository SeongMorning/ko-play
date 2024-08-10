package com.edu.koplay.websocket.dto;

import lombok.Data;

@Data
public class GameDTO {
    private Long roomId;
    private String playerId;
    private String wordIdx;

   }
