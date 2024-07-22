package com.ssafy.jpa.jpatest.repository;

import com.ssafy.jpa.jpatest.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
}
