package com.edu.koplay.batch;

import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.StudentRepository;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.slf4j.LoggerFactoryFriend;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemProcessor;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class CustomItemProcessor implements ItemProcessor<List<Object[]>, String> {
    private final StudentRepository studentRepository;
    private static final Logger logger = LoggerFactory.getLogger(CustomItemWriter.class);
    @Getter
    private static List<Top3Players> topPlayers = new ArrayList<>();

    public CustomItemProcessor(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public String process(List<Object[]> items) throws Exception {
        StringBuilder result = new StringBuilder("Top 3 Students:\n");
        List<Top3Players> topPlayers = new ArrayList<>();
        for (Object[] item : items) {
            Long studentIdx = (Long) item[0];
            Optional<Student> byId = studentRepository.findByStudentIdx(studentIdx);
            StudentDTO studentDTO = new StudentDTO(byId.get());
            logger.info("111"+studentDTO.toString());
            //System.out.println("??"+studentDTO);

            Long count = (Long) item[1];
            topPlayers.add(new Top3Players(studentDTO, count));

            Student student = studentRepository.findByStudentIdx(studentIdx).orElse(null);
            if (student != null) {
                result.append("Student ID: ").append(studentDTO.getId())
                        .append(", Name: ").append(studentDTO.getName())
                        .append(", Count: ").append(count).append("\n");
            }
        }


        updateTopPlayers(topPlayers);
        return result.toString();
    }
    public static void updateTopPlayers(List<Top3Players> players) {

        topPlayers = List.copyOf(players);
    }

}


