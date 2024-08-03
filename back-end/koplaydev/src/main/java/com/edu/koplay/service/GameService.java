package com.edu.koplay.service;

import com.edu.koplay.model.*;
import com.edu.koplay.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class GameService {
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private GameRepository gameRepository;
    private StudentRepository studentRepository;

    @Autowired
    public GameService(GameRepository gameRepository, StudentRepository studentRepository) {
        this.gameRepository = gameRepository;
        this.studentRepository = studentRepository;
    }

    public List<Game> selectGameList(boolean isRank) {
        List<Game> games = null;
        if (isRank) {
            games = gameRepository.findByIsRankTrue().orElseThrow();
        } else {
            games = gameRepository.findByIsRankFalse().orElseThrow();
        }

        return games;
    }

    public Game selectOneGame(Long gameIdx) {
        return gameRepository.findByGameIdx(gameIdx).orElseThrow(()-> new NoSuchElementException("없는게임입니다."));
    }

}

