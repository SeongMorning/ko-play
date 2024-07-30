package com.edu.koplay.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainController {
//security test
    @GetMapping("/parent/test")
    public String sampleLogin() {
        return "success";
    }

    @GetMapping("/studentsuccess")
    public String studentsuccess() {
        return "studentsuccess";
    }

}
