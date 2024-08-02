package com.edu.koplay.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class RecommendLevel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long levelIdx;

    @ManyToOne
    @JoinColumn(name = "student_idx", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "parent_idx", nullable = false)
    private Parent parent;

    @Column(nullable = false)
    private Integer levelSpeech;

    @Column(nullable = false)
    private Integer levelReading;

    @Column(nullable = false)
    private Integer levelListening;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Builder.Default
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt = new Date();
}
