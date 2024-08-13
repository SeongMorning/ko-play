package com.edu.koplay.controller.game;

import com.edu.koplay.batch.CustomItemProcessor;
import com.edu.koplay.batch.Top3Players;
import com.edu.koplay.dto.*;
import com.edu.koplay.model.GamePurpose;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.edu.koplay.model.Word;
import com.edu.koplay.service.GameDataService;
import com.edu.koplay.service.facade.GameFacadeService;
import com.edu.koplay.websocket.GameRoom;
import com.edu.koplay.websocket.GameRoomManager;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/games")
public class GameController {
    Logger logger = LoggerFactory.getLogger(GameController.class);
    private GameRoomManager gameRoomManager;
    private GameFacadeService gameService;
    private GameDataService gameDataService;
    @Autowired
    public GameController(GameFacadeService gameFacadeService, GameDataService gameDataService, GameRoomManager gameRoomManager) {
        this.gameService = gameFacadeService;
        this.gameDataService = gameDataService;
        this.gameRoomManager = gameRoomManager;
    }

    @GetMapping("/")
    public ResponseEntity<?> getAllGames(@RequestParam(name = "isRank") Boolean isRank) {
        try {
            List<GamePurpose> gamePurposes = gameService.getAllGames(isRank);

            List<GameDTO> dtos = gamePurposes.stream().map(GameDTO::new).collect(Collectors.toList());

            ResponseDTO<GameDTO> response = ResponseDTO.<GameDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/words")
    public ResponseEntity<?> getWordsForGame(@ModelAttribute WordRequestDTO wordDTO) {
        //단어비게임. 단어수 10개
        //짝맞추기. 단어수 1lv 4, 2lv 4, 3lv 6, 4lv 6, 5lv 8
        //스무고개. 단어수 3개
        try {
            //가져와야할 단어의 수준
            int difficulty = (wordDTO.getLevel() + 1) / 2;
            //개수
            int amount = wordDTO.getAmount();
            List<Word> words = null; //
            //레벨이 2, 4레벨일경우는 word difficulty 2개 섞어서 가져와야한다. = isDouble변수
            if (wordDTO.getLevel() % 2 == 0) {
                //한가지 레벨 수준만
                //단어가져오기
                words = gameService.getWordsForGame(amount, difficulty, false);
            } else {
                words = gameService.getWordsForGame(amount, difficulty, true);
            }
            //dto 전환
            List<WordDTO> dtos = words.stream().map(WordDTO::new).collect(Collectors.toList());

            ResponseDTO<WordDTO> response = ResponseDTO.<WordDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<WordDTO> response = ResponseDTO.<WordDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/result")
    public ResponseEntity<?> addGameData(@RequestBody GameDataDTO gameResultDataDTO) {
        try {
            String id = getAuthenticationData();

            Student student = gameService.addGameData(id, gameResultDataDTO);
            int count = gameDataService.getStudentGameCount(student).size()+1;
            RecommendLevel level = gameService.getStudentLevel(student);


            //dto 전환
            StudentDTO dto = new StudentDTO(student,level);
            dto.setTotalGameCount(count);

            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping("/loadTop3students")
    public ResponseEntity<?> loadTop3Students() {
        List<Top3Players> topPlayers = CustomItemProcessor.getTopPlayers();
        ResponseDTO<Top3Players> response = null;
        if(topPlayers.isEmpty()) {
            response = ResponseDTO.<Top3Players>builder().error("데이터 없어용~").build();
        }else{

            response = ResponseDTO.<Top3Players>builder().data(topPlayers).build();
        }
        System.out.println(topPlayers.toString());

        return ResponseEntity.ok().body(response);
    }

    @GetMapping("/gameRoom")
    private ResponseEntity<?> getEmptyRoom(){
        try{
            String id = getAuthenticationData();
            logger.info("que add before"+GameRoomManager.waitingQueue.size());
            GameRoomManager.waitingQueue.add(id);
            logger.info(id);
            logger.info("que add after"+GameRoomManager.waitingQueue.size());
            ResponseDTO<String> response = null;

            response = ResponseDTO.<String>builder().data(Collections.singletonList(id)).build();
            return ResponseEntity.ok().body(response);
        }catch(Exception e){
            e.printStackTrace();
            ResponseDTO<String> response = ResponseDTO.<String>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }


    }

    @DeleteMapping("/cancel")
    private ResponseEntity<?> deleteWaitList(){
        try{
            String id = getAuthenticationData();

            GameRoomManager.waitingQueue.size();
            Boolean result = GameRoomManager.waitingQueue.remove(id);
            GameRoomManager.waitingQueue.size();

            ResponseDTO<Boolean> response = null;

            response = ResponseDTO.<Boolean>builder().data(Collections.singletonList(result)).build();
            return ResponseEntity.ok().body(response);
        }catch(Exception e){
            e.printStackTrace();
            ResponseDTO<String> response = ResponseDTO.<String>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }


    }

    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
}
