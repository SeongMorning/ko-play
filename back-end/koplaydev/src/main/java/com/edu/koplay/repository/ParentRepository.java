package com.edu.koplay.repository;

import com.edu.koplay.model.Parent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ParentRepository extends JpaRepository<Parent, Long> {

    Optional<Parent> findByParentEmail(String email);
}
