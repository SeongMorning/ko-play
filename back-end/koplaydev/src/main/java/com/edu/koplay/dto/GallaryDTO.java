package com.edu.koplay.dto;

import com.edu.koplay.model.Gallary;
import com.edu.koplay.model.Parent;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class GallaryDTO {
    private String snapshot;
    private Date createAt;

    public GallaryDTO(final Gallary entity) {
        this.createAt = entity.getCreatedAt();
        this.snapshot = entity.getSnapshot();
    }

}
