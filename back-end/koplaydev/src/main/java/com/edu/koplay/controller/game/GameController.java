package com.edu.koplay.controller.game;

import com.edu.koplay.service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;


import java.util.List;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/games")
public class GameController {
    @Autowired
    private GameService gameService;

    @GetMapping
    public List<Game> getAllGames() {
        return gameService.getAllGames();
    }

    @PostMapping("/words")
    public List<Word> getWordsForGame(@RequestParam Long gameId) {
        return gameService.getWordsForGame(gameId);
    }

    @PostMapping("/result")
    public GameData addGameResult(@RequestBody GameData gameData) {
        return gameService.addGameResult(gameData);
    }
}
