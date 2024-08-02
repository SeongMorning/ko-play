package com.edu.koplay.model;

import lombok.Data;
import jakarta.persistence.*;

import java.util.Date;

@Data
@Entity
public class StudentUsableAvatar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long studentUsableAvatarIdx;

    @ManyToOne
    @JoinColumn(name = "student_idx", nullable = false)
    private Student student;

    @ManyToOne
    @JoinColumn(name = "avatar_idx", nullable = false)
    private Avatar avatar;

    @ManyToOne
    @JoinColumn(name = "nation_idx", nullable = false)
    private Nation nation;

    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt;

    @Column(nullable = false)
    private Boolean currentUse = false;

    private Date updateDate;
}

