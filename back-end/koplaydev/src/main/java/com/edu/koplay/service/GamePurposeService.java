package com.edu.koplay.service;

import com.edu.koplay.model.Game;
import com.edu.koplay.model.GamePurpose;
import com.edu.koplay.repository.GamePurposeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class GamePurposeService {
    private GamePurposeRepository gamePurposeRepository;

    @Autowired
    public GamePurposeService(GamePurposeRepository gamePurposeRepository) {
        this.gamePurposeRepository = gamePurposeRepository;
    }

    public List<GamePurpose> selectGamesPurpose(List<Game> games) {
        return games.stream()
                .map(game -> gamePurposeRepository.findByGame(game))
                .flatMap(Optional::stream)
                .toList();
    }
}
