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
            +
            "GROUP BY DATE(gd.created_at), gp.game_purpose, gd.game_level "
            +
            "ORDER BY DATE(gd.created_at) ASC"
            ,nativeQuery = true)
    List<Object[]> findDailyResult(@Param("studentIdx") Long studentIdx);
}
