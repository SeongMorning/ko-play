package com.edu.koplay.service.game;

import com.edu.koplay.repository.GameDataRepository;
import com.edu.koplay.repository.GamePurposeRepository;
import com.edu.koplay.repository.GameRepository;
import com.edu.koplay.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;

import java.util.List;

@Service
public class GameService {
    @Autowired
    private GameRepository gameRepository;

    @Autowired
    private GameDataRepository gameDataRepository;

    @Autowired
    private GamePurposeRepository gamePurposeRepository;

    @Autowired
    private WordRepository wordRepository;

    public List<Game> getAllGames() {
        return gameRepository.findAll();
    }

    public List<Word> getWordsForGame(Long gameId) {
        Game game = gameRepository.findById(gameId).orElseThrow();
        return wordRepository.findAllByGame(game);
    }

    public GameData addGameResult(GameData gameData) {
        return gameDataRepository.save(gameData);
    }
}

