package com.edu.koplay.controller.student;

import com.edu.koplay.dto.GallaryDTO;
import com.edu.koplay.dto.ParentDTO;
import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;


import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/students")
public class StudentController {
    @Autowired
    private StudentService studentService;

    @PostMapping("/signin")
    public Student signIn(@RequestBody Student student) {
        return studentService.signIn(student);
    }

    @GetMapping("/signout")
    public void signOut() {
        studentService.signOut();
    }

    @PutMapping("/info")
    public void updateStudentInfo(@RequestParam Long studentId, @RequestParam String nickname) {
        studentService.updateStudentInfo(studentId, nickname);
    }

    @GetMapping("/avatars") //자기꺼만 가져오는중
    public List<Avatar> getAvatars() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        //authentication.getName();
        return studentService.getAvatars(authentication.getName());
    }

    @PutMapping("/avatar")
    public void updateAvatar(@RequestParam Long studentId, @RequestBody Avatar avatar) {
        studentService.updateAvatar(studentId, avatar);
    }

    @GetMapping("/snapshots")
    public ResponseEntity<?> getSnapshots() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        List<Gallary> gallaries = studentService.getSnapshots(authentication.getName());

        try {

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<GallaryDTO> response = ResponseDTO.<GallaryDTO>builder().data(gallaries.stream()
                    .map(GallaryDTO::new)
                    .toList()).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<GallaryDTO> response = ResponseDTO.<GallaryDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }

    }

    @DeleteMapping("/snapshot/{snapshotId}")
    public void deleteSnapshot(@PathVariable Long snapshotId) {
        studentService.deleteSnapshot(snapshotId);
    }

    @GetMapping("/mypage")
    public String getMyPage(@RequestParam Long studentId) {
        return studentService.getMyPage(studentId);
    }

    @PostMapping("/avatar")
    public void addAvatar(@RequestParam Long studentId, @RequestBody Avatar avatar) {
        studentService.addAvatar(studentId, avatar);
    }
}
