package com.edu.koplay.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import jakarta.persistence.*;
import lombok.NoArgsConstructor;

import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
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

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Builder.Default
    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    private Date createdAt = new Date();

    @Builder.Default
    @Column(nullable = false)
    private Boolean currentUse = false;

    private Date updateDate;
}

