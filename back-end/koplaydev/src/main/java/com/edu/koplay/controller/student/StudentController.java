package com.edu.koplay.controller.student;

import com.edu.koplay.controller.parent.ParentController;
import com.edu.koplay.dto.*;
import com.edu.koplay.model.*;
import com.edu.koplay.service.GameDataService;
import com.edu.koplay.service.GamePurposeService;
import com.edu.koplay.service.GameService;
import com.edu.koplay.service.RecommendLevelService;
import com.edu.koplay.service.facade.GameFacadeService;
import com.edu.koplay.service.facade.StudentFacadeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/students")
public class StudentController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);
    private final GameDataService gameDataService;
    private final RecommendLevelService recommendLevelService;
    private final GamePurposeService gamePurposeService;
    private final GameService gameService;
    private final GameFacadeService gameFacadeService;
    private StudentFacadeService studentService;

    public StudentController(StudentFacadeService studentFacadeService, GameDataService gameDataService, RecommendLevelService recommendLevelService, GamePurposeService gamePurposeService, GameService gameService, GameFacadeService gameFacadeService) {
        this.studentService = studentFacadeService;
        this.gameDataService = gameDataService;
        this.recommendLevelService = recommendLevelService;
        this.gamePurposeService = gamePurposeService;
        this.gameService = gameService;
        this.gameFacadeService = gameFacadeService;
    }

    @GetMapping("/info")
    public ResponseEntity<?> getStudentInfo() {
        //내 정보 조회
        try {
            String id = getAuthenticationData();
            //아이디로 정보조회 후 리턴
            Student entity = studentService.getStudentInfo(id);
            List<GameData> gameData = gameDataService.getStudentGameCount(entity);
            RecommendLevel recommendLevel = recommendLevelService.getStudentLevel(entity);

            StudentDTO dto = new StudentDTO(entity, recommendLevel);
            dto.setTotalGameCount(gameData.size());

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();
            return ResponseEntity.ok().body(response);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
        // 바꾸기
        //studentService.updateStudentInfo(studentId, nickname);
    }

    @PutMapping("/info/img") //학생 개인정보 변경
    public ResponseEntity<?> updateStudentProfileImgInfo(@RequestPart("file") MultipartFile multipartFile) {
        //내 email 조희
        try {
            String id = getAuthenticationData();
            StudentDTO student = new StudentDTO();

            // 파일 저장
            Resource resource = null;
            String path = "src/main/resources/static/uploads/";
            Path fileRoot = null;
            String fileName = null;
            if (multipartFile != null && multipartFile.getSize() > 0) {
                fileName = multipartFile.getOriginalFilename();
                File file = new File(path);
//                File file = new File(resource.getFile(), fileName);

                if (!file.exists()) {
                    // mkdir() 함수와 다른 점은 상위 디렉토리가 존재하지 않을 때 그것까지 생성
                    file.mkdirs();
                }

                fileRoot = Paths.get(path + fileName);
                Files.createDirectories(fileRoot.getParent());
                Files.write(fileRoot, multipartFile.getBytes());

                student.setProfileImg(path + fileName);
            }

            Student entity = studentService.updateStudentInfo(id, student);

            StudentDTO dto = new StudentDTO(entity);

            resource = new FileSystemResource(path + fileName);
//            return new ResponseEntity<>(resource, HttpStatus.OK);
//
//            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
//            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();
//            System.out.println(resource);
            return ResponseEntity.ok().body("/uploads/" + fileName);

        } catch (Exception e) {
            e.printStackTrace();
            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
        // 바꾸기
        //studentService.updateStudentInfo(studentId, nickname);
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
    public ResponseEntity<?> getMyPage(@RequestParam String studentId) {
        //통계부분 아직 구현 전
        try {
            Student student = studentService.getStudentInfo(studentId);
            Long studentIdx = student.getStudentIdx();
            String id = getAuthenticationData();
//            System.out.println("!!!!!!!!"+id);
            Student entity = studentService.getStudentInfo(id);
            List<GameData> myGames = gameDataService.getStudentGameCount(entity);
//            System.out.println("studentIdx"+studentIdx);
            //-- 정답률 --//
            List<Object[]> dailyResult = gameFacadeService.findDailyResult(studentIdx);
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
                GameCorrectDTO gameResultDTO = new GameCorrectDTO(date, totalQuestion, correctAnswer, gamePurpose, level);
                res.add(gameResultDTO);


                //System.out.println("gameres" + gameResultDTO.toString());
            }


            List<Object[]> dailyExp = gameFacadeService.getDailyExp(studentIdx);
            List<ExpDTO> res2 = new ArrayList<>();
            //logger.info(correctGameDataGroupedByDateAndPurpose.toString());
            for (Object[] result : dailyExp) {
                // Extract values based on index

                Date date = (Date) result[0];
                int exp = ((Number) result[1]).intValue();
                int accumSum = ((Number) result[2]).intValue();

                // Create a new DTO and add it to the list
                ExpDTO expDTO = new ExpDTO(date, exp, accumSum);
                res2.add(expDTO);

            }

            List<Object[]> dailySpecificRes = gameFacadeService.getDailySpecific(studentIdx);
            List<DailySpecificDTO> res4 = new ArrayList<>();
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            //logger.info(correctGameDataGroupedByDateAndPurpose.toString());
            for (Object[] result : dailySpecificRes) {
                // Extract values based on index

                Date date = dateFormat.parse((String) result[0]);
                int correct = ((Number) result[1]).intValue();
                int question = ((Number) result[2]).intValue();
                String gamePurpose = (String) result[3];
                int level = ((Number) result[4]).intValue();


                // Create a new DTO and add it to the list
                DailySpecificDTO dailySpecificDTO = new DailySpecificDTO(date, correct, question, gamePurpose, level);
                res4.add(dailySpecificDTO);
                //System.out.println("gameres" + gameResultDTO.toString());
            }

            ArrayList<Object> res3 = new ArrayList<>();
            res3.add(res);
            res3.add(res2);
            res3.add(res4);
            return ResponseEntity.ok().body(res3);
        } catch (Exception e) {
//            System.out.println(e.getMessage());
            ResponseDTO<GameCorrectDTO> response = ResponseDTO.<GameCorrectDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }

    }

    @PostMapping("/avatar")
    public ResponseEntity<?> addAvatar(@RequestParam(name = "countryName") String countryName) { //아바타 추가 함수 => 현재는 블랙박스
        try {
            String id = getAuthenticationData();

            StudentUsableAvatar myAvatar = studentService.addAvatar(id, countryName);
            StudentUsableAvatarDTO dto = new StudentUsableAvatarDTO(myAvatar);

            ResponseDTO<StudentUsableAvatarDTO> response = ResponseDTO.<StudentUsableAvatarDTO>builder().data(List.of(dto)).build();
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
