package com.edu.koplay.repository;

import com.edu.koplay.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.GamePurpose;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GamePurposeRepository extends JpaRepository<GamePurpose, Long> {
    Optional<GamePurpose> findByGame(Game game);

}
