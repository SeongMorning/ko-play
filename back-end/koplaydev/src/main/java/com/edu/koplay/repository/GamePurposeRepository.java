package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.GamePurpose;

public interface GamePurposeRepository extends JpaRepository<GamePurpose, Long> {}
