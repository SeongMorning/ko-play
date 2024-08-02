package com.edu.koplay.security.oauth2;

import com.edu.koplay.security.dto.GeneratedToken;
import com.edu.koplay.security.jwt.JwtUtil;
import com.edu.koplay.security.util.ROLE;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;

@Component
public class CustomUserSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtUtil jwtUtil;

    public CustomUserSuccessHandler(JwtUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        logger.info("인증성공");
        //OAuth2User
        User customUserDetails = (User) authentication.getPrincipal();
        String name = customUserDetails.getUsername();
        String role = ROLE.STUDENT.name();

        GeneratedToken token = jwtUtil.generateToken(name, role);
        logger.info("jwtToken = " + token.getAccessToken());
        response.addCookie(createCookie("Authorization", token.getAccessToken()));
//        response.sendRedirect("http://localhost:3000/");
        response.sendRedirect("http://localhost:8080/studentsuccess");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
//        cookie.setMaxAge(60*60*60);
        //https설정
        //cookie.setSecure(true);
        cookie.setPath("/");


        return cookie;
    }
}
