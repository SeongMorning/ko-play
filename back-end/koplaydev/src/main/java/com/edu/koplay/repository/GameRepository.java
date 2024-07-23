package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Game;

public interface GameRepository extends JpaRepository<Game, Long> {}
