package com.edu.koplay.websocket.controller;

import com.edu.koplay.dto.WordDTO;
import com.edu.koplay.dto.WordGameDataDTO;
import com.edu.koplay.model.Word;
import com.edu.koplay.service.WordService;
import com.edu.koplay.websocket.*;
import com.edu.koplay.websocket.dto.CorrectDTO;
import com.edu.koplay.websocket.dto.GameDTO;
import com.edu.koplay.websocket.dto.JoinDTO;
import com.edu.koplay.websocket.dto.ResponseDTO;
import com.google.gson.Gson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.messaging.handler.annotation.DestinationVariable;

import java.security.Principal;
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
        waitGame();
        logger.info("방배정되어있는 상태인가? "+ String.valueOf(GameRoomManager.userIdAndRoom.containsKey(playerId)));
        if (GameRoomManager.userIdAndRoom.containsKey(playerId)) {
            logger.info("방 배정이 되어있다면 해당 방에 입장시키겠어요...");
            roomId = GameRoomManager.userIdAndRoom.get(playerId);
            roomManager.createOrJoinRoom(roomId, playerId);
            messagingTemplate.convertAndSend("/topic/game/match", new GameStartMessage(String.valueOf(roomId)));
        }

    }

    // 클라이언트가 게임에 참여할 때 호출되는 메서드
    @MessageMapping("/join")
    @SendTo("/topic/game")
    public void joinGame(@Payload JoinDTO joinDTO) throws Exception {
        String playerId = joinDTO.getPlayerId();
        Long roomId = joinDTO.getRoomId();

        GameRoom gameRoom = roomManager.createOrJoinRoom(roomId, playerId);
        //키가 있으면 방배정 된거니까 게임 시작하면 될듯
        if (gameRoom.isFull()) {
            logger.info(roomId+"번방이 다 차있어서 게임을 시작합니다");
                startGame(roomId);
        }
    }

    @MessageMapping("/out")
    public void outGame(String playerId) throws Exception {
        //모든것을 삭제해버려요
        roomManager.deleteRoom(playerId);
    }

    public void waitGame() throws Exception {
//        아이디당 룸 아이디를 배정해주는 메서드
//        모두 배정하고 true 리턴
        while (GameRoomManager.waitingQueue.size() >= 2) {
            logger.info("여기 배정했어요");
            String id1 = GameRoomManager.waitingQueue.poll();
            String id2 = GameRoomManager.waitingQueue.poll();
            System.out.println(id1 + id2);
            GameRoomManager.userIdAndRoom.put(id1, roomId);
            GameRoomManager.userIdAndRoom.put(id2, roomId);
            logger.info("roomId" + roomId);
            roomId++;
        }
    }

    private void startGame(Long roomId) throws InterruptedException {
        GameRoom room = roomManager.getRoom(roomId);
        logger.info("startGame 방정보를 가져왔어요");
        if (room == null) {
            logger.info("room is null");
            return;
        }
        // 게임 참가자를 저장하고
        // 게임 상태를 시작 상태로 변경
        List<String> clients = room.getClients();
        //ㅎㅎ 세상 별로인 코드... 눈감아다들 바빠.
        room.getGameState().setPlayer1(clients.get(0));
        room.getGameState().setPlayer2(clients.get(1));

        room.getGameState().startGame();
        // 방의 모든 클라이언트에게 게임 시작 메시지 전송
        List<Word> words = makeGameData();
        List<Object> res = new ArrayList<>();
        List<WordDTO> dtos = words.stream().map(WordDTO::new).collect(Collectors.toList());
        res.add(dtos);
        List<WordGameDataDTO> wordGameDataDTOS = new ArrayList<>();
        for (int i = 0; i < 20; i++) {
            wordGameDataDTOS.add(new WordGameDataDTO());
        }
        res.add(wordGameDataDTOS);
        ResponseDTO<Object> response = ResponseDTO.<Object>builder().index(2).data(res).build();
//        System.out.println("!!!!!!!!"+response.getData());
        Thread.sleep(1000); // simulated delay
        logger.info(roomId+"로게임단어전달합니다."+"단어: "+wordGameDataDTOS.toString());
        //게임 단어전달 2번 index
        messagingTemplate.convertAndSend("/topic/game/" + roomId, response);

        logger.info(roomId+"에서 게임이 시작됩니다..");

        //게임시작 1번 index
        messagingTemplate.convertAndSend("/topic/game/" + roomId, ResponseDTO.<Object>builder().index(1).build());
    }

    private List<Word> makeGameData() {
        return wordService.getRandomWordsForRankGame(20);
    }

    //누군가가 정답을 맞췄을 때 처리하는 로직
    @MessageMapping("/correct")
    public void correctWord(Principal p,@Payload GameDTO gameDTO) throws Exception {
        Long roomId = gameDTO.getRoomId();
        String playerId = gameDTO.getPlayerId();
        String wordIdx = gameDTO.getWordIdx();

        GameRoom room = roomManager.getRoom(roomId);

        // 방의 게임 상태를 가져옴
        GameState gameState = room.getGameState();
        // 게임 상태 업데이트 (점수 추가)
        gameState.updateScore(playerId);
        System.out.println(roomId + "@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
        CorrectDTO returnDTOFalse = CorrectDTO.builder().wordIdx(wordIdx).isCorrect(false).build();
        ResponseDTO<CorrectDTO> responseFalse = ResponseDTO.<CorrectDTO>builder().index(3).data(List.of(returnDTOFalse)).build();
        CorrectDTO returnDTOTrue = CorrectDTO.builder().wordIdx(wordIdx).isCorrect(true).build();
        System.out.println(p.getName()+"dddddddddddddddddddddddddddd");
        ResponseDTO<CorrectDTO> responseTrue = ResponseDTO.<CorrectDTO>builder().index(3).data(List.of(returnDTOTrue)).build();

        //리턴은 플레이어 id랑 isCorrect boolean 보내주기 3번
        if(playerId.equals(gameState.getPlayer1())){
            messagingTemplate.convertAndSendToUser(gameState.getPlayer2(), "/topic/ingame/" + roomId, responseFalse);
        }else{
            messagingTemplate.convertAndSendToUser(gameState.getPlayer1(), "/topic/ingame/" + roomId, responseFalse);
        }
        messagingTemplate.convertAndSendToUser(playerId, "/topic/ingame/" + roomId, responseTrue);
    }

    //정답을 아무도 못맞췄을 때 처리하는 로직
    @MessageMapping("/incorrect")
    public void inCorrectWord(@Payload GameDTO gameDTO) throws Exception {
        Long roomId = gameDTO.getRoomId();
        String playerId = gameDTO.getPlayerId();
        String wordIdx = gameDTO.getWordIdx();
        logger.info(playerId);
        logger.info("여기" + gameDTO.toString());
        GameRoom room = roomManager.getRoom(roomId);

        // 방의 게임 상태를 가져옴
        GameState gameState = room.getGameState();
        logger.info(playerId);
        CorrectDTO returnDTOFalse = CorrectDTO.builder().wordIdx(wordIdx).isCorrect(false).build();
        ResponseDTO<CorrectDTO> responseFalse = ResponseDTO.<CorrectDTO>builder().index(4).data(List.of(returnDTOFalse)).build();
        //다 틀린것 4번
//        messagingTemplate.convertAndSend("/topic/game/" + roomId, responseFalse);

        messagingTemplate.convertAndSendToUser(playerId, "/topic/ingame/" + roomId, responseFalse);
//        messagingTemplate.convertAndSendToUser(gameState.getPlayer2(), "/topic/game/" + roomId, responseFalse);

    }

//    // 클라이언트가 게임 중에 누군가가 정답을 맞췄을 때
//    @MessageMapping("/game/{roomId}")
//    public void handleGameMessage(@Payload GameDTO gameDTO) {
//        // 방 ID로 해당 방을 가져옴
//        Long roomId = gameDTO.getRoomId();
//        String playerId = gameDTO.getPlayerId();
//        String wordIdx = gameDTO.getWordIdx();
//
//        GameRoom room = roomManager.getRoom(roomId);
//        if (room == null) {
//            return; // 방이 없을 경우 처리하지 않음
//        }
//        // 방의 게임 상태를 가져옴
//        GameState gameState = room.getGameState();
//        // 게임 상태 업데이트 (점수 추가)
//        gameState.updateScore(message.getPlayerId(), message.getScore());
//
//        // 게임이 종료되었는지 확인하고, 종료되었으면 클라이언트에게 결과 전송
//        if (gameState.isGameFinished()) {
//            String winner = gameState.getWinner();
//            notifyClients(roomId, new GameResultMessage(winner));
//            GameRoomManager.userIdAndRoom.remove(userId);
//        }
//    }


    // 방의 모든 클라이언트에게 게임 결과를 알림
    private void notifyClients(Long roomId, GameResultMessage resultMessage) {
        // STOMP를 사용하여 방의 모든 클라이언트에게 메시지를 전송
        messagingTemplate.convertAndSend("/topic/game/" + roomId, resultMessage);
    }
}


