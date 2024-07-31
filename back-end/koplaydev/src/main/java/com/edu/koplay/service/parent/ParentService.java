package com.edu.koplay.service.parent;

import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.repository.RecommendLevelRepository;
import com.edu.koplay.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ParentService {
    private static final Logger logger = LoggerFactory.getLogger(ParentService.class);

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

        return studentRepository.findAllByParent(parent).orElseThrow();
    }

    public List<Student> deleteStudent(String email, String studentId) {
        //아이디로 정보 받아와서 삭제
        Parent parent = selectParentInfoByEmail(email);

        Optional<Student> student = studentRepository.findByStudentIdAndParent(studentId, parent);
        Student selectOneStudent = null;
        if (student.isPresent()) {
            selectOneStudent = student.get();
            // 나머지 로직
        } else {
            logger.error("학생 정보가 존재하지 않습니다: studentId=" + studentId + ", parent=" + parent);
            throw new IllegalArgumentException("해당 학생을 찾을 수 없습니다.");
        }

        selectOneStudent.setIsDeleted(true);

        logger.info("지영");

        return studentRepository.findAllByParent(parent).orElseThrow();
    }

    public Student selectStudent(String email, String studentId) {
//        Parent parent = selectParentInfoByEmail(email);
//
//        Optional<Student> student = studentRepository.findByStudentIdAndParent(studentId, parent);
//        Student selectOneStudent = null;
//        if (student.isPresent()) {
//            selectOneStudent = student.get();
//            // 나머지 로직
//        } else {
//            logger.error("학생 정보가 존재하지 않습니다: studentId=" + studentId + ", parent=" + parent);
//            throw new IllegalArgumentException("해당 학생을 찾을 수 없습니다.");
//        }
//        return studentRepository.findAllByParent(parent).orElseThrow();
        return null;
    }

    public String getChildStatistics(Long childId) {
        // 통계 조회 로직 구현
        return "Statistics for child " + childId;
    }
}
