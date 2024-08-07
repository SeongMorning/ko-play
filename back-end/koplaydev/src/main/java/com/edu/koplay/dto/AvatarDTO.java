package com.edu.koplay.dto;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Nation;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.StudentUsableAvatar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AvatarDTO {
    private Long avatarIdx;
    private String countryName;
    private String avatarFile;

    public AvatarDTO(Avatar avatar) {
        this.avatarFile = avatar.getAvatarFile();
        this.countryName = avatar.getNation().getCountryName();
        this.avatarIdx = avatar.getAvatarIdx();
    }

    public static Avatar toEntity(final AvatarDTO dto) {
        return Avatar.builder()
                .avatarIdx(dto.getAvatarIdx())
                .build();
    }
}
