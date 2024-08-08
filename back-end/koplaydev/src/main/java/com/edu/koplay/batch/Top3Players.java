package com.edu.koplay.batch;

import com.edu.koplay.dto.StudentDTO;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;
@Data
public class Top3Players {
    private StudentDTO student;
    private Long gameCount;

    // Static method to get the list of top players
    // Static list to hold the top 3 players


    public Top3Players(StudentDTO student, Long gameCount) {
        this.student = student;
        this.gameCount = gameCount;
    }




}
