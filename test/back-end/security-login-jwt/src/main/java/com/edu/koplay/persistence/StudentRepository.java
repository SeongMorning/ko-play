package com.edu.koplay.persistence;

import com.edu.koplay.model.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Integer> {

    @Query("SELECT u FROM StudentEntity u WHERE u.id = :loginId AND u.password = :password AND u.isDeleted = false")
    StudentEntity findByLoginIdAndPassword(@Param("loginId") String loginId, @Param("password") String password);

    StudentEntity findById(String id);
}
