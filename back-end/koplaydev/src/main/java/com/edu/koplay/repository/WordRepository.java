package com.edu.koplay.repository;

import com.edu.koplay.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Word;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WordRepository extends JpaRepository<Word, Long> {
    @Query(value = "SELECT * FROM word where word_difficulty = :difficulty ORDER BY RAND() LIMIT :amount", nativeQuery = true)
    Optional<List<Word>> findRandomWordByDifficulty(@Param("difficulty") int difficulty, @Param("amount") int amount);

    @Query(value = "SELECT * FROM word ORDER BY RAND() LIMIT :amount", nativeQuery = true)
    Optional<List<Word>> findRandomWord(@Param("amount") int amount);
}
