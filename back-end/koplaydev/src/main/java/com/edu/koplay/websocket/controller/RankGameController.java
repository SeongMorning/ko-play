package com.edu.koplay.websocket.controller;

import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.WordDTO;
import com.edu.koplay.dto.WordGameDataDTO;
import com.edu.koplay.model.Word;
import com.edu.koplay.service.WordService;
import com.edu.koplay.websocket.*;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.DestinationVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class RankGameController {

    private final WordService wordService;;
    // GameRoomManager 인스턴스 생성
    private final GameRoomManager roomManager = new GameRoomManager();
    // SimpMessagingTemplate 인스턴스를 주입받음 (메시지 전송을 위해)
    private final SimpMessagingTemplate messagingTemplate;

    public RankGameController(WordService wordService, SimpMessagingTemplate messagingTemplate) {
        this.wordService = wordService;

        this.messagingTemplate = messagingTemplate;
    }

    // 클라이언트가 게임에 참여할 때 호출되는 메서드
    @MessageMapping("/join")
//    @SendTo("/topic/game/1")
    public String joinGame(String playerId) throws Exception{
        // 클라이언트를 방에 추가하거나 새 방을 생성
//        Thread.sleep(1000); // simulated delay
        GameRoom room = roomManager.createOrJoinRoom(playerId);
//        System.out.println("room!!!!!!!!!!!!!!!");
        // 방 ID를 클라이언트에게 반환
        if (room.isFull()) {
            startGame(room.getRoomId());
        }
        return "Joined room: " + room.getRoomId();
    }
    private void startGame(Long roomId) {
        GameRoom room = roomManager.getRoom(roomId);
        if (room == null) {
            return;
        }

        // 게임 상태를 시작 상태로 변경
        room.getGameState().startGame();
        // 방의 모든 클라이언트에게 게임 시작 메시지 전송
        messagingTemplate.convertAndSend("/topic/game/" + roomId, new GameStartMessage("Game started"));
        List<Word> words= makeGameData();
        List<Object> res = new ArrayList<>();
        List<WordDTO> dtos = words.stream().map(WordDTO::new).collect(Collectors.toList());
        res.add(dtos);
        res.add(new WordGameDataDTO());
        ResponseDTO<Object> response = ResponseDTO.<Object>builder().data(res).build();
//        System.out.println("!!!!!!!!"+response.getData());
        messagingTemplate.convertAndSend("/topic/game/" + roomId, new GameWordMessage(response));
    }

    private List<Word> makeGameData() {

        return wordService.getWordsForGame(20, 3, true);
    }

    // 클라이언트가 게임 중에 메시지를 보낼 때 호출되는 메서드
    @MessageMapping("/game/{roomId}")
    public void handleGameMessage(@DestinationVariable Long roomId, GameMessage message) {
        // 방 ID로 해당 방을 가져옴
        System.out.println("game1!!!!!!!!!!!!!!");
        GameRoom room = roomManager.getRoom(roomId);
        if (room == null) {
            return; // 방이 없을 경우 처리하지 않음
        }
        System.out.println("game2!!!!!!!!!!!!!!");
        // 방의 게임 상태를 가져옴
        GameState gameState = room.getGameState();
        // 게임 상태 업데이트 (점수 추가)
        gameState.updateScore(message.getPlayerId(), message.getScore());

        // 게임이 종료되었는지 확인하고, 종료되었으면 클라이언트에게 결과 전송
        if (gameState.isGameFinished()) {
            String winner = gameState.getWinner();
            notifyClients(roomId, new GameResultMessage(winner));
        }
    }

    // 방의 모든 클라이언트에게 게임 결과를 알림
    private void notifyClients(Long roomId, GameResultMessage resultMessage) {
        // STOMP를 사용하여 방의 모든 클라이언트에게 메시지를 전송
        messagingTemplate.convertAndSend("/topic/game/" + roomId, resultMessage);
    }
}


