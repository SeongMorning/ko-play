package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    Optional<List<Student>> findAllByParentAndIsDeletedFalse(Parent parent);

    @Query("SELECT u FROM Student u WHERE u.studentId = :loginId AND u.studentPw = :password AND u.isDeleted = false")
    Student findByStudentIdAndStudentPw(@Param("loginId") String loginId, @Param("password") String password);

    Optional<Student> findByStudentId(String id);

    Optional<Student> findByStudentIdAndIsDeletedFalse(String id);

    Optional<Student> findByStudentIdAndParentAndIsDeletedFalse(String studentID, Parent parent);

    Optional<Student> findByStudentIdx(Long studentIdx);

    //Optional<Student> findByStudentId(String );
}
