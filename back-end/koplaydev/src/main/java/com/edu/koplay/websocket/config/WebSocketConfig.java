package com.edu.koplay.websocket.config;



import com.edu.koplay.config.ServerConfig;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.server.support.HttpSessionHandshakeInterceptor;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {
    private final ServerConfig config;

    public WebSocketConfig(ServerConfig config) {
        this.config = config;
    }
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
//        registry.addEndpoint("/gs-guide-websocket").withSockJS();
//        registry.addEndpoint("/gs-guide-websocket").setAllowedOriginPatterns("*").withSockJS();
//        registry.addEndpoint("/gs-guide-websocket").setAllowedOriginPatterns("*");
        registry.addEndpoint("/gs-guide-websocket").setAllowedOrigins(config.getBack(),config.getFront(),"http://192.168.31.173:3000","http://192.168.31.173:8080","http://127.0.0.1:8080","http://localhost:8080","http://127.0.0.1:5500", "http://localhost:5500","http://localhost:3000","http://127.0.0.1:3000","http://172.30.1.27:3000", "http://172.30.1.27:8080", "http://192.168.31.189:8080", "http://192.168.31.189:3000") // 허용할 출처 추가
                .addInterceptors(new HttpSessionHandshakeInterceptor())
                .withSockJS();
    }

}