package com.edu.koplay.service.parent;

import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;
import java.util.List;

@Service
public class ParentService {
    @Autowired
    private ParentRepository parentRepository;

    @Autowired
    private StudentRepository studentRepository;

    public Parent signIn(Parent parent) {
        return parentRepository.save(parent);
    }

    public void signOut() {
        // 로그아웃 로직 구현
    }

    public Parent changeNation(String email, String nation) {
        Parent parent = parentRepository.findByParentEmail(email);
        parent.setNationality(nation);
        return parentRepository.save(parent);
    }

    public Parent createChild(Student student) {
        Parent parent = parentRepository.findById(student.getParent().getParentIdx()).orElseThrow();
        student.setParent(parent);
        studentRepository.save(student);
        return parentRepository.save(parent);
    }

    public Parent getParentInfo(Long parentId) {
        return parentRepository.findById(parentId).orElseThrow();
    }

    public List<Student> getChildren(Long parentId) {
        Parent parent = parentRepository.findById(parentId).orElseThrow();
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
