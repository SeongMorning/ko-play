package com.edu.koplay.batch;
import com.edu.koplay.repository.GameDataRepository;
import com.edu.koplay.repository.StudentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.item.ItemReader;


import java.util.List;

public class CustomItemReader implements ItemReader<List<Object[]>> {

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

//            logger.info("!!!!!!!!!!!READ!!!!!!!!!!!!!!!"+results.get(0)[0]);
//            System.out.println("!!!!!!!!!!!READ!!!!!!!!!!!!!!!"+results);
            return results;
        } else {
            return null; // 한 번만 읽도록 설정
        }
    }
}

