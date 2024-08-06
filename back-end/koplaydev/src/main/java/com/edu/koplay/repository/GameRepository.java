package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import com.edu.koplay.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Game;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface GameRepository extends JpaRepository<Game, Long> {
    Optional<List<Game>> findByIsRankFalse();

    Optional<List<Game>> findByIsRankTrue();

    Optional<Game> findByGameIdx(Long gameIdx);

//    @Query(value = "SELECT DATE(gd.created_at), SUM(gd.correct), gp.game_purpose, gd.game_level " +
//            "FROM koplay.game_data gd " +
//            "JOIN koplay.game g ON gd.game_idx = g.game_idx " +
//            "JOIN koplay.game_purpose gp ON g.game_idx = gp.game_idx " +
//            "WHERE gd.student_idx = :studentIdx "
//            +
//            "GROUP BY DATE(gd.created_at), gp.game_purpose "
//            +
//            "ORDER BY DATE(gd.created_at) ASC"
//            ,nativeQuery = true)
//    List<Object[]> findCorrectGameDataGroupedByDateAndPurpose(@Param("studentIdx") Long studentIdx);
//
//    @Query(value = "SELECT DATE(gd.created_at), SUM(gd.total_question), gp.game_purpose, gd.game_level " +
//            "FROM koplay.game_data gd " +
//            "JOIN koplay.game g ON gd.game_idx = g.game_idx " +
//            "JOIN koplay.game_purpose gp ON g.game_idx = gp.game_idx " +
//            "WHERE gd.student_idx = :studentIdx "
//            +
//            "GROUP BY DATE(gd.created_at), gp.game_purpose "
//            +
//            "ORDER BY DATE(gd.created_at) ASC"
//            ,nativeQuery = true)
//    List<Object[]> findTotalQuestionGameDataGroupedByDateAndPurpose(@Param("studentIdx") Long studentIdx);

    @Query(value = "SELECT DATE(gd.created_at), SUM(gd.total_question), SUM(gd.correct),gp.game_purpose, gd.game_level " +
            "FROM koplay.game_data gd " +
            "JOIN koplay.game g ON gd.game_idx = g.game_idx " +
            "JOIN koplay.game_purpose gp ON g.game_idx = gp.game_idx " +
            "WHERE gd.student_idx = :studentIdx "
            +"AND gd.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) " +
            "GROUP BY DATE(gd.created_at), gp.game_purpose, gd.game_level "
            +
            "ORDER BY DATE(gd.created_at) DESC "
            ,nativeQuery = true)
    List<Object[]> findDailyResult(@Param("studentIdx") Long studentIdx);

    @Query(value = "SELECT count(gd.created_at) as \"gameCount\", game_purpose "+
            "FROM koplay.game_data gd " +
            "JOIN koplay.game g ON gd.game_idx = g.game_idx "+
            "JOIN koplay.game_purpose gp ON g.game_idx = gp.game_idx "+
            "WHERE gd.student_idx = :studentIdx " +
            "GROUP BY gp.game_purpose "
            ,nativeQuery = true)
    List<Object[]> findGameCountPerPurpose(@Param("studentIdx") Long studentIdx);


    @Query(value = "SELECT DATE_FORMAT(gd.created_at, '%Y-%m-%d %H:%i') AS date, gd.correct AS correct, gd.total_question AS question, gp.game_purpose, gd.game_level "+
            "FROM koplay.game_data gd JOIN game g ON gd.game_idx = g.game_idx "+
            "JOIN koplay.game_purpose gp ON g.game_idx = gp.game_idx "+
            "where koplay.gd.student_idx = :studentIdx "+
            "GROUP BY DATE_FORMAT(gd.created_at, '%Y-%m-%d %H:%i'), gp.game_purpose, gd.game_level, gd.correct, gd.total_question "+
            "ORDER BY DATE_FORMAT(gd.created_at, '%Y-%m-%d %H:%i') Desc " +
            "LIMIT 20 "
            ,nativeQuery = true)
    List<Object[]> findDailySpecific(@Param("studentIdx") Long studentIdx);

    @Query(value="SELECT DATE(gd.created_at), SUM(gd.correct) AS correct, SUM(gd.total_question) AS question, gp.game_purpose " +
            "FROM koplay.game_data gd JOIN koplay.game g ON gd.game_idx = g.game_idx JOIN koplay.game_purpose gp ON g.game_idx = gp.game_idx " +
            "WHERE gd.created_at >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) "+
            "GROUP BY DATE(gd.created_at),gp.game_purpose " +
            "ORDER BY date(gd.created_at) desc "
            , nativeQuery = true)
    List<Object[]> findAllAveragePerPurpose();
}
