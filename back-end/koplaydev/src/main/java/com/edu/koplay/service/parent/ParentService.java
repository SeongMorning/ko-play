package com.edu.koplay.service.parent;

import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.repository.RecommendLevelRepository;
import com.edu.koplay.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;
import java.util.List;

@Service
@Transactional
public class ParentService {

    private ParentRepository parentRepository;
    private RecommendLevelRepository recommendLevelRepository;
    private StudentRepository studentRepository;

    @Autowired
    public ParentService(ParentRepository parentRepository, RecommendLevelRepository recommendLevelRepository, StudentRepository studentRepository) {
        this.parentRepository = parentRepository;
        this.recommendLevelRepository = recommendLevelRepository;
        this.studentRepository = studentRepository;
    }

    public Parent signIn(Parent parent) {
        return parentRepository.save(parent);
    }

    public void signOut() {
        // 로그아웃 로직 구현
    }

    public Parent updateNation(String email, String nation) {
        Parent parent = selectParentInfoByEmail(email);
        parent.setNationality(nation);
        return parentRepository.save(parent);
    }

    /**
     * 부모가 child 생성 시 child 계정, 추천레벨 insert
     * @author 허지영
     * @param email
     * @param studentDto
     * @return
     */
    public RecommendLevel createChild(String email, StudentLevelDTO studentDto) {
        //email으로 parent pk 조회
        Parent parent = selectParentInfoByEmail(email);

        //dto entity로 변환하기
        Student student = Student.builder()
                .parent(parent)
                .studentId(studentDto.getId())
                .studentPw(studentDto.getPw())
                .studentName(studentDto.getName())
                .birth(studentDto.getBirth())
                .build();
        RecommendLevel level = RecommendLevel.builder()
                .parent(parent)
                //학생은 저장한 후에 pk까지 가지고 넣어줄것.
                .levelListening(studentDto.getListeningLevel())
                .levelSpeech(studentDto.getSpeechLevel())
                .levelReading(studentDto.getReadingLevel())
                .build();

        //student 저장
        Student saveStudent = studentRepository.save(student);
        //저장된 student정보 level값에 담기
        level.setStudent(saveStudent);
        //level 저장
        return recommendLevelRepository.save(level);
    }

    public Parent selectParentInfoByEmail(String email) {
        return parentRepository.findByParentEmail(email).orElseThrow();
    }

    public List<Student> selectChildren(String email) {
        Parent parent = selectParentInfoByEmail(email);

        return studentRepository.findAllByParent(parent);
    }

    public void deleteChild(Long childId) {
        Student student = studentRepository.findById(childId).orElseThrow();
        student.setIsDeleted(true);
        studentRepository.save(student);
    }

    public Student getChild(Long childId) {
        return studentRepository.findById(childId).orElseThrow();
    }

    public String getChildStatistics(Long childId) {
        // 통계 조회 로직 구현
        return "Statistics for child " + childId;
    }
}
