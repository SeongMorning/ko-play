package com.edu.koplay.dto;

import com.edu.koplay.model.StudentUsableAvatar;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class StudentUsableAvatarDTO {

    private Long studentUsableAvatarIdx;
    private Boolean currentUse;
    private AvatarDTO avatar;

    public StudentUsableAvatarDTO(StudentUsableAvatar studentUsableAvatar) {
        this.studentUsableAvatarIdx = studentUsableAvatar.getStudentUsableAvatarIdx();
        this.currentUse = studentUsableAvatar.getCurrentUse();
        this.avatar = new AvatarDTO(studentUsableAvatar.getAvatar());
    }
}
