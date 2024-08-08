package com.edu.koplay.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "front.server")
public class ServerConfig {
    private String url;
    public String getUrl() {
        return url;
    }
}