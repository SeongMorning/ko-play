package com.edu.koplay.websocket;

import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.WordDTO;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class GameWordMessage {
    ResponseDTO<Object> message;
    public GameWordMessage(ResponseDTO<Object> response) {
        this.message = response;

    }

    /*
    *
    * private String message;

    public GameStartMessage() {
    }

    public GameStartMessage(String message) {
        this.message = message;
    }



    */
}
