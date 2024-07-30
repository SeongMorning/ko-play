package com.edu.koplay.security.service;

import com.edu.koplay.model.Student;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.security.dto.UserDTO;
import com.edu.koplay.security.util.ROLE;
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

    public Student login(Student entity) {
        return studentRepository.findByStudentIdAndStudentPw(entity.getStudentId(), entity.getStudentPw());
    }

    @Override
    public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
        Student member = studentRepository.findByStudentId(id);
        if (member == null) {
            throw new UsernameNotFoundException("없는 회원 입니다...");
        }
        UserDTO userDTO = new UserDTO();
        userDTO.setData(member.getStudentName());
        userDTO.setRoles(ROLE.STUDENT.name());
        return User.builder().username(member.getStudentId()).password(member.getStudentPw()).roles(ROLE.STUDENT.name()).build();
    }
}
