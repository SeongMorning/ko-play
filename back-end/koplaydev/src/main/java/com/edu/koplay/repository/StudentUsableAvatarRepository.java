package com.edu.koplay.repository;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.StudentUsableAvatar;

import java.util.List;

public interface StudentUsableAvatarRepository extends JpaRepository<StudentUsableAvatar, Long> {
    List<Avatar> findAllByStudent(Student student);
}
