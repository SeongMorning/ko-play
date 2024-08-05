package com.edu.koplay.batch;
import org.springframework.batch.item.Chunk;
import org.springframework.batch.item.ItemWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;
import org.springframework.batch.item.ItemWriter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.List;

public class CustomItemWriter implements ItemWriter<String> {

    private static final Logger logger = LoggerFactory.getLogger(CustomItemWriter.class);

    @Override
    public void write(Chunk<? extends String> chunk) throws Exception {
        for (String item : chunk) {
            logger.info(item);
        }
    }


}


