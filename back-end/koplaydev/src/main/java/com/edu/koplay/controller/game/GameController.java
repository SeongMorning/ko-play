package com.edu.koplay.controller.game;

import com.edu.koplay.dto.*;
import com.edu.koplay.service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping("/")
    public ResponseEntity<?> getAllGames(@RequestParam(name="isRank") Boolean isRank) {
        try{
            List<GamePurpose> games = gameService.getAllGamesWithPurpose(isRank);

            List<GameDTO> dtos = games.stream().map(GameDTO::new).collect(Collectors.toList());

            ResponseDTO<GameDTO> response = ResponseDTO.<GameDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e) {
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
        try{
            //가져와야할 단어의 수준과 개수 설정하기
            int difficulty = (wordDTO.getLevel()+1)/2;
            int amount = wordDTO.getAmount();
            List<Word> words = null;
            if(wordDTO.getLevel()%2 == 0){
                //한가지 레벨 수준만
                //단어가져오기
                words = gameService.getWordsForGame(amount,difficulty,false);
            }else{
                words = gameService.getWordsForGame(amount,difficulty,true);
            }
            //dto 전환
            List<WordDTO> dtos = words.stream().map(WordDTO::new).collect(Collectors.toList());

            ResponseDTO<WordDTO> response = ResponseDTO.<WordDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<WordDTO> response = ResponseDTO.<WordDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/result")
    public ResponseEntity<?> addGameData(@RequestBody GameDataDTO gameResultDTO) {
        try{
            String id = getAuthenticationData();

            Student data = gameService.addGameResult(id, gameResultDTO);

            //dto 전환
            StudentDTO dto = new StudentDTO(data);

            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
}
