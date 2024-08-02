package com.edu.koplay.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WordRequestDTO {
    private Long gameIdx;
    private int level;
    private int amount;
}
