package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Game;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<List<Game>> findByIsRankFalse();

    Optional<List<Game>> findByIsRankTrue();

    Optional<Game> findByGameIdx(Long gameIdx);
}
