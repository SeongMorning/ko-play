package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {

    Parent findByParentEmail(String email);
}
