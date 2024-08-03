package com.edu.koplay.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.edu.koplay.model.Nation;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.Optional;

@Repository
public interface NationRepository extends JpaRepository<Nation, Long> {
    Optional<Nation> findByCountryName(String countryName);
}
