package com.edu.koplay.repository;

import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.GameData;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameDataRepository extends JpaRepository<GameData, Long> {

    List<GameData> findAllByStudent(Student entity);
}
