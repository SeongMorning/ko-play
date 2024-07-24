package io.openvidu.basic.java;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BasicJavaApplication {
	ServerPortCheck spc = new ServerPortCheck();
	public static void main(String[] args) {

		SpringApplication.run(BasicJavaApplication.class, args);
	}

}
