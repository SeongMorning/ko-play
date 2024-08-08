package com.edu.koplay.websocket;

import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.WordDTO;
import org.springframework.messaging.Message;
import org.springframework.messaging.core.MessagePostProcessor;

public class GameWordMessage {
    ResponseDTO<WordDTO> message;
    public GameWordMessage(ResponseDTO<WordDTO> response) {
        this.message = response;

    }
    public ResponseDTO<WordDTO> getMessage() {
        return message;
    }
    public void setMessage(ResponseDTO<WordDTO> message) {
        this.message = message;
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
