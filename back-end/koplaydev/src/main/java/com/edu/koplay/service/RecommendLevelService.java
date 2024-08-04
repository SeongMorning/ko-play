package com.edu.koplay.service;

import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.RecommendLevelRepository;
import org.springframework.stereotype.Service;

@Service
public class RecommendLevelService {
    private RecommendLevelRepository recommendLevelRepository;

    public RecommendLevelService(RecommendLevelRepository recommendLevelRepository) {
        this.recommendLevelRepository = recommendLevelRepository;
    }

    public RecommendLevel insertRecommendLevel(Parent parent, StudentLevelDTO studentDto, Student student) {
        RecommendLevel level = RecommendLevel.builder()
                //학생은 저장한 후에 pk까지 가지고 넣어줄것.
                .levelListening(studentDto.getListeningLevel())
                .levelSpeech(studentDto.getSpeechLevel())
                .levelReading(studentDto.getReadingLevel())
                .build();
        //저장된 student정보 level값에 담기
        level.setStudent(student);
        //level 저장
        return recommendLevelRepository.save(level);
    }

    public RecommendLevel getStudentLevel(Student entity) {
        return recommendLevelRepository.findAllByStudent(entity);
    }
}
