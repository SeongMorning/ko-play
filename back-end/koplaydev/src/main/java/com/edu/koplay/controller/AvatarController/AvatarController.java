package com.edu.koplay.controller.AvatarController;

import com.edu.koplay.dto.AvatarDTO;
import com.edu.koplay.dto.GalleryDTO;
import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.model.Game;
import com.edu.koplay.service.Avatar.AvatarService;
import com.edu.koplay.service.game.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
@CrossOrigin(origins="*")
@RestController
@RequestMapping("/avatar")
public class AvatarController {
    @Autowired
    private AvatarService avatarService;

    @GetMapping("/") //모든 아바타를 반환하는 api
    public ResponseEntity<?> getAllAvatars() {
        try{
            List<AvatarDTO> allAvatars = avatarService.getAllAvatars();
            return ResponseEntity.ok().body(allAvatars);
            //return null;
        }catch (Exception e){
            ResponseDTO<AvatarDTO> response = ResponseDTO.<AvatarDTO>builder().error(e.getMessage()).build();
            return ResponseEntity.badRequest().body(response);
        }


    }
}
