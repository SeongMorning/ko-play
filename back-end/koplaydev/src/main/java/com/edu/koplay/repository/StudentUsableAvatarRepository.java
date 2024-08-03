package com.edu.koplay.repository;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.StudentUsableAvatar;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentUsableAvatarRepository extends JpaRepository<StudentUsableAvatar, Long> {
    Optional<List<StudentUsableAvatar>> findAllByStudent(Student student);
    Optional<StudentUsableAvatar> findByAvatarAndStudent(Student student, Avatar avatar);
}
