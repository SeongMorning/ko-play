package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.GameData;

public interface GameDataRepository extends JpaRepository<GameData, Long> {}
