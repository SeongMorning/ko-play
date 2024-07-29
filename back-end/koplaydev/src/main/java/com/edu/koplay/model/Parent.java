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
public class Parent {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long parentIdx;

    @Column(nullable = false)
    private String parentEmail;

    @Column(nullable = false)
    private String parentName;

    @Column(nullable = false)
    private String provider;

    private String nationality;

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean isDeleted = false;

    @Column(nullable = false, updatable = false, columnDefinition = "DATETIME DEFAULT CURRENT_TIMESTAMP")
    @Temporal(TemporalType.TIMESTAMP)
    private Date createdAt = new Date();

    @Builder.Default
    @Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT FALSE")
    private Boolean visited = false;
}