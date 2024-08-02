package com.edu.koplay.dto;

import com.edu.koplay.model.Word;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WordDTO {
    private String wordKor;
    private String wordThailand;
    private String wordVietnam;
    private String wordChina;
    private String imgUrl;

    public WordDTO(final Word word) {
        this.wordKor = word.getWordKor();
        this.wordVietnam = word.getWordVietnam();
        this.wordThailand = word.getWordThailand();
        this.wordChina = word.getWordChina();
        this.imgUrl = word.getImgUrl();
    }

}
