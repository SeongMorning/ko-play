package com.edu.koplay.controller.student;

import com.edu.koplay.controller.parent.ParentController;
import com.edu.koplay.dto.*;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.repository.StudentUsableAvatarRepository;
import com.edu.koplay.security.jwt.JwtUtil;
import com.edu.koplay.service.Avatar.AvatarService;
import com.edu.koplay.service.student.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/students")
public class StudentController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);

    @Autowired
    private StudentService studentService;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private AvatarService avatarService;
    @Autowired
    private StudentUsableAvatarRepository studentUsableAvatarRepository;

    @PostMapping("/signin")
    public Student signIn(@RequestBody Student student) {
        return studentService.signIn(student);
    }

    @GetMapping("/signout")
    public void signOut() {
        studentService.signOut();
    }

    @PutMapping("/info") //학생 개인정보 변경
    public ResponseEntity<?> updateStudentInfo( @RequestBody StudentDTO student ) {
        //내 email 조희
        try {

            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Student entity = null;
            if (Objects.equals(authentication.getName(), student.getId())) {
                entity =  studentService.updateStudentInfo(student);
            }


            assert entity != null;
            StudentDTO dto = new StudentDTO(entity);

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);


        }catch (Exception e){
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
        // 바꾸기
        //studentService.updateStudentInfo(studentId, nickname);
    }

    @GetMapping("/avatars") //자신의 아바타를 가져옴
    public ResponseEntity<?> getAvatars() {
        try{
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            //authentication.getName();
            List<Avatar> avatars = studentService.getAvatars(authentication.getName());
            List<AvatarDTO> dtos = avatars.stream().map(AvatarDTO::new).collect(Collectors.toList());
            ResponseDTO<AvatarDTO> response = ResponseDTO.<AvatarDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        }catch(Exception e){
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PutMapping("/avatar") //사용하고 있는 아바타를 다른 아바타로 수정함
    public ResponseEntity<?> updateAvatar(@RequestBody ChangeAvatarDTO cad) {
        try{
            //사용자 얻어옴
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            //인가검사
            //??????????

            List<StudentUsableAvatar> studentUsableAvatars = studentService.updateAvatar(cad);
            //usable avatars 반환
            List<StudentUsableAvatarDTO> dtos = studentUsableAvatars.stream().map(StudentUsableAvatarDTO::new).toList();
            ResponseDTO<StudentUsableAvatarDTO> response = ResponseDTO.<StudentUsableAvatarDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        }catch (Exception e){
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }



    }

    @GetMapping("/snapshots")
    public ResponseEntity<?> getSnapshots() { //
        //사용자의 이름을 알아내는 함수
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<Gallery> galleries = studentService.getSnapshots(authentication.getName());
        try {

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<GalleryDTO> response = ResponseDTO.<GalleryDTO>builder().data(galleries.stream()
                    .map(GalleryDTO::new)
                    .toList()).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<GalleryDTO> response = ResponseDTO.<GalleryDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }

    }

    @DeleteMapping("/snapshot/{snapshotId}")
    public ResponseEntity<?> deleteSnapshot(@PathVariable Long snapshotId) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Student me = selectStudentInfoByEmail(authentication.getName());
            //현재 사용자것만 삭제가능해야함
            studentService.deleteSnapshot(snapshotId,me);
            List<Gallery> galleries = studentService.getSnapshots(authentication.getName());

            //남은 다른 data를 불러서 리턴
            ResponseDTO<GalleryDTO> response = ResponseDTO.<GalleryDTO>builder().data(galleries.stream()
                    .map(GalleryDTO::new)
                    .toList()).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            logger.info(e.getMessage());
            ResponseDTO<GalleryDTO> response = ResponseDTO.<GalleryDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }


    }

    public Student selectStudentInfoByEmail(String email) {
        return studentRepository.findByStudentIdAndIsDeletedFalse(email).orElseThrow(() -> new NoSuchElementException("없는 Student 회원 입니다..."));
    }

    @GetMapping("/mypage")
    public String getMyPage(@RequestParam Long studentId) {

        return studentService.getMyPage(studentId);
    }

    @PostMapping("/avatar")
    public ResponseEntity<?> addAvatar( @RequestBody String nation) { //아바타 추가 함수 => 현재는 블랙박스
        //
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            Student me = selectStudentInfoByEmail(authentication.getName());
            studentService.addAvatar(nation, me);
            List<StudentUsableAvatar> all = studentUsableAvatarRepository.findAll();
            List<StudentUsableAvatarDTO> dtos = all.stream().map(StudentUsableAvatarDTO::new).collect(Collectors.toList());
            ResponseDTO<StudentUsableAvatarDTO> response = ResponseDTO.<StudentUsableAvatarDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        }catch(Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }
}
