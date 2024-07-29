package com.edu.koplay.security.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ROLE {
    PARENT ("PARENT"),
    STUDENT ("STUDENT");

    private final String roles;
}