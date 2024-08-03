package com.edu.koplay.service;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Nation;
import com.edu.koplay.model.Student;
import com.edu.koplay.model.StudentUsableAvatar;
import com.edu.koplay.repository.StudentUsableAvatarRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudentUsableAvatarService {
    Logger logger = LoggerFactory.getLogger(StudentUsableAvatarService.class);

    private StudentUsableAvatarRepository studentUsableAvatarRepository;

    public StudentUsableAvatarService(StudentUsableAvatarRepository studentUsableAvatarRepository) {
        this.studentUsableAvatarRepository = studentUsableAvatarRepository;
    }

    public List<StudentUsableAvatar> selectAvatarsByStudent(Student student) {
        return studentUsableAvatarRepository.findAllByStudent(student).orElseThrow(()-> new NoSuchElementException("이 학생은 코스튬이 하나도 없어요"));
    }

    public StudentUsableAvatar selectAvatarByAvatarIdx(Student student, Avatar avatar) {
        return studentUsableAvatarRepository.findByAvatarAndStudent(student, avatar).orElseThrow(()-> new NoSuchElementException("이 학생은 코스튬이 하나도 없어요"));
    }

    public List<StudentUsableAvatar> updateAvatar(Student student, Avatar beforeAvatar, Avatar afterAvatar) {
        //만약 적용버튼 누르면 기존꺼를 true -> false
        StudentUsableAvatar before = selectAvatarByAvatarIdx(student, beforeAvatar);
        before.setCurrentUse(false);
        //들어온 아바타를 false -> true
        StudentUsableAvatar after = selectAvatarByAvatarIdx(student, afterAvatar);
        after.setCurrentUse(true);

        return studentUsableAvatarRepository.findAll();
    }

    public List<StudentUsableAvatar> insertUsableAvatar(Student student, Nation nation, Avatar avatar) {
        StudentUsableAvatar studentUsableAvatar = StudentUsableAvatar.builder().avatar(avatar).student(student).nation(nation).build();
        logger.info(studentUsableAvatar.toString());
        studentUsableAvatarRepository.save(studentUsableAvatar);
        return selectAvatarsByStudent(student);
    }

}
