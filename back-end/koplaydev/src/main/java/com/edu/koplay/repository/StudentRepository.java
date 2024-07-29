package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findAllByParent(Parent parent);

    @Query("SELECT u FROM Student u WHERE u.studentId = :loginId AND u.studentPw = :password AND u.isDeleted = false")
    Student findByStudentIdAndStudentPw(@Param("loginId") String loginId, @Param("password") String password);

    Student findByStudentId(String id);
}
