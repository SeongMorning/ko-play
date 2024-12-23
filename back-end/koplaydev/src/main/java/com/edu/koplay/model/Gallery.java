package com.edu.koplay.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Gallery {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long galleryIdx;

    @ManyToOne
    @JoinColumn(name = "student_idx", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "parent_idx", nullable = false)
    private Parent parent;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Builder.Default
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt = new Date();;

    @Column(nullable = true)
    private String snapshot; //snapshot url


}

