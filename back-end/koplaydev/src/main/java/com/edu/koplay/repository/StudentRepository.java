package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Student;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {
    List<Student> findAllByParent(Parent parent);
}
