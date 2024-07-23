package com.edu.koplay.repository;

import com.edu.koplay.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Word;

import java.util.List;

public interface WordRepository extends JpaRepository<Word, Long> {
    List<Word> findAllByGame(Game game);
}
