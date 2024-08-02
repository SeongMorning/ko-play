package com.edu.koplay.service.student;

import com.edu.koplay.dto.ChangeAvatarDTO;
import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.repository.AvatarRepository;
import com.edu.koplay.repository.GalleryRepository;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.repository.StudentUsableAvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.edu.koplay.model.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Random;
import java.util.stream.Collectors;

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

    public void updateStudentInfo(Long studentId, String nickname) {
        Student student = studentRepository.findById(studentId).orElseThrow();
        student.setNickname(nickname);
        studentRepository.save(student);
    }

    public List<Avatar> getAvatars(String studentId) {
        Student student = studentRepository.findByStudentIdAndIsDeletedFalse(studentId).orElseThrow();
        Optional<List<StudentUsableAvatar>> allByStudent = studentUsableAvatarRepository.findAllByStudent(student);
        List<Avatar> avatars = new ArrayList<>();
        for(StudentUsableAvatar studentUsableAvatar : allByStudent.get()) {
            avatars.add(studentUsableAvatar.getAvatar());
        }
        return avatars;
    }

    public List<StudentUsableAvatar> updateAvatar(ChangeAvatarDTO cad) {
        //만약 적용버튼 누르면 기존꺼를 true -> false
        Optional<StudentUsableAvatar> before = studentUsableAvatarRepository.findById((long) cad.getBeforeAvatarIdx());
        before.get().setCurrentUse(false);
        //들어온 아바타를 false -> true
        Optional<StudentUsableAvatar> after = studentUsableAvatarRepository.findById((long) cad.getAfterAvatarIdx());
        before.get().setCurrentUse(true);
        //avatar.setStudent(student);
        return studentUsableAvatarRepository.findAll();
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

    public void addAvatar(String nation, Student me) {
        // 아바타 목록중 nation.equals (nation) 찾기
        Optional<List<StudentUsableAvatar>> usedAvatars = studentUsableAvatarRepository.findAllByStudent(me);

        List<Avatar> avatars = avatarRepository.findAvailableAvatarsByNationAndStudent(nation,me);
        // 랜덤으로 그중 아무거나(단, studentUsable에 없는 것으로) studentusableAvatars 에 추가
        Random random = new Random();
        int randomIndex = random.nextInt(avatars.size());
        Avatar selectedAvatar = avatars.get(randomIndex);
        StudentUsableAvatar suar = new StudentUsableAvatar();
        suar.setAvatar(selectedAvatar);
        suar.setStudent(me);
        suar.setNation(selectedAvatar.getNation());
        suar.setCurrentUse(false);
        suar.setIsDeleted(false);

        studentUsableAvatarRepository.save(suar);


        // return studentusableAvatars

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
