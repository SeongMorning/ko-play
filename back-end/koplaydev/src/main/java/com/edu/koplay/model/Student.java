package com.edu.koplay.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
@Entity
public class Student {
    public Student(int studentIdx) {
        this.studentIdx = studentIdx;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int studentIdx;

    @ManyToOne
    @JoinColumn(name = "parent_idx", nullable = false)
    private Parent parent;

    @Column(nullable = false)
    private String studentId;

    @Column(nullable = false)
    private String studentPw;

    @Column(nullable = false)
    private String studentName;

    private String nickname;

    @Column(columnDefinition = "INT UNSIGNED DEFAULT 0")
    private Integer exp;

    @Column(nullable = false)
    private Date birth;

    @Lob
    private byte[] profileImg;

    private String schoolName;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    @Builder.Default
    private Date createdAt = new Date();

    private Date updateDate;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean visited = false;
}

