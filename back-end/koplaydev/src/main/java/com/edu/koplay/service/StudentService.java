package com.edu.koplay.service;

import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.AvatarRepository;
import com.edu.koplay.repository.GalleryRepository;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.repository.StudentUsableAvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class StudentService {

    private final StudentUsableAvatarRepository studentUsableAvatarRepository;
    private StudentRepository studentRepository;
    private AvatarRepository avatarRepository;
    private GalleryRepository galleryRepository;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public StudentService(StudentRepository studentRepository, AvatarRepository avatarRepository, GalleryRepository galleryRepository, PasswordEncoder passwordEncoder, StudentUsableAvatarRepository suar, StudentUsableAvatarRepository studentUsableAvatarRepository) {
        this.studentRepository = studentRepository;
        this.avatarRepository = avatarRepository;
        this.galleryRepository = galleryRepository;
        this.passwordEncoder = passwordEncoder;

        this.studentUsableAvatarRepository = studentUsableAvatarRepository;
    }

    public Student signIn(Student student) {
        return studentRepository.save(student);
    }

    public void signOut() {
        // 로그아웃 로직 구현
    }

    public Student insertStudent(Parent parent, StudentLevelDTO studentDto) {
        //dto entity로 변환하기
        Student student = Student.builder()
                .parent(parent)
                .studentId(studentDto.getId())
                .studentPw(studentDto.getPw())
                .studentName(studentDto.getName())
                .birth(studentDto.getBirth())
                .build();
        //student 저장
        return studentRepository.save(student);
    }

    public List<Student> selectStudents(Parent parent) {
        return studentRepository.findAllByParentAndIsDeletedFalse(parent).orElseThrow(() -> new NoSuchElementException("없는 자녀회원 입니다..."));
    }

    public Student selectOneStudentByParent(Parent parent, String studentId) {
        return studentRepository.findByStudentIdAndParentAndIsDeletedFalse(studentId, parent)
                .orElseThrow(() -> new NoSuchElementException("없는 회원 입니다..."));
    }

    public List<Student> deleteStudent(Student student) {
        //삭제컬럼 업데이트
        student.setIsDeleted(true);

        return studentRepository.findAllByParentAndIsDeletedFalse(student.getParent()).orElseThrow(() -> new NoSuchElementException("없는 회원 입니다..."));
    }


//    public String getMyPage(Long studentId) {
//        // 통계 조회 로직 구현
//        return "My page for student " + studentId;
//    }

    public Student updateStudentInfo(Student beforeStudent, StudentDTO student) {
        if (student.getPw() != null) {
            String encodedPassword = passwordEncoder.encode(student.getPw());
            beforeStudent.setStudentPw(encodedPassword);
        }
        if (student.getNickname() != null) {
            beforeStudent.setNickname(student.getNickname());
        }
        if (student.getProfileImg() != null) {
            beforeStudent.setProfileImg(student.getProfileImg());
        }
        if (student.getSchoolName() != null) {
            beforeStudent.setSchoolName(student.getSchoolName());
        }
        if (student.isVisited()) {
            beforeStudent.setVisited(student.isVisited());
        }
        return beforeStudent;
    }

    public Student updateStudentExp(String id, int gainedExp) {
        //학생 entity조회
        Student student = selectOneStudent(id);
        //경험치 업데이트
        student.setExp(student.getExp() + gainedExp);
        return student;
    }

    public Student selectOneStudent(String id) {
        return studentRepository.findByStudentIdAndIsDeletedFalse(id).orElseThrow(() -> new NoSuchElementException("해당 회원은 존재하지 않습니다."));
    }
}
