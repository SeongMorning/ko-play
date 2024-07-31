package com.edu.koplay.controller.parent;

import com.edu.koplay.dto.ParentDTO;
import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.dto.StudentLevelDTO;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.edu.koplay.service.parent.ParentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/parent")
public class ParentController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);

    private ParentService parentService;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public ParentController(ParentService parentService, PasswordEncoder passwordEncoder) {
        this.parentService = parentService;
        this.passwordEncoder = passwordEncoder;
    }

//    @PostMapping("/signin")
//    public Parent signIn(@RequestBody Parent parent) {
//        return parentService.signIn(parent);
//    }
//
//    @GetMapping("/signout")
//    public void signOut() {
//        parentService.signOut();
//    }

    @DeleteMapping("/")
    public ResponseEntity<?> quitParent() {
        try {
            String email = getAuthenticationData();
            parentService.deleteParent(email);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/nation")
    public ResponseEntity<?> changeNation(@RequestParam(name = "id") String nation) {
        try {
            String email = getAuthenticationData();
            logger.info("email: " + email);

            Parent entity = parentService.updateNation(email, nation);
            //자바 스트림을 이용하여 리턴된 엔티티 리스트를 TodoDTO리스트로 변환한다.

            ParentDTO dto = new ParentDTO(entity);

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/child")
    public ResponseEntity<?> addChild(@RequestBody StudentLevelDTO studentDto) {
        try {
            //authentication에서 email 추출
            String email = getAuthenticationData();
            logger.info("email: " + email);

            // 비밀번호 인코딩
            String encodedPassword = passwordEncoder.encode(studentDto.getPw());
            studentDto.setPw(encodedPassword);

            //학생, 추천레벨 초기 저장하기
            RecommendLevel savedStudentAndRecommendLevel = parentService.createChild(email, studentDto);
            //entity to dto
            StudentLevelDTO dto = new StudentLevelDTO(savedStudentAndRecommendLevel.getStudent(), savedStudentAndRecommendLevel);

            logger.debug(dto.toString());
            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화
            ResponseDTO<StudentLevelDTO> response = ResponseDTO.<StudentLevelDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<StudentLevelDTO> response = ResponseDTO.<StudentLevelDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/info")
    private ResponseEntity<?> getParentInfo() {
        try {
            String email = getAuthenticationData();
            Parent parent = parentService.selectParentInfoByEmail(email);

            ParentDTO dto = new ParentDTO(parent);

            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/child")
    public ResponseEntity<?> getChildren() {
        try {
            String email = getAuthenticationData();

            List<Student> students = parentService.selectStudents(email);

            List<StudentDTO> dtos = students.stream().map(StudentDTO::new).collect(Collectors.toList());

            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @DeleteMapping("/child/{studentId}")
    public ResponseEntity<?> removeChild(@PathVariable(name = "studentId") String studentId) {
        try {
//            return null;
            //부모 idx와 자식 아이디가 일치하는 컬럼 삭제하기.
            String email = getAuthenticationData();

            List<Student> students = parentService.deleteStudent(email, studentId);

            List<StudentDTO> dtos = students.stream().map(StudentDTO::new).collect(Collectors.toList());

            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            logger.info(e.getMessage());
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/child/{studentId}")
    public ResponseEntity<?> getChild(@PathVariable(name = "studentId") String studentId) {
        try {
            String email = getAuthenticationData();
            //select entity
            Student student = parentService.selectStudent(email, studentId);
            //entity to dto
            StudentDTO dto = new StudentDTO(student);
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            logger.info(e.getMessage());
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/child/{childId}/statistics")
    public String getChildStatistics(@PathVariable Long childId) {
        return parentService.getChildStatistics(childId);
    }

    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
}

