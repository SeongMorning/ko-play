package com.edu.koplay.batch;
import com.edu.koplay.model.GameData;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.GameDataRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemReader;


import java.util.ArrayList;
import java.util.List;

import org.springframework.batch.item.ItemReader;
import java.util.List;
import java.util.stream.Collectors;

public class CustomItemReader implements ItemReader<List<Object[]>> {
    private static final Logger logger = LoggerFactory.getLogger(CustomItemWriter.class);
    private final GameDataRepository gameDataRepository;
    private boolean read = false;

    public CustomItemReader(GameDataRepository gameDataRepository) {
        this.gameDataRepository = gameDataRepository;
    }

    @Override
    public List<Object[]> read() throws Exception {
        if (!read) {
            read = true;
            List<Object[]> results = gameDataRepository.findTop3StudentsWithMostGames();
            List<Top3Players> topPlayers = results.stream()
                .map(result -> new Top3Players((Long) result[0], (Long) result[1]))
                .toList();
            logger.info(topPlayers.toString());
            logger.info("!!!!!!!!!!!READ!!!!!!!!!!!!!!!"+results.get(0)[0]);
//            System.out.println("!!!!!!!!!!!READ!!!!!!!!!!!!!!!"+results);
            return results;
        } else {
            return null; // 한 번만 읽도록 설정
        }
    }
}

