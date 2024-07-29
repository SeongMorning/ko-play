package com.edu.koplay.util;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ROLE {
    PARENT ("PARENT"),
    STUDENT ("STUDENT");

    private final String roles;
    public static String getIncludingRoles(String role){
        return ROLE.valueOf(role).getRoles();
    }
    public static String addRole(ROLE role, String addRole){
        String priorRoles = role.getRoles();
        priorRoles += ","+addRole;
        return priorRoles;
    }
    public static String addRole(String roles, ROLE role){
        return roles + "," + role.getRoles();

    }
}