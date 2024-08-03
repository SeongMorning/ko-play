package com.edu.koplay.service;

import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@Transactional
public class ParentService {
    private static final Logger logger = LoggerFactory.getLogger(ParentService.class);

    private ParentRepository parentRepository;
    private StudentRepository studentRepository;

    @Autowired
    public ParentService(ParentRepository parentRepository, StudentRepository studentRepository) {
        this.parentRepository = parentRepository;
        this.studentRepository = studentRepository;
    }

    public Parent signIn(Parent parent) {
        return parentRepository.save(parent);
    }

    public void signOut() {
        // 로그아웃 로직 구현
    }

    public void deleteParent(String email) {
        Parent parent = selectParentInfoByEmail(email);
        parent.setIsDeleted(true);
    }

    ;


    public Parent updateNation(String email, String nation) {
        Parent parent = selectParentInfoByEmail(email);
        parent.setNationality(nation);
        return parentRepository.save(parent);
    }

    public Parent selectParentInfoByEmail(String email) {
        return parentRepository.findByParentEmail(email).orElseThrow(() -> new NoSuchElementException("없는 PARENT 회원 입니다..."));
    }

}
