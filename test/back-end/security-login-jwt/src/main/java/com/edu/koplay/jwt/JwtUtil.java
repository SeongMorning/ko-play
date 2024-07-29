package com.edu.koplay.jwt;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;

import javax.crypto.SecretKey;

import com.edu.koplay.util.ROLE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class JwtUtil {
    Logger logger = LoggerFactory.getLogger(getClass());

    private SecretKey secretkey;
    private long expires;

    public JwtUtil(@Value("${spring.jwt.secret}") String key, @Value("${spring.jwt.expires}") long expires) {
        this.secretkey = Keys.hmacShaKeyFor(key.getBytes(StandardCharsets.UTF_8));
        this.expires = expires;
    }

    public String generateToken(Authentication authentication) {
        String data = authentication.getName(); // 사용자의 이름을 추출하여 사용합니다.
        logger.info(authentication.getAuthorities().toString());
//        String role = authentication.getAuthorities().stream()
//                .findFirst()
//                .map(SimpleGrantedAuthority::getAuthority)
//                .orElse("ROLE_USER"); // 기본 역할을 설정

        return generateToken(data, ROLE.STUDENT.name());
    }

    public String generateToken(String data, String role) {
        Date exp = new Date(System.currentTimeMillis() + expires); // 만료 시간 설정

        return Jwts.builder()
                .claim("data", data)
                .claim("roles", role)
                .setExpiration(exp)
                .signWith(secretkey)
                .compact();
    }

//    public String generateToken(Authentication authentication) {
//        String data = authentication.getName(); // 사용자의 이름을 추출하여 사용합니다.
//        return generateToken(data);
//    }
//
//    public String generateToken(String data) {
//        Date exp = new Date(System.currentTimeMillis() + expires); // 1시간
//
//        return Jwts.builder().claim("data", data).setExpiration(exp).signWith(secretkey).compact();
//    }

    public Authentication getAuthentication(String accessToken) {
        Claims claims = Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(accessToken).getBody();
        String data = claims.get("data", String.class);
        String role = claims.get("roles", String.class);
        return new UsernamePasswordAuthenticationToken(claims, null, getAuthorities());
    }

    public String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public String getData(String token) {
        return Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody().get("data",String.class);
    }

    public String getRole(String token) {
        return Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody().get("roles", String.class);
    }

    public Boolean isExpired(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token).getBody();
            Date expirationDate = claims.getExpiration();
            return expirationDate.before(new Date()); // 현재 시간보다 만료 시간이 이전인지 확인
        } catch (Exception e) {
            logger.error("토큰 검증 중 오류 발생: " + e.getMessage());
            return false; // 오류가 발생한 경우 null 반환
        }
    }


    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretkey).build().parseClaimsJws(token);
            return true;
        } catch (SignatureException e) {
            logger.info("잘못된 토큰 서명입니다.");
        } catch (ExpiredJwtException e) {
            logger.info("만료된 토큰입니다.");
        } catch (IllegalArgumentException | MalformedJwtException e) {
            logger.error(e.toString());
            logger.error(e.getMessage());
            logger.info("잘못된 토큰입니다.");
        }
        return false;
    }

    private Collection<SimpleGrantedAuthority> getAuthorities() {
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(ROLE.STUDENT.name()));
        return authorities;
    }

    public String createJwt(String data, String role) {

        return Jwts.builder()
                .claim("data", data)
                .claim("roles", role)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expires))
                .signWith(secretkey)
                .compact();
    }
}
