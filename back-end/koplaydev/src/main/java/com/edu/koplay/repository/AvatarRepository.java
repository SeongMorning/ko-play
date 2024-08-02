package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import java.util.List;
@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Long> {
    List<Avatar> findAll();

    //List<Avatar> findAllByNation(String nation);

    //List<Avatar> findAllByNationAndIsDeleteIsFalse(String nation);

    @Query("SELECT a FROM Avatar a WHERE a.nation = :nation " +
            "AND a.isDeleted = false " +
            "AND a.avatarIdx NOT IN (SELECT sua.avatar.avatarIdx FROM StudentUsableAvatar sua WHERE sua.student = :student AND sua.isDeleted = false)")
    List<Avatar> findAvailableAvatarsByNationAndStudent(@Param("nation") String nation, @Param("student") Student student);
}
