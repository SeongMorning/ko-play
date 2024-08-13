package com.edu.koplay.controller.parent;

import com.edu.koplay.dto.*;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.service.StudentService;
import com.edu.koplay.service.facade.GameFacadeService;
import com.edu.koplay.service.facade.ParentFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/parent")
public class ParentController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);
    private final StudentService studentService;
    private final GameFacadeService gameFacadeService;

    private ParentFacadeService parentService;
    private PasswordEncoder passwordEncoder;

    public ParentController(ParentFacadeService parentFacadeService, PasswordEncoder passwordEncoder, StudentService studentService, GameFacadeService gameFacadeService) {
        this.parentService = parentFacadeService;
        this.passwordEncoder = passwordEncoder;
        this.studentService = studentService;
        this.gameFacadeService = gameFacadeService;
    }

    @DeleteMapping("/")
    public ResponseEntity<?> WithdrawalParent() {
        try {
            String email = getAuthenticationData();
            parentService.WithdrawalParent(email);

            return ResponseEntity.ok().build();
        } catch (Exception e) {
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/nation")
    public ResponseEntity<?> changeNation(@RequestParam(name = "nation") String nation) {
        try {
            String email = getAuthenticationData();
            logger.info("email: " + email);

            Parent entity = parentService.changeNation(email, nation);
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
    public ResponseEntity<?> addChild(@RequestBody StudentLevelDTO studentDTO) {
        try {
            //authentication에서 email 추출
            String email = getAuthenticationData();
            logger.debug("email: " + email);

            // 비밀번호 인코딩
            String encodedPassword = passwordEncoder.encode(studentDTO.getPw());
            studentDTO.setPw(encodedPassword);

            RecommendLevel savedStudentAndRecommendLevel = parentService.addChild(email, studentDTO);

            if(savedStudentAndRecommendLevel == null){
                ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error("이미 있는 아이디입니다.").build();
                return ResponseEntity.badRequest().body(response);
            }
            //entity to dto
            StudentDTO dto = new StudentDTO(savedStudentAndRecommendLevel.getStudent(), savedStudentAndRecommendLevel);

            logger.debug(dto.toString());
            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/info")
    private ResponseEntity<?> getParentInfo() {
        try {
            String email = getAuthenticationData();

            Parent parent = parentService.getParentInfo(email);

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

            //학생조회
            List<Student> students = parentService.getChildren(email);

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
            //부모 idx와 자식 아이디가 일치하는 컬럼 삭제하기.
            String email = getAuthenticationData();

            List<Student> students = parentService.removeChild(email, studentId);

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

            //자식객체가져와서 리턴
            Student student = parentService.getChild(email, studentId);

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
    @PutMapping("/visit")
    public ResponseEntity<?> putVisited() {
        try {
            String email = getAuthenticationData();
            Parent p = parentService.updateParentVisited(email);
            ParentDTO dto = new ParentDTO(p);
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            logger.info(e.getMessage());
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
    @GetMapping("/child/{childId}/statistics")
    public ResponseEntity<?> getChildStatistics(@PathVariable(name = "childId") String childId) {

        try{
            String email = getAuthenticationData();
            //학생조회

            Student student = studentService.selectOneStudent(childId);

            List<Object[]> dailyResult = gameFacadeService.findDailyResult(student.getStudentIdx());
            List<GameCorrectDTO> res = new ArrayList<>();
            //logger.info(correctGameDataGroupedByDateAndPurpose.toString());
            for (Object[] result : dailyResult) {
                // Extract values based on index
                Date date = (Date) result[0];
                int totalQuestion = ((Number) result[1]).intValue();
                int correctAnswer = ((Number) result[2]).intValue();
                String gamePurpose = (String) result[3];
                int level = ((Number) result[4]).intValue();

                // Create a new DTO and add it to the list
                GameCorrectDTO gameResultDTO = new GameCorrectDTO(date, totalQuestion, correctAnswer,gamePurpose, level);
                res.add(gameResultDTO);
                //System.out.println("gameres" + gameResultDTO.toString());
            }


            //목적별 판수
            List<Object[]> gameCountPerPurpose = gameFacadeService.findGameCountPerPurpose(student.getStudentIdx());
            List<GameCountPerPurposeDTO> res2 = new ArrayList<>();
            //logger.info(correctGameDataGroupedByDateAndPurpose.toString());
            for (Object[] result : gameCountPerPurpose) {
                // Extract values based on index

                int count = ((Number) result[0]).intValue();
                String gamePurpose = (String) result[1];

                // Create a new DTO and add it to the list
                GameCountPerPurposeDTO gameResultDTO = new GameCountPerPurposeDTO(count, gamePurpose);
                res2.add(gameResultDTO);
                //System.out.println("gameres" + gameResultDTO.toString());
            }

            List<Object[]> findAllAveragePerPurpose = gameFacadeService.findAllAveragePerPurpose();
            List<AllAveragePerPurposeDTO> res4 = new ArrayList<>();
            //logger.info(correctGameDataGroupedByDateAndPurpose.toString());
            for (Object[] result : findAllAveragePerPurpose) {
                // Extract values based on index
                Date date = (Date) result[0];
                int count = ((Number) result[1]).intValue();
                int total = ((Number) result[2]).intValue();
                String gamePurpose = (String) result[3];

                // Create a new DTO and add it to the list
                AllAveragePerPurposeDTO allAveragePerPurposeDTO = new AllAveragePerPurposeDTO(date, count,total, gamePurpose);
                res4.add(allAveragePerPurposeDTO);
                //System.out.println("gameres" + gameResultDTO.toString());
            }


            List<Object> res3 = new ArrayList<>();
            res3.add(res);
            res3.add(res2);
            res3.add(res4);
            return ResponseEntity.ok().body(res3);
        }catch (Exception e){
            logger.info(e.getMessage());
            ResponseDTO<GameCountPerPurposeDTO> response = ResponseDTO.<GameCountPerPurposeDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }


    }

    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
}

