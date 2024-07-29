package io.openvidu.basic.java;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Component;



@Component
public class ServerPortCheck {

    @Autowired
    private Environment environment;

    @PostConstruct
    public void init() {
        String port = environment.getProperty("local.server.port");
        System.out.println("Server is running on port: " + port);
    }
}
