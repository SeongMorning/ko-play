package com.edu.koplay.dto;

import com.edu.koplay.model.Gallery;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GalleryDTO {
    private String snapshot;
    private Date createAt;

    public GalleryDTO(final Gallery entity) {
        this.createAt = entity.getCreatedAt();
        this.snapshot = entity.getSnapshot();
    }

}
