package com.edu.koplay.controller.parent;

import com.edu.koplay.dto.ParentDTO;
import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.service.parent.ParentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/parent")
public class ParentController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);

    private ParentService parentService;

    @Autowired
    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/signin")
    public Parent signIn(@RequestBody Parent parent) {
        return parentService.signIn(parent);
    }

    @GetMapping("/signout")
    public void signOut() {
        parentService.signOut();
    }

    @PutMapping("/nation")
    public ResponseEntity<?> changeNation(@RequestParam String nation) {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();
            logger.info("email: " + email);
            Parent entity = parentService.changeNation(email, nation);
            //자바 스트림을 이용하여 리턴된 엔티티 리스트를 TodoDTO리스트로 변환한다.

            ParentDTO dto = new ParentDTO(entity);

            //변환된 TodoDTO 리스트를 이용하여 ResponseDTO를 초기화한다.
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().data((List<ParentDTO>) dto).build();

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            //예외 발생 시 error에 메세지를 넣어 리턴
            ResponseDTO<ParentDTO> response = ResponseDTO.<ParentDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/child")
    public Parent createChild(@RequestBody Student student) {
        return parentService.createChild(student);
    }

    @GetMapping("/info")
    public Parent getParentInfo(@RequestParam Long parentId) {
        return parentService.getParentInfo(parentId);
    }

    @GetMapping("/children")
    public List<Student> getChildren(@RequestParam Long parentId) {
        return parentService.getChildren(parentId);
    }

    @DeleteMapping("/child/{childId}")
    public void deleteChild(@PathVariable Long childId) {
        parentService.deleteChild(childId);
    }

    @GetMapping("/child/{childId}")
    public Student getChild(@PathVariable Long childId) {
        return parentService.getChild(childId);
    }

    @GetMapping("/child/{childId}/statistics")
    public String getChildStatistics(@PathVariable Long childId) {
        return parentService.getChildStatistics(childId);
    }
}

