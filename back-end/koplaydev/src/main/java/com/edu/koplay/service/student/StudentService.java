package com.edu.koplay.service.student;

import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.repository.AvatarRepository;
import com.edu.koplay.repository.GalleryRepository;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.repository.StudentUsableAvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;
import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    private StudentRepository studentRepository;
    private AvatarRepository avatarRepository;
    private GalleryRepository galleryRepository;
    private PasswordEncoder passwordEncoder;
    private StudentUsableAvatarRepository suar;
    @Autowired
    public StudentService(StudentRepository studentRepository, AvatarRepository avatarRepository, GalleryRepository galleryRepository, PasswordEncoder passwordEncoder, StudentUsableAvatarRepository suar) {
        this.studentRepository = studentRepository;
        this.avatarRepository = avatarRepository;
        this.galleryRepository = galleryRepository;
        this.passwordEncoder = passwordEncoder;
        this.suar = suar;
    }

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
        return suar.findAllByStudent(student);
    }

    public void updateAvatar(Long studentId, Avatar avatar) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        //avatar.setStudent(student);
        avatarRepository.save(avatar);
    }
    //studentid
    public List<Gallery> getSnapshots(String studentId) {

        Student student = studentRepository.findByStudentIdAndIsDeletedFalse(studentId).orElseThrow();


        return galleryRepository.findAllByStudentAndIsDeletedFalse(student);
    }

    public void deleteSnapshot(Long snapshotId, Student me) {
        Optional<Gallery> gallery = galleryRepository.findByGalleryIdxAndStudentAndIsDeletedFalse(snapshotId, me);
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

    public Student updateStudentInfo(StudentDTO student) {
        Student st = studentRepository.findByStudentIdAndIsDeletedFalse(student.getId()).orElseThrow();
        // 비밀번호 인코딩

        String encodedPassword = passwordEncoder.encode(student.getPw());
        st.setStudentPw(encodedPassword);
        st.setNickname(student.getNickname());
        st.setProfileImg(student.getProfileImg());
        st.setSchoolName(student.getSchoolName());
        //studentRepository.save(st);
        return st;
    }
}
