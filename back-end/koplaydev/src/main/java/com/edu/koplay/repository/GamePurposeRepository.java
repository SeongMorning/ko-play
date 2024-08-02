package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.GamePurpose;
import org.springframework.stereotype.Repository;

@Repository
public interface GamePurposeRepository extends JpaRepository<GamePurpose, Long> {}
