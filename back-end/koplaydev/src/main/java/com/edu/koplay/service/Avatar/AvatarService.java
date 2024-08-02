package com.edu.koplay.service.Avatar;

import com.edu.koplay.dto.AvatarDTO;
import com.edu.koplay.model.Avatar;
import com.edu.koplay.repository.AvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AvatarService {
    @Autowired
    private AvatarRepository avatarRepository;

    public List<AvatarDTO> getAllAvatars() {
        List<Avatar> avatars= avatarRepository.findAll();
        List<AvatarDTO> dtos = avatars.stream().map(AvatarDTO::new).collect(Collectors.toList());

        return dtos;
    }
}
