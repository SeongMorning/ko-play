package com.edu.koplay.service.facade;

import com.edu.koplay.dto.GameDataDTO;
import com.edu.koplay.model.*;
import com.edu.koplay.repository.GameDataRepository;
import com.edu.koplay.repository.GameRepository;
import com.edu.koplay.service.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class GameFacadeService {
    private final GameRepository gameRepository;
    private final GameDataRepository gameDataRepository;
    Logger logger = LoggerFactory.getLogger(GameFacadeService.class);
    private GameService gameService;
    private WordService wordService;
    private StudentService studentService;
    private GamePurposeService gamePurposeService;
    private GameDataService gameDataService;
    private RecommendLevelService recommendLevelService;



    @Autowired
    public GameFacadeService(GameService gameService, WordService wordService, StudentService studentService, GamePurposeService gamePurposeService, GameDataService gameDataService, RecommendLevelService recommendLevelService, GameRepository gameRepository, GameDataRepository gameDataRepository) {

        this.gameService = gameService;
        this.wordService = wordService;
        this.studentService = studentService;
        this.gamePurposeService = gamePurposeService;
        this.gameDataService = gameDataService;

        this.recommendLevelService = recommendLevelService;
        this.gameRepository = gameRepository;
        this.gameDataRepository = gameDataRepository;
    }

    public List<GamePurpose> getAllGames(Boolean isRank) {
        List<Game> games = gameService.selectGameList(isRank);
        return gamePurposeService.selectGamesPurpose(games);
    }

    public List<Word> getWordsForGame(int amount, int difficulty, boolean isDouble){
        return wordService.getWordsForGame(amount, difficulty, false);
    }

    public Student addGameData(String id, GameDataDTO gameResultDataDTO){
        //학생정보에서 경험치 업데이트해주기
        Student student = studentService.updateStudentExp(id, gameResultDataDTO.getGainedExp());

        //수행한 게임정보 가져오기
        Game game = gameService.selectOneGame(gameResultDataDTO.getGameIdx());

        //gameData 결과 insert
        GameData data = gameDataService.insertGameData(gameResultDataDTO, game, student);
        
        //해당게임의 purpose 가져오기
        GamePurpose purpose = gamePurposeService.selectGamesPurpose(List.of(game)).get(0);

        //추천레벨반영하기
        recommendLevelService.updateRecommendLevel(student,game, data, purpose);
        return student;
    }


    public RecommendLevel getStudentLevel(Student entity) {
        return recommendLevelService.getStudentLevel(entity);
    }


    public List<Object[]> findDailyResult(long studentIdx) {

        return gameRepository.findDailyResult(studentIdx);
    }

    public List<Object[]> getDailyExp(Long studentIdx) {
        return gameDataRepository.getDailyExp(studentIdx);
    }

//    public List<Object[]> findTotalQuestionGameDataGroupedByDateAndPurpose(Long studentIdx) {
//        return gameRepository.findTotalQuestionGameDataGroupedByDateAndPurpose(studentIdx);
//    }

}
