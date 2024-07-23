package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Music;

public interface MusicRepository extends JpaRepository<Music, Long> {}
