package com.edu.koplay.dto;

import com.edu.koplay.model.Student;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentMypageDTO {
    //purpose 별
        //총 개수
        //정답 개수
        //오답 개수
    private int readGames;
    private int speakGames;
    private int listenGames;

    private int readCorrect;
    private int readWrong;

    private int speakCorrect;
    private int speakWrong;

    private int listenCorrect;
    private int listenWrong;

    private List<Integer> exps = new ArrayList<>(); //일주일 exp
    private List<Date> dates = new ArrayList<>();



}
