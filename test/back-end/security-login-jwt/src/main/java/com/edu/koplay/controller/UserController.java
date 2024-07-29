package com.edu.koplay.controller;

import com.edu.koplay.jwt.JwtUtil;
import com.edu.koplay.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/student")
public class UserController {
    Logger logger = LoggerFactory.getLogger(UserController.class);

    private JwtUtil jwtUtil;
    private UserService userService;

    @Autowired
    public UserController(JwtUtil jwtUtil, UserService userService) {
        this.jwtUtil = jwtUtil;
        this.userService = userService;
    }

    @GetMapping("/test")
    public String test(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        String token = null;

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("Authorization".equals(cookie.getName())) {
                    token = cookie.getValue(); // 쿠키의 값 저장
                    break;
                }
            }
        }
        if (token != null) {
            return "studentsuccess, token: " + token;
        } else {
            return "studentsuccess, no token found";
        }
//        return "test";
    }

//    // 로그아웃
//    @PostMapping("/logout")
//    public ResponseEntity<?> logout(HttpSession session) {
//        System.out.println("로그아웃 전 " + session.getAttribute("loginUser"));
//        session.removeAttribute("loginUser");
//        System.out.println(session.getAttribute("loginUser"));
//        return new ResponseEntity<String>("로그아웃완료", HttpStatus.OK);
//    }

}
