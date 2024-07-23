package com.edu.koplay.controller.student;

import com.edu.koplay.service.student.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;


import java.util.List;

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

    @GetMapping("/avatars")
    public List<Avatar> getAvatars(@RequestParam Long studentId) {
        return studentService.getAvatars(studentId);
    }

    @PutMapping("/avatar")
    public void updateAvatar(@RequestParam Long studentId, @RequestBody Avatar avatar) {
        studentService.updateAvatar(studentId, avatar);
    }

    @GetMapping("/snapshots")
    public List<Gallary> getSnapshots(@RequestParam Long studentId) {
        return studentService.getSnapshots(studentId);
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
