package com.edu.koplay.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChangeAvatarDTO {
    private int beforeAvatarIdx;
    private int afterAvatarIdx;

}
