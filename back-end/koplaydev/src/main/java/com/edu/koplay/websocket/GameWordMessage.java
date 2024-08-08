package com.edu.koplay.websocket;

import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.WordDTO;
import lombok.Getter;
import lombok.Setter;
import org.springframework.messaging.Message;
import org.springframework.messaging.core.MessagePostProcessor;

@Setter
@Getter
public class GameWordMessage {
    ResponseDTO<WordDTO> message;
    public GameWordMessage(ResponseDTO<WordDTO> response) {
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
