package com.edu.koplay.model;

import lombok.Data;
import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentIdx;

    @ManyToOne
    @JoinColumn(name = "parent_idx", nullable = false)
    private Parent parent;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String studentPw;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '닉네임'")
    private String nickname;

    @Column(columnDefinition = "INT UNSIGNED DEFAULT 0")
    private Integer exp;

    private LocalDate birth;

    @Lob
    private byte[] profileImg;

    private String schoolName;

    @Column(nullable = false)
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    private String studentName;

    private LocalDateTime updateDate;

    @Column(nullable = false)
    private Boolean visited = false;
}

