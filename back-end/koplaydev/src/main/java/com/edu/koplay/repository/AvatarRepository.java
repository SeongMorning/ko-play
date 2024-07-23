package com.edu.koplay.repository;

import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Avatar;

import java.util.List;

public interface AvatarRepository extends JpaRepository<Avatar, Long> {
    List<Avatar> findAllByStudent(Student student);
}
