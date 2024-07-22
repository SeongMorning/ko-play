package com.ssafy.jpa.jpatest;

import jakarta.persistence.EntityManagerFactory;
import jakarta.persistence.Persistence;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class JpatestApplication {

	public static void main(String[] args) {
		//EntityManagerFactory emf = Persistence.createEntityManagerFactory();

		SpringApplication.run(JpatestApplication.class, args);
	}

}
