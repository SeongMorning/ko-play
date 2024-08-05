package com.edu.koplay.batch.config;

import com.edu.koplay.batch.CustomItemProcessor;
import com.edu.koplay.batch.CustomItemReader;
import com.edu.koplay.batch.CustomItemWriter;
import com.edu.koplay.repository.GameDataRepository;
import com.edu.koplay.repository.StudentRepository;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.batch.item.ItemWriter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

import java.util.List;

@Configuration
@EnableBatchProcessing
public class BatchConfig {

    private final JobRepository jobRepository;
    private final PlatformTransactionManager transactionManager;
    private final GameDataRepository gameDataRepository;
    private final StudentRepository studentRepository;

    public BatchConfig(JobRepository jobRepository, PlatformTransactionManager transactionManager,
                       GameDataRepository gameDataRepository, StudentRepository studentRepository) {
        this.jobRepository = jobRepository;
        this.transactionManager = transactionManager;
        this.gameDataRepository = gameDataRepository;
        this.studentRepository = studentRepository;
    }

    @Bean
    public Job job() {
        return new JobBuilder("job", jobRepository)
                .start(step1())
                .build();
    }

    @Bean
    public Step step1() {
        return new StepBuilder("step1", jobRepository)
                .<List<Object[]>, String>chunk(1, transactionManager)
                .reader(reader())
                .processor(processor())
                .writer(writer())
                .build();
    }

    @Bean
    public CustomItemReader reader() {
        return new CustomItemReader(gameDataRepository);
    }

    @Bean
    public ItemProcessor<List<Object[]>, String> processor() {
        return new CustomItemProcessor(studentRepository);
    }

    @Bean
    public ItemWriter<String> writer() {
        return new CustomItemWriter();
    }
}
