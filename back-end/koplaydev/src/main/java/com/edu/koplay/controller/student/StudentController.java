package com.edu.koplay.controller.student;

import com.edu.koplay.controller.parent.ParentController;
import com.edu.koplay.dto.*;
import com.edu.koplay.model.Gallery;
import com.edu.koplay.model.GameData;
import com.edu.koplay.model.Student;
import com.edu.koplay.model.StudentUsableAvatar;
import com.edu.koplay.service.GameDataService;
import com.edu.koplay.service.facade.StudentFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class StudentController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);
    private final GameDataService gameDataService;
    private StudentFacadeService studentService;

    public StudentController(StudentFacadeService studentFacadeService, GameDataService gameDataService) {
        this.studentService = studentFacadeService;
        this.gameDataService = gameDataService;
    }

    @GetMapping("/info")
    public ResponseEntity<?> getStudentInfo() {
        //내 정보 조회
        try {
            String id = getAuthenticationData();
            //아이디로 정보조회 후 리턴
            Student entity = studentService.getStudentInfo(id);
            List<GameData> gameData = gameDataService.getStudentGameCount(entity);
            StudentDTO dto = new StudentDTO(entity);
            dto.setTotalGameCount(gameData.size());

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PutMapping("/info") //학생 개인정보 변경
    public ResponseEntity<?> updateStudentInfo(@RequestBody StudentDTO student) {
        //내 email 조희
        try {
            String id = getAuthenticationData();
            Student entity = studentService.updateStudentInfo(id, student);

            StudentDTO dto = new StudentDTO(entity);

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);


        } catch (Exception e) {
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
        // 바꾸기
        //studentService.updateStudentInfo(studentId, nickname);
    }

    @GetMapping("/avatars") //자신의 아바타를 가져옴
    public ResponseEntity<?> getAvatars() {
        try {
            String id = getAuthenticationData();

            //내가 가지고 있는 아바타 정보 조회
            List<StudentUsableAvatar> avatars = studentService.getAvatars(id);

            List<AvatarDTO> dtos = avatars.stream()
                    .map(avatar -> new AvatarDTO(avatar.getAvatar()))
                    .collect(Collectors.toList());
            ResponseDTO<AvatarDTO> response = ResponseDTO.<AvatarDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PutMapping("/avatar") //사용하고 있는 아바타를 다른 아바타로 수정함
    public ResponseEntity<?> updateAvatar(@RequestBody ChangeAvatarDTO cad) {
        try {
            String id = getAuthenticationData();

            List<StudentUsableAvatar> studentUsableAvatars = studentService.updateAvatar(id, cad.getBeforeAvatarIdx(), cad.getAfterAvatarIdx());

            List<StudentUsableAvatarDTO> dtos = studentUsableAvatars.stream().map(StudentUsableAvatarDTO::new).toList();
            ResponseDTO<StudentUsableAvatarDTO> response = ResponseDTO.<StudentUsableAvatarDTO>builder().data(dtos).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            ResponseDTO<Void> response = ResponseDTO.<Void>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }


    }

    @GetMapping("/snapshots")
    public ResponseEntity<?> getSnapshots() { //
        try {
            String id = getAuthenticationData();

            List<Gallery> galleries = studentService.getSnapshots(id);
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
            String id = getAuthenticationData();

            //현재 사용자것만 삭제가능해야함
            List<Gallery> galleries = studentService.deleteSnapshots(snapshotId, id);

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

    @GetMapping("/mypage")
    public String getMyPage(@RequestParam Long studentId) {
        //통계부분 아직 구현 전
        return null;
    }

    @PostMapping("/avatar")
    public ResponseEntity<?> addAvatar(@RequestParam(name = "countryName") String countryName) { //아바타 추가 함수 => 현재는 블랙박스
        try {
            String id = getAuthenticationData();

            List<StudentUsableAvatar> myAvatar = studentService.addAvatar(id, countryName);

            List<StudentUsableAvatarDTO> dtos = myAvatar.stream().map(StudentUsableAvatarDTO::new).collect(Collectors.toList());
            ResponseDTO<StudentUsableAvatarDTO> response = ResponseDTO.<StudentUsableAvatarDTO>builder().data(dtos).build();
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
}
