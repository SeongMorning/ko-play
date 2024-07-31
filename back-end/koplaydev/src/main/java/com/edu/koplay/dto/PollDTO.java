package com.edu.koplay.dto;

import com.edu.koplay.model.Parent;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class PollDTO {
    private int speechLevel;
    private int listeningLevel;
    private int readingLevel;

    public PollDTO(final RecommendLevel entity) {
        this.speechLevel = entity.getLevelSpeech();
        this.listeningLevel = entity.getLevelListening();
        this.readingLevel = entity.getLevelReading();
    }

    public static RecommendLevel toEntity(final PollDTO dto) {
        return RecommendLevel.builder()
                .levelSpeech(dto.getSpeechLevel())
                .levelListening(dto.getListeningLevel())
                .levelReading(dto.getReadingLevel())
                .build();
    }
}
