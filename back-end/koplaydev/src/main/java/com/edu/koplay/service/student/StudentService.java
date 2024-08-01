package com.edu.koplay.service.student;

import com.edu.koplay.repository.AvatarRepository;
import com.edu.koplay.repository.GalleryRepository;
import com.edu.koplay.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AvatarRepository avatarRepository;

    @Autowired
    private GalleryRepository galleryRepository;

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

    public List<Avatar> getAvatars(String studentId) {
        Student student = studentRepository.findByStudentIdAndIsDeletedFalse(studentId).orElseThrow();
        return avatarRepository.findAllByStudent(student);
    }

    public void updateAvatar(Long studentId, Avatar avatar) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        //avatar.setStudent(student);
        avatarRepository.save(avatar);
    }
    //studentid
    public List<Gallery> getSnapshots(String studentId) {
        System.out.println("**************************************"+studentId);
        Student student = studentRepository.findByStudentIdAndIsDeletedFalse(studentId).orElseThrow();


        return galleryRepository.findAllByStudentAndIsDeletedFalse(student);
    }

    public void deleteSnapshot(Long snapshotId, Student me) {
        Optional<Gallery> gallery = galleryRepository.findByGalleryIdxAndStudentAndIsDeletedFalse(snapshotId, me);
        //System.out.println("!!!!!!!!!!!!!!"+me.getStudentIdx());
        gallery.get().setIsDeleted(true);
        galleryRepository.save(gallery.get());
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
