package io.openvidu.basic.java;

import org.springframework.boot.web.context.WebServerInitializedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
public class ServerPortListener {

    private int port;

    @EventListener
    public void onApplicationEvent(WebServerInitializedEvent event) {
        this.port = event.getWebServer().getPort();
        System.out.println("Server is running on port: " + port);
    }

    public int getPort() {
        return port;
    }
}
