package com.edu.koplay.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ResourceBundleMessageSource;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.i18n.AcceptHeaderLocaleResolver;
import org.springframework.web.servlet.i18n.LocaleChangeInterceptor;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import java.util.Locale;

@Configuration
public class LocaleConfig implements WebMvcConfigurer {

    @Bean
    public LocaleResolver localeResolver() {
        // Accept-Language 헤더를 통해 로케일을 설정하는 Resolver
        AcceptHeaderLocaleResolver slr = new AcceptHeaderLocaleResolver();
        slr.setDefaultLocale(Locale.KOREA); // 기본 로케일을 한국어로 설정
        return slr;
    }
//    @Bean
//    public LocaleResolver localeResolver() {
//        // 세션을 통해 로케일을 유지하고, 기본 로케일을 한국어로 설정
//        SessionLocaleResolver slr = new SessionLocaleResolver();
//        slr.setDefaultLocale(new Locale("ko", "KR")); // 기본 로케일 설정
//        return slr;
//    }

    @Bean
    public LocaleChangeInterceptor localeChangeInterceptor() {
        // URL 파라미터로 로케일 변경
        LocaleChangeInterceptor lci = new LocaleChangeInterceptor();
        lci.setParamName("lang");
        return lci;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 모든 요청에 대해 로케일 변경 인터셉터 추가
        registry.addInterceptor(localeChangeInterceptor());
    }

    @Bean
    public ResourceBundleMessageSource messageSource() {
        ResourceBundleMessageSource messageSource = new ResourceBundleMessageSource();
        // 메시지 파일의 기본 이름 설정
        messageSource.setBasenames("messages","errors");
        // 메시지 파일이 UTF-8로 인코딩되었음을 지정
        messageSource.setDefaultEncoding("UTF-8");
        return messageSource;
    }
}
