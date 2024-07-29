package com.edu.koplay.persistence;

import com.edu.koplay.redis.RefreshToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends CrudRepository<RefreshToken, String> {

    // accessToken으로 RefreshToken 조회하기
    Optional<RefreshToken> findByAccessToken(String accessToken);
}
