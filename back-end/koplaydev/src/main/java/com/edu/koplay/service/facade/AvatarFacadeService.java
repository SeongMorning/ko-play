package com.edu.koplay.service.facade;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.service.AvatarService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class AvatarFacadeService {
    private AvatarService avatarService;

    @Autowired
    public AvatarFacadeService(AvatarService avatarService) {
        this.avatarService = avatarService;
    }

    public List<Avatar> getAllAvatars(){
        return avatarService.getAllAvatars();
    }
}
