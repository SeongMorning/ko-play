package com.edu.koplay.websocket.controller;

import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.WordDTO;
import com.edu.koplay.dto.WordGameDataDTO;
import com.edu.koplay.model.Word;
import com.edu.koplay.service.WordService;
import com.edu.koplay.websocket.*;
import com.edu.koplay.websocket.dto.JoinDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.DestinationVariable;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Controller
public class RankGameController {
    Logger logger = LoggerFactory.getLogger(getClass());
    private final WordService wordService;
    ;
    // GameRoomManager 인스턴스 생성
    private final GameRoomManager roomManager;
    // SimpMessagingTemplate 인스턴스를 주입받음 (메시지 전송을 위해)
    private final SimpMessagingTemplate messagingTemplate;

    public RankGameController(WordService wordService, GameRoomManager roomManager, SimpMessagingTemplate messagingTemplate) {
        this.wordService = wordService;
        this.roomManager = roomManager;

        this.messagingTemplate = messagingTemplate;
    }
    Long roomId = 1L;

    @MessageMapping("/match")
    @SendTo("/topic/game/match")
    public void matchGame(String playerId) throws Exception {
        //반배정 계속 할거야
        logger.info("before");
        waitGame();
        logger.info("after");
        logger.info("플레이어아이디: "+playerId);
        logger.info("check"+playerId.equals("1234"));
        logger.info(String.valueOf(GameRoomManager.userIdAndRoom.containsKey(playerId)));
        if (GameRoomManager.userIdAndRoom.containsKey(playerId)) {
            roomId = GameRoomManager.userIdAndRoom.get(playerId);
            roomManager.createOrJoinRoom(roomId, playerId);
            messagingTemplate.convertAndSend("/topic/game/match", new GameStartMessage(String.valueOf(roomId)));
        }
//        System.out.println(roomId+":roomId");
//        System.out.println(new GameStartMessage(String.valueOf(roomId)));


    }

    // 클라이언트가 게임에 참여할 때 호출되는 메서드
    @MessageMapping("/join")
    @SendTo("/topic/game")
    public void joinGame(@Payload JoinDTO joinDTO) throws Exception {
        String playerId = joinDTO.getPlayerId();
        Long roomId = joinDTO.getRoomId();

        System.out.println("드러가 ");

        logger.info(String.valueOf(GameRoomManager.userIdAndRoom.size()));

        //반배정 계속 할거야
        System.out.println(playerId);
        System.out.println(GameRoomManager.userIdAndRoom.containsKey("1234"));
        System.out.println(GameRoomManager.userIdAndRoom.get("1234"));
        System.out.println(String.valueOf(roomId));
//        Long roomId = GameRoomManager.userIdAndRoom.get(playerId);

//        if(roomId == null) return;
        GameRoom gameRoom = roomManager.createOrJoinRoom(roomId, playerId);
        System.out.println("test"+gameRoom.isFull());
        //키가 있으면 방배정 된거니까 게임 시작하면 될듯
        if (gameRoom.isFull()) {
            startGame(roomId);
        }
        logger.info(String.valueOf(GameRoomManager.userIdAndRoom.size()));

    }

    public void waitGame() throws Exception {
//        아이디당 룸 아이디를 배정해주는 메서드
//        모두 배정하고 true 리턴
        logger.info("waitGamesize"+GameRoomManager.waitingQueue.size());
        while (GameRoomManager.waitingQueue.size() >= 2) {
            logger.info("여기 배정했어요");
            String id1 = GameRoomManager.waitingQueue.poll();
            String id2 = GameRoomManager.waitingQueue.poll();
            System.out.println(id1+id2);
            GameRoomManager.userIdAndRoom.put(id1, roomId);
            GameRoomManager.userIdAndRoom.put(id2, roomId);
            logger.info("roomId"+roomId);
            roomId++;
        }
    }

    private void startGame(Long roomId) throws InterruptedException {
        GameRoom room = roomManager.getRoom(roomId);
        if (room == null) {
            return;
        }

        // 게임 상태를 시작 상태로 변경
        room.getGameState().startGame();
        // 방의 모든 클라이언트에게 게임 시작 메시지 전송
        List<Word> words = makeGameData();
        List<Object> res = new ArrayList<>();
        List<WordDTO> dtos = words.stream().map(WordDTO::new).collect(Collectors.toList());
        res.add(dtos);
        List<WordGameDataDTO> wordGameDataDTOS = new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            wordGameDataDTOS.add(new WordGameDataDTO());
        }
        res.add(wordGameDataDTOS);
        ResponseDTO<Object> response = ResponseDTO.<Object>builder().data(res).build();
//        System.out.println("!!!!!!!!"+response.getData());
        Thread.sleep(1000); // simulated delay
//        messagingTemplate.convertAndSend("/topic/game/" + roomId, new GameWordMessage(response));
        messagingTemplate.convertAndSend("/topic/game/" + roomId, new GameStartMessage("Game started"));
    }


    private List<Word> makeGameData() {

        return wordService.getWordsForGame(20, 3, true);
    }

    // 클라이언트가 게임 중에 메시지를 보낼 때 호출되는 메서드
    @MessageMapping("/game/{roomId}")
    public void handleGameMessage(@DestinationVariable Long roomId, GameMessage message, String userId) {
        // 방 ID로 해당 방을 가져옴
//        System.out.println("game1!!!!!!!!!!!!!!");
        GameRoom room = roomManager.getRoom(roomId);
        if (room == null) {
            return; // 방이 없을 경우 처리하지 않음
        }
//        System.out.println("game2!!!!!!!!!!!!!!");
        // 방의 게임 상태를 가져옴
        GameState gameState = room.getGameState();
        // 게임 상태 업데이트 (점수 추가)
        gameState.updateScore(message.getPlayerId(), message.getScore());

        // 게임이 종료되었는지 확인하고, 종료되었으면 클라이언트에게 결과 전송
        if (gameState.isGameFinished()) {
            String winner = gameState.getWinner();
            notifyClients(roomId, new GameResultMessage(winner));
            GameRoomManager.userIdAndRoom.remove(userId);
        }
    }


    // 방의 모든 클라이언트에게 게임 결과를 알림
    private void notifyClients(Long roomId, GameResultMessage resultMessage) {
        // STOMP를 사용하여 방의 모든 클라이언트에게 메시지를 전송
        messagingTemplate.convertAndSend("/topic/game/" + roomId, resultMessage);
    }
}


