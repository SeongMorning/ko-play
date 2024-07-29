package com.edu.koplay.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Column(nullable = false)
    private String studentName;

    @Column(nullable = false, columnDefinition = "VARCHAR(255) DEFAULT '닉네임'")
    private String nickname;

    @Column(columnDefinition = "INT UNSIGNED DEFAULT 0")
    private Integer exp;

    @Column(nullable = false)
    private LocalDate birth;

    @Lob
    private byte[] profileImg;

    private String schoolName;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    private Date updateDate;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean visited = false;
}

