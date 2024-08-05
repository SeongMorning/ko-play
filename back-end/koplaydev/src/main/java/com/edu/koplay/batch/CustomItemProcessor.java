package com.edu.koplay.batch;

import com.edu.koplay.model.Student;
import com.edu.koplay.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactoryFriend;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemProcessor;
import java.util.List;

public class CustomItemProcessor implements ItemProcessor<List<Object[]>, String> {
    private final StudentRepository studentRepository;

    public CustomItemProcessor(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public String process(List<Object[]> items) throws Exception {
        StringBuilder result = new StringBuilder("Top 3 Students:\n");

        for (Object[] item : items) {
            Long studentIdx = (Long) item[0];
            Long count = (Long) item[1];
            List<Top3Players> topPlayers = items.stream()
                    .map(res -> new Top3Players((Long) res[0], (Long) res[1]))
                    .toList();
            Top3Players.updateTopPlayers(topPlayers);
            Student student = studentRepository.findByStudentIdx(studentIdx).orElse(null);
            if (student != null) {
                result.append("Student ID: ").append(studentIdx).append(", Name: ")
                        .append(student.getStudentName()).append(", Count: ").append(count).append("\n");
            }
        }
        return result.toString();
    }
}


