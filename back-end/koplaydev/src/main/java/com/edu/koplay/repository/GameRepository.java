package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Game;
import org.springframework.stereotype.Repository;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {}
