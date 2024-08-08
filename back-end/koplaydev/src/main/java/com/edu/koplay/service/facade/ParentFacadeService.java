package com.edu.koplay.service.facade;

import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.edu.koplay.service.ParentService;
import com.edu.koplay.service.RecommendLevelService;
import com.edu.koplay.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class ParentFacadeService {
    private ParentService parentService;
    private StudentService studentService;
    private RecommendLevelService recommendationLevelService;

    public ParentFacadeService(ParentService parentService, StudentService studentService, RecommendLevelService recommendationLevelService) {
        this.parentService = parentService;
        this.studentService = studentService;
        this.recommendationLevelService = recommendationLevelService;
    }

    public void WithdrawalParent(String email) {
        parentService.deleteParent(email);
    }

    public Parent changeNation(String email, String nation) {
        return parentService.updateNation(email, nation);
    }

    public RecommendLevel addChild(String email, StudentLevelDTO studentDTO) {
        //이메일정보로 부모 조회하기
        Parent parent = parentService.selectParentInfoByEmail(email);

        //학생, 추천레벨 초기 저장하기
        Student student = studentService.insertStudent(parent, studentDTO);
        return recommendationLevelService.insertRecommendLevel(parent, studentDTO, student);

    }
    public Parent updateParentVisited(String email) {
        Parent parent = parentService.selectParentInfoByEmail(email);
        parent.setVisited(true);
        return parent;
    }

    public Parent getParentInfo(String email) {
        return parentService.selectParentInfoByEmail(email);
    }

    public List<Student> getChildren(String email) {
        Parent parent = parentService.selectParentInfoByEmail(email);
        return studentService.selectStudents(parent);
    }

    public List<Student> removeChild(String email, String studentId) {
        //부모객체가져오기
        Parent parent = parentService.selectParentInfoByEmail(email);
        //자식객체가져오기
        Student student = studentService.selectOneStudentByParent(parent, studentId);
        //전체 자식 조회해서 리턴
        return studentService.deleteStudent(student);
    }

    public Student getChild(String email, String studentId) {
        //부모객체가져오기
        Parent parent = parentService.selectParentInfoByEmail(email);
        return studentService.selectOneStudentByParent(parent, studentId);
    }
}
