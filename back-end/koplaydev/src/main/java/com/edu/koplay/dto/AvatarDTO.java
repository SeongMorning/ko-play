package com.edu.koplay.dto;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Nation;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvatarDTO {
    private int avatarIdx;
    private Nation nation;
    private byte[] avatarFile;



    public AvatarDTO(Avatar avatar) {
        this.avatarFile = avatar.getAvatarFile();
        this.nation = avatar.getNation();
        this.avatarIdx = getAvatarIdx();
    }
}
