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
public class GamePurpose {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long gamePurposeIdx;

    @ManyToOne
    @JoinColumn(name = "game_idx", nullable = false)
    private Game game;

    private String gamePurpose;

}

