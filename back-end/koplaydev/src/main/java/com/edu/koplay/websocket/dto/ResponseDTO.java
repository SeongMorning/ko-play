package com.edu.koplay.websocket.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class ResponseDTO<T> {
    private int index;
    private List<T> data;
}