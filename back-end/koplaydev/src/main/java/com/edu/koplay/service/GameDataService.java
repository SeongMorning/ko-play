package com.edu.koplay.service;

import com.edu.koplay.batch.Top3Players;
import com.edu.koplay.dto.GameDataDTO;
import com.edu.koplay.model.Game;
import com.edu.koplay.model.GameData;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.GameDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class GameDataService {
    Logger logger = LoggerFactory.getLogger(GameDataService.class);
    private GameDataRepository gameDataRepository;

    @Autowired
    public GameDataService(GameDataRepository gameDataRepository) {
        this.gameDataRepository = gameDataRepository;
    }
//    public void loadTop3Players() {
//        List<Object[]> results = gameDataRepository.findTop3StudentsWithMostGames();
//
//        // 쿼리 결과를 Top3Players 객체로 변환
//        List<Top3Players> topPlayers = results.stream()
//                .map(result -> new Top3Players((Long) result[0], (Long) result[1]))
//                .collect(Collectors.toList());
//
//        // Top3Players 클래스의 정적 리스트를 갱신
//        Top3Players.updateTopPlayers(topPlayers);
//    }
    public GameData insertGameData(GameDataDTO gamedataDTO, Game game, Student student){
        GameData data = GameDataDTO.toEntity(gamedataDTO);
        data.setGame(game);
        data.setStudent(student);

        logger.debug(data.toString());
        //데이터 저장하기
        return gameDataRepository.save(data);
    }


    public List<GameData> getStudentGameCount(Student entity) {
        return gameDataRepository.findAllByStudent(entity);
    }
}
