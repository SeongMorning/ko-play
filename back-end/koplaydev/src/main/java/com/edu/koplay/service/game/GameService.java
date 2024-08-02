package com.edu.koplay.service.game;

import com.edu.koplay.dto.GameDataDTO;
import com.edu.koplay.model.*;
import com.edu.koplay.repository.*;
import com.edu.koplay.service.parent.ParentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class GameService {
    private static final Logger logger = LoggerFactory.getLogger(GameService.class);

    private GameRepository gameRepository;
    private GameDataRepository gameDataRepository;
    private GamePurposeRepository gamePurposeRepository;
    private WordRepository wordRepository;
    private StudentRepository studentRepository;

    @Autowired
    public GameService(GameRepository gameRepository, GameDataRepository gameDataRepository, GamePurposeRepository gamePurposeRepository, WordRepository wordRepository, StudentRepository studentRepository) {
        this.gameRepository = gameRepository;
        this.gameDataRepository = gameDataRepository;
        this.gamePurposeRepository = gamePurposeRepository;
        this.wordRepository = wordRepository;
        this.studentRepository = studentRepository;
    }

    public List<GamePurpose> getAllGamesWithPurpose(boolean isRank) {
        List<Game> games = null;
        if (isRank) {
            games = gameRepository.findByIsRankTrue().orElseThrow();
        } else {
            games = gameRepository.findByIsRankFalse().orElseThrow();
        }

        List<GamePurpose> gamePurpose = games.stream()
                .map(game -> gamePurposeRepository.findByGame(game))
                .flatMap(Optional::stream)
                .toList();


        return gamePurpose;
    }

    public List<Word> getWordsForGame(int amount, int difficulty, boolean isDouble) {
        List<Word> word = null;
        if (isDouble) {
            int findAmount = amount / 2;
            word = wordRepository.findRandomWordByDifficulty(difficulty, amount / 2).orElseThrow(()-> new NoSuchElementException("단어가 존재하지않아요"));
            if(amount % 2 == 1) {
                //홀수일경우. 한쪽에서 하나 더 찾아야한다.
                word.addAll(wordRepository.findRandomWordByDifficulty(difficulty + 1, amount / 2+1).orElseThrow(() -> new NoSuchElementException("단어가 존재하지않아요")));
            }else{
                word.addAll(wordRepository.findRandomWordByDifficulty(difficulty + 1, amount / 2).orElseThrow(() -> new NoSuchElementException("단어가 존재하지않아요")));
            }
        } else {
            word = wordRepository.findRandomWordByDifficulty(difficulty, amount).orElseThrow(()-> new NoSuchElementException("단어가 존재하지않아요"));
        }
        return word;
    }

    public Student addGameResult(String id, GameDataDTO gamedataDTO) {
        Student student = studentRepository.findByStudentIdAndIsDeletedFalse(id).orElseThrow(()-> new NoSuchElementException("단어가 존재하지않아요"));
        student.setExp(student.getExp()+gamedataDTO.getGainedExp());
        Game game = gameRepository.findByGameIdx(gamedataDTO.getGameIdx()).orElseThrow(()-> new NoSuchElementException("없는게임입니다."));

        GameData data = GameDataDTO.toEntity(gamedataDTO);
        data.setGame(game);
        data.setStudent(student);

        //데이터 저장하기
        logger.info(data.toString());
        gameDataRepository.save(data);

        return studentRepository.findByStudentIdAndIsDeletedFalse(id).orElseThrow(()-> new NoSuchElementException("학생이 존재하지않아요"));
    }

}

