package com.edu.koplay.security.config;

import com.edu.koplay.security.jwt.JwtFilter;
import com.edu.koplay.security.jwt.JwtUtil;
import com.edu.koplay.security.oauth2.CustomLogoutHandler;
import com.edu.koplay.security.oauth2.CustomOAuth2SuccessHandler;
import com.edu.koplay.security.oauth2.CustomUserSuccessHandler;
import com.edu.koplay.security.service.CustomOAuth2UserService;
import com.edu.koplay.security.util.ROLE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity

public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final CustomUserSuccessHandler customUserSuccessHandler;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;
    private final CustomLogoutHandler customLogoutHandler;

    @Autowired
    public SecurityConfig(JwtUtil jwtUtil, CustomOAuth2UserService customOAuth2UserService, CustomUserSuccessHandler customSuccessHandler, CustomOAuth2SuccessHandler customOAuth2SuccessHandler, CustomLogoutHandler customLogoutHandler) {

        this.jwtUtil = jwtUtil;
        this.customOAuth2UserService = customOAuth2UserService;
        this.customUserSuccessHandler = customSuccessHandler;
        this.customOAuth2SuccessHandler = customOAuth2SuccessHandler;
        this.customLogoutHandler = customLogoutHandler;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                //HTTP Basic 인증 방식 disable
                .httpBasic(httpBasic -> httpBasic.disable())
                //csrf disable
//                .headers(headers -> headers.cacheControl().disable())
                .csrf(csrf -> csrf.disable())
                //세션 설정 : STATELESS
                .sessionManagement(
                        sessionManagement -> sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                //경로별 인가 작업
                .authorizeHttpRequests(
                        authorize ->
                                authorize
                                        .requestMatchers("/swagger-ui/**").permitAll()
                                        .requestMatchers("/v3/**").permitAll()
                                        .requestMatchers("/login/oauth2/**").permitAll()
                                        .requestMatchers("/").permitAll()
                                        .requestMatchers("/custom-login").permitAll()
                                        .requestMatchers("/login").permitAll()
                                        .requestMatchers("/token/**").permitAll()
                                        .requestMatchers("/studentsuccess").hasRole(ROLE.STUDENT.getRoles())
                                        .requestMatchers("/parent/test").hasRole(ROLE.PARENT.getRoles())
                                        .requestMatchers("/parent/**").hasRole("PARENT")
                                        .requestMatchers("/student/**").hasRole("STUDENT")
                                        .anyRequest().authenticated())
                //filter 추가
                //oauth2 인증 전에 JWT토큰을 검증할 jwtfilter 돌도록
                .addFilterBefore(new JwtFilter(jwtUtil), OAuth2LoginAuthenticationFilter.class)
                .addFilterBefore(new JwtFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class)

                //oauth2
                .oauth2Login((oauth2) -> oauth2
                        .userInfoEndpoint((userInfoEndpointConfig) -> userInfoEndpointConfig
                                .userService(customOAuth2UserService))
                        .successHandler(customOAuth2SuccessHandler)
                )
                .formLogin(formLogin ->
                                formLogin
//                                .loginPage("/custom-login")  // 별도의 로그인 페이지 경로 사용
                                        .usernameParameter("id")
                                        .passwordParameter("password")
//                                      .loginProcessingUrl("/student/signin")
//                                      .defaultSuccessUrl("/studentsuccess", true)
                                        .failureUrl("/custom-login?error=true")  // 로그인 실패 시 리다이렉트
                                        .successHandler(customUserSuccessHandler)

                )
                .logout(logout -> logout
                                .logoutSuccessHandler(customLogoutHandler) // 로그아웃 성공 처리 핸들러
                        // 로그아웃 성공 후 리다이렉트될 URL 등 추가 설정 가능
                )
//                .exceptionHandling(exceptionHandling ->
//                        exceptionHandling
//                                .authenticationEntryPoint((request, response, authException) ->
//                                        response.sendRedirect("/custom-login?error=true"))  // 인증 실패 시 리다이렉트
//                )
                .build()
                ;

    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
