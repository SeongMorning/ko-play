package com.edu.koplay.repository;


import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Gallary;

import java.util.List;

public interface GallaryRepository extends JpaRepository<Gallary, Long> {
    List<Gallary> findAllByStudentAndIsDeletedFalse(Student student);
}

