package com.edu.koplay.service;

import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.*;
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

    public RecommendLevel updateRecommendLevel(Student student, Game game, GameData data, GamePurpose purpose) {
        //gamepurpose gameIdx 로 purpose 조회하기.
        //perposeIdx 1:말,  2:읽, 3:듣
//        gameLevel;
        RecommendLevel level = recommendLevelRepository.findAllByStudent(student);

        //정답률 계산
        double percent = ((double) data.getCorrect() / data.getTotalQuestion()) * 100;
        if (percent >= 80) {
            //레벨 올리기
            if (purpose.getGamePurposeIdx() == 1) {
                if(level.getLevelSpeech() == 5) return level;
                level.setLevelSpeech(level.getLevelSpeech() + 1);
            } else if (purpose.getGamePurposeIdx() == 2) {
                if(level.getLevelReading() == 5) return level;
                level.setLevelReading(level.getLevelReading() + 1);
            } else if (purpose.getGamePurposeIdx() == 3) {
                if(level.getLevelListening() == 5) return level;
                level.setLevelListening(level.getLevelListening() + 1);
            }
        } else if (percent <= 40) {
            //레벨 내리기
            if (purpose.getGamePurposeIdx() == 1) {
                if(level.getLevelSpeech() == 1) return level;
                level.setLevelSpeech(level.getLevelSpeech() - 1);
            } else if (purpose.getGamePurposeIdx() == 2) {
                if(level.getLevelReading() == 1) return level;
                level.setLevelReading(level.getLevelReading() - 1);
            } else if (purpose.getGamePurposeIdx() == 3) {
                if(level.getLevelListening() == 1) return level;
                level.setLevelListening(level.getLevelListening() - 1);
            }
        }
        return level;
    }

    public RecommendLevel getStudentLevel(Student entity) {
        return recommendLevelRepository.findAllByStudent(entity);
    }
}
