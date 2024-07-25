package com.edu.koplay.service;

import com.edu.koplay.dto.UserDTO;
import com.edu.koplay.model.StudentEntity;
import com.edu.koplay.persistence.StudentRepository;
import com.edu.koplay.util.ROLE;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserService implements UserDetailsService {
    private final StudentRepository studentRepository;

    @Autowired
    public UserService(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    public StudentEntity login(StudentEntity entity) {
        return studentRepository.findByLoginIdAndPassword(entity.getId(), entity.getPassword());
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        StudentEntity member = studentRepository.findById(id);
        if (member == null) {
            throw new UsernameNotFoundException("없는 회원 입니다...");
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setData(member.getName());
        userDTO.setRoles(ROLE.STUDENT.name());
        return User.builder().username(member.getId()).password(member.getPassword()).roles(ROLE.STUDENT.name()).build();
    }
}
