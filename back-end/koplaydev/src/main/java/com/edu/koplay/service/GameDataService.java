package com.edu.koplay.service;

import com.edu.koplay.dto.GameDataDTO;
import com.edu.koplay.model.Game;
import com.edu.koplay.model.GameData;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.GameDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameDataService {
    Logger logger = LoggerFactory.getLogger(GameDataService.class);
    private GameDataRepository gameDataRepository;

    @Autowired
    public GameDataService(GameDataRepository gameDataRepository) {
        this.gameDataRepository = gameDataRepository;
    }

    public GameData insertGameData(GameDataDTO gamedataDTO, Game game, Student student){
        GameData data = GameDataDTO.toEntity(gamedataDTO);
        data.setGame(game);
        data.setStudent(student);

        logger.debug(data.toString());
        //데이터 저장하기
        return gameDataRepository.save(data);
    }
}
