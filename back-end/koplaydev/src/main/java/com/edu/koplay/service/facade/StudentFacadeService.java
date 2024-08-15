package com.edu.koplay.service.facade;

import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.model.*;
import com.edu.koplay.service.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Transactional
@Service
public class StudentFacadeService {
    Logger logger = LoggerFactory.getLogger(StudentFacadeService.class);
    private StudentService studentService;
    private AvatarService avatarService;
    private NationService nationService;
    private StudentUsableAvatarService studentUsableAvatarService;
    private GalleryService galleryService;



    public StudentFacadeService(StudentService studentService, AvatarService avatarService, NationService nationService, StudentUsableAvatarService studentUsableAvatarService, GalleryService galleryService) {
        this.studentService = studentService;
        this.avatarService = avatarService;
        this.nationService = nationService;
        this.studentUsableAvatarService = studentUsableAvatarService;
        this.galleryService = galleryService;

    }

    public Student getStudentInfo(String id) {
        return studentService.selectOneStudent(id);
    }

    public Student updateStudentInfo(String id, StudentDTO student) {
        Student beforeStudent = studentService.selectOneStudent(id);
        //업데이트한 student정보
        return studentService.updateStudentInfo(beforeStudent, student);
    }

    public List<StudentUsableAvatar> getAvatars(String id) {
        //학생조회
        Student student = studentService.selectOneStudent(id);
        return studentUsableAvatarService.selectAvatarsByStudent(student);
    }

    public List<StudentUsableAvatar> updateAvatar(String id, Long before, Long after) {
        //학생조회
        Student student = studentService.selectOneStudent(id);

        //받은 idx로 아바타 엔티티 가져오기
        Avatar beforeAvatar = avatarService.selectAvatarByAvatarIdx(before);
        Avatar afterAvatar = null;
        //0이면 착용해제
        if(after != 0){
            afterAvatar = avatarService.selectAvatarByAvatarIdx(after);
        }
        //아바타 업데이트 후 사용가능한 아바타 정보 반환
        return studentUsableAvatarService.updateAvatar(student, beforeAvatar, afterAvatar);
    }

    public List<Gallery> getSnapshots(String id) {
        //학생조회
        Student student = studentService.selectOneStudent(id);
        //학생이가지고있는 갤러리 조회
        return galleryService.getAllGallery(student);
    }

    public List<Gallery> deleteSnapshots(Long snapshotId, String id) {
        //학생조회
        Student student = studentService.selectOneStudent(id);

        return galleryService.deleteSnapshot(snapshotId, student);
    }

    public StudentUsableAvatar addAvatar(String id, String countryName) {
        //학생조회
        Student student = studentService.selectOneStudent(id);
        //추가하게될 국가 정보 받아오기
        Nation nation = nationService.selectNationByName(countryName);
        //새로 추가하게될 아바타 랜덤으로 가져오기
        Avatar avatar = avatarService.selectRandomAvatar(countryName, student.getStudentIdx());
//        System.out.println(avatar.toString());
        //해당아바타 usable 테이블에 isnert해주기
        studentUsableAvatarService.insertUsableAvatar(student, nation, avatar);
        return studentUsableAvatarService.selectAvatarByAvatarIdx(student, avatar);
    }
}
