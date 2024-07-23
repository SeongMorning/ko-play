package com.edu.koplay.service.student;

import com.edu.koplay.repository.AvatarRepository;
import com.edu.koplay.repository.GallaryRepository;
import com.edu.koplay.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;
import java.util.List;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AvatarRepository avatarRepository;

    @Autowired
    private GallaryRepository gallaryRepository;

    public Student signIn(Student student) {
        return studentRepository.save(student);
    }

    public void signOut() {
        // 로그아웃 로직 구현
    }

    public void updateStudentInfo(Long studentId, String nickname) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        student.setNickname(nickname);
        studentRepository.save(student);
    }

    public List<Avatar> getAvatars(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        return avatarRepository.findAllByStudent(student);
    }

    public void updateAvatar(Long studentId, Avatar avatar) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        //avatar.setStudent(student);
        avatarRepository.save(avatar);
    }

    public List<Gallary> getSnapshots(Long studentId) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        return gallaryRepository.findAllByStudent(student);
    }

    public void deleteSnapshot(Long snapshotId) {
        Gallary gallary = gallaryRepository.findById(snapshotId).orElseThrow();
        gallary.setIsDeleted(true);
        gallaryRepository.save(gallary);
    }

    public String getMyPage(Long studentId) {
        // 통계 조회 로직 구현
        return "My page for student " + studentId;
    }

    public void addAvatar(Long studentId, Avatar avatar) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        //avatar.setStudent(student);
        avatarRepository.save(avatar);
    }
}
