package com.edu.koplay.repository;

import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.RecommendLevel;
import org.springframework.stereotype.Repository;

@Repository
public interface RecommendLevelRepository extends JpaRepository<RecommendLevel, Long> {
    RecommendLevel findAllByStudent(Student entity);
    RecommendLevel findByStudent(Student student);
}
