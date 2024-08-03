package com.edu.koplay.service;

import com.edu.koplay.model.Nation;
import com.edu.koplay.repository.NationRepository;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class NationService {
    private NationRepository nationRepository;

    public NationService(NationRepository nationRepository) {
        this.nationRepository = nationRepository;
    }

    public Nation selectNationByName(String countryName){
        return nationRepository.findByCountryName(countryName).orElseThrow(()-> new NoSuchElementException("해당 국가는 존재하지 않습니다."));
    }
}
