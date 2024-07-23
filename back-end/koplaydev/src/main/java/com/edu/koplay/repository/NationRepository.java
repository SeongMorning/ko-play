package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Nation;

public interface NationRepository extends JpaRepository<Nation, Long> {}
