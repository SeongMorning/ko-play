package com.edu.koplay.repository;

import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.GameData;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface GameDataRepository extends JpaRepository<GameData, Long> {

    List<GameData> findAllByStudent(Student entity);




    @Query(value = "SELECT student_idx, COUNT(*) as game_count " +
            "FROM game_data " +
            "WHERE created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) "+
            "GROUP BY student_idx " +
            "ORDER BY game_count DESC " +
            "LIMIT 3", nativeQuery = true)
    List<Object[]> findTop3StudentsWithMostGames();


    @Query(value = "SELECT date(created_at) AS dates, exp, SUM(exp) OVER (ORDER BY date(created_at)) AS cumulative_exp "+
            "FROM ( SELECT SUM(gained_exp) AS exp, date(created_at) AS created_at FROM game_data WHERE student_idx = :studentIdx GROUP BY date(created_at) ORDER BY date(created_at) DESC LIMIT 7 ) AS t " +
            "ORDER BY dates ASC "
            , nativeQuery = true)
    List<Object[]> getDailyExp(@Param("studentIdx") Long studentIdx);
    //List<Object[]> findTopStudents();
}
