package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.RecommendLevel;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendLevelRepository extends JpaRepository<RecommendLevel, Long> {}
