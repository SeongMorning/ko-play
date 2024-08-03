package com.edu.koplay.service;

import com.edu.koplay.model.Word;
import com.edu.koplay.repository.WordRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@Service
public class WordService {
    private WordRepository wordRepository;

    @Autowired
    public WordService(WordRepository wordRepository) {
        this.wordRepository = wordRepository;
    }

    public List<Word> getWordsForGame(int amount, int difficulty, boolean isDouble) {
        List<Word> word = null;
        if (isDouble) {
            int findAmount = amount / 2;
            word = wordRepository.findRandomWordByDifficulty(difficulty, findAmount).orElseThrow(() -> new NoSuchElementException("단어가 존재하지않아요"));
            //찾아야할 단어가 홀수일경우에는 한쪽에서 하나 더 찾아야함.
            if (amount % 2 == 1) {
                word.addAll(wordRepository.findRandomWordByDifficulty(difficulty + 1, findAmount + 1).orElseThrow(() -> new NoSuchElementException("단어가 존재하지않아요")));
            } else {
                word.addAll(wordRepository.findRandomWordByDifficulty(difficulty + 1, findAmount).orElseThrow(() -> new NoSuchElementException("단어가 존재하지않아요")));
            }
        } else {
            word = wordRepository.findRandomWordByDifficulty(difficulty, amount).orElseThrow(() -> new NoSuchElementException("단어가 존재하지않아요"));
        }
        return word;
    }
}
