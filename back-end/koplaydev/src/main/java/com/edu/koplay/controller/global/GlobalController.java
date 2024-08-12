package com.edu.koplay.controller.global;
import com.edu.koplay.controller.parent.ParentController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
public class GlobalController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);
    private final MessageSource messageSource;

    @Autowired
    public GlobalController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    @GetMapping("/translations")
    public Map<String, String> getAllTranslations(Locale locale) {
//        Locale locales = new Locale("ko-KR");
//        System.out.println(locales);
//        System.out.println("로테일"+locale);
        // URL의 파라미터를 통해 로케일 설정
        logger.info("locale : "+locale);
        // 로케일에 맞는 메시지 가져오기
        Map<String, String> translations = new HashMap<>();
        // 메시지 파일의 모든 키를 가져옴
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        Enumeration<String> keys = bundle.getKeys();

        // 각 키에 대해 해당하는 메시지를 Map에 넣음
        while (keys.hasMoreElements()) {
            String key = keys.nextElement();
            String value = messageSource.getMessage(key, null, locale);
            translations.put(key, value);
        }

        return translations;

    }
}
