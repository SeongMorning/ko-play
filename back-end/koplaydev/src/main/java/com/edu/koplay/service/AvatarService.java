package com.edu.koplay.service;

import com.edu.koplay.model.Avatar;
import com.edu.koplay.model.Student;
import com.edu.koplay.model.StudentUsableAvatar;
import com.edu.koplay.repository.AvatarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class AvatarService {
    @Autowired
    private AvatarRepository avatarRepository;

    public List<Avatar> getAllAvatars() {
        return avatarRepository.findAll();
    }

    public Avatar selectAvatarByAvatarIdx(Long avatarIdx) {
        return avatarRepository.findAvatarByAvatarIdx(avatarIdx).orElseThrow(() -> new NoSuchElementException("이 학생은 코스튬이 하나도 없어요"));
    }

    public Avatar selectRandomAvatar(String countryName, Long studentIdx) {
        return avatarRepository.findRandomAvatarByCountryAndStudent(countryName, studentIdx).orElseThrow(() -> new NoSuchElementException("이 학생은 해당 국가의 아바타를 모두 가졌어요"));
    }

}
