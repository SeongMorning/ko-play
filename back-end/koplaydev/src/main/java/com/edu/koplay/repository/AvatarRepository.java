package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface AvatarRepository extends JpaRepository<Avatar, Long> {

    Optional<Avatar> findAvatarByAvatarIdx(Long avatarIdx);

    @Query(value = "SELECT a.avatar_idx, a.avatar_file, a.is_deleted, a.created_at , n.nation_idx " +
            "FROM koplay.avatar a " +
            "JOIN koplay.nation n ON a.nation_idx = n.nation_idx " +
            "WHERE n.country_name = :countryName " +
            "AND a.avatar_idx NOT IN (" +
            "    SELECT sua.avatar_idx " +
            "    FROM koplay.student_usable_avatar sua " +
            "    WHERE sua.student_idx = :studentIdx " +
            "    AND sua.is_deleted = FALSE" +
            ") " +
            "ORDER BY RAND() " +
            "LIMIT 1", nativeQuery = true)
    Optional<Avatar> findRandomAvatarByCountryAndStudent(@Param("countryName") String countryName, @Param("studentIdx") Long studentIdx);
}
