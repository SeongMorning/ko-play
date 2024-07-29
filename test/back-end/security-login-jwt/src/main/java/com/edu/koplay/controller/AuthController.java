package com.edu.koplay.controller;

import com.edu.koplay.dto.StatusResponseDto;
import com.edu.koplay.dto.TokenResponseStatusDto;
import com.edu.koplay.jwt.JwtUtil;
import com.edu.koplay.persistence.RefreshTokenRepository;
import com.edu.koplay.redis.RefreshToken;
import com.edu.koplay.service.RefreshTokenService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Slf4j
@RestController
@RequiredArgsConstructor
public class AuthController {
    Logger logger = LoggerFactory.getLogger(getClass());

    private final RefreshTokenRepository tokenRepository;
    private final RefreshTokenService tokenService;
    private final JwtUtil jwtUtil;

    @PostMapping("/token/logout")
    public ResponseEntity<StatusResponseDto> logout(@RequestHeader("Authorization") final String accessToken) {

        // 엑세스 토큰으로 현재 Redis 정보 삭제
        tokenService.removeRefreshToken(accessToken);
        return ResponseEntity.ok(StatusResponseDto.addStatus(200));
    }

    @PostMapping("/token/refresh")
    public ResponseEntity<TokenResponseStatusDto> refresh(@RequestHeader("Authorization") final String accessToken) {
        // 액세스 토큰으로 Refresh 토큰 객체를 조회
        Optional<RefreshToken> refreshToken = tokenRepository.findByAccessToken(accessToken);
        logger.info(accessToken);

        logger.info("refresh: "+refreshToken.get().getRefreshToken());

        // RefreshToken이 존재하고 유효하다면 실행
        if (refreshToken.isPresent() && jwtUtil.isExpired(refreshToken.get().getRefreshToken())) {
            // RefreshToken 객체를 꺼내온다.
            RefreshToken resultToken = refreshToken.get();
            // 권한과 아이디를 추출해 새로운 액세스토큰을 만든다.
            logger.info("accessToken: "+refreshToken.get().getAccessToken());
            String newAccessToken = jwtUtil. generateAccessToken(resultToken.getId(), jwtUtil.getRole(resultToken.getRefreshToken()));
            // 액세스 토큰의 값을 수정해준다.
            logger.info("new accessToken: "+refreshToken.get().getAccessToken());

            resultToken.updateAccessToken(newAccessToken);
            tokenRepository.save(resultToken);
            // 새로운 액세스 토큰을 반환해준다.
            return ResponseEntity.ok(TokenResponseStatusDto.addStatus(201, newAccessToken));
        }
        return ResponseEntity.badRequest().body(TokenResponseStatusDto.addStatus(400, null));
    }

}
