package com.edu.koplay.dto;

import com.edu.koplay.model.StudentEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentDTO {
    private String id;
    private String password;

    public StudentDTO(final StudentEntity entity) {
        this.id = entity.getId();
        this.password = entity.getPassword();
    }

    public static StudentEntity toEntity(final StudentDTO dto) {
        return StudentEntity.builder()
                .id(dto.getId())
                .password(dto.getPassword())
                .build();
    }
}
