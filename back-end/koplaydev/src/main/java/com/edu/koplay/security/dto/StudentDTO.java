package com.edu.koplay.security.dto;

import com.edu.koplay.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentDTO {
    private String id;
    private String password;

    public StudentDTO(final Student entity) {
        this.id = entity.getStudentId();
        this.password = entity.getStudentPw();
    }

    public static Student toEntity(final StudentDTO dto) {
        return Student.builder()
                .studentId(dto.getId())
                .studentPw(dto.getPassword())
                .build();
    }
}
