package com.edu.koplay.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
public class Gallary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long galleryIdx;

    @ManyToOne
    @JoinColumn(name = "student_idx", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "parent_idx", nullable = false)
    private Parent parent;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;
}

