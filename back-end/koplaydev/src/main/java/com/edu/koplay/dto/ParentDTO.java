package com.edu.koplay.dto;

import com.edu.koplay.model.Parent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ParentDTO {
    private String parentName;
    private String nationality;
    private Boolean visited;

    public ParentDTO(final Parent entity) {
        this.parentName = entity.getParentName();
        this.nationality = entity.getNationality();
        this.visited = entity.getVisited();
    }

    public static Parent toEntity(final ParentDTO dto) {
        return Parent.builder()
                .parentName(dto.getParentName())
                .nationality(dto.getNationality())
                .visited(dto.getVisited())
                .build();
    }
}
