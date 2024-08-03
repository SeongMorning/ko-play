package com.edu.koplay.controller;

import com.edu.koplay.security.dto.StatusResponseDto;
import com.edu.koplay.security.dto.TokenResponseStatusDto;
import com.edu.koplay.security.jwt.JwtUtil;
import com.edu.koplay.security.model.RefreshToken;
import com.edu.koplay.security.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;
import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {
    Logger logger = LoggerFactory.getLogger(getClass());

    private final RefreshTokenService tokenService;
    private final JwtUtil jwtUtil;

    @GetMapping("/token/logout")
    public ResponseEntity<StatusResponseDto> logout(@RequestHeader("Authorization") final String accessToken) {

        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(jwtUtil.seperateBearer(accessToken));
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<TokenResponseStatusDto> refresh(@RequestHeader("Authorization") final String accessToken) {
        // 액세스 토큰으로 Refresh 토큰 객체를 조회

        RefreshToken refreshToken = tokenService.findByAccessToken(jwtUtil.seperateBearer(accessToken)).orElseThrow(()-> new NoSuchElementException("리프레쉬토큰이없서요"));

        logger.info("refresh: "+refreshToken.getRefreshToken());

        // RefreshToken이 존재하고 유효하다면 실행
        if (refreshToken.getRefreshToken() != null && !jwtUtil.isExpired(refreshToken.getRefreshToken())) {
            // 권한과 아이디를 추출해 새로운 액세스토큰을 만든다.
            logger.info("accessToken: "+refreshToken.getAccessToken());
            String newAccessToken = jwtUtil.generateAccessToken(refreshToken.getId(), jwtUtil.getRole(refreshToken.getRefreshToken()));
            // 액세스 토큰의 값을 수정해준다.
            logger.info("new accessToken: "+newAccessToken);

            refreshToken.updateAccessToken(newAccessToken);
            tokenService.updateAccessToken(refreshToken);
            // 새로운 액세스 토큰을 반환해준다.
            return ResponseEntity.ok(TokenResponseStatusDto.addStatus(201, newAccessToken));
        }
        return ResponseEntity.badRequest().body(TokenResponseStatusDto.addStatus(400, null));
    }

}
