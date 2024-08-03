package com.edu.koplay.controller.AvatarController;

import com.edu.koplay.dto.AvatarDTO;
import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.model.Avatar;
import com.edu.koplay.service.facade.AvatarFacadeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/avatar")
public class AvatarController {
    AvatarFacadeService avatarService;

    @Autowired
    public AvatarController(AvatarFacadeService avatarFacadeService) {
        this.avatarService = avatarFacadeService;
    }

    @GetMapping("/") //모든 아바타를 반환하는 api
    public ResponseEntity<?> getAllAvatars() {
        try {
            List<Avatar> allAvatars = avatarService.getAllAvatars();

            List<AvatarDTO> dtos = allAvatars.stream().map(AvatarDTO::new).collect(Collectors.toList());

            return ResponseEntity.ok().body(dtos);
            //return null;
        } catch (Exception e) {
            ResponseDTO<AvatarDTO> response = ResponseDTO.<AvatarDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }
    }
}
