package com.edu.koplay.controller.global;
import com.edu.koplay.controller.parent.ParentController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Locale;
@Controller
public class GlobalController {
    private static final Logger logger = LoggerFactory.getLogger(ParentController.class);
    private final MessageSource messageSource;

    @Autowired
    public GlobalController(MessageSource messageSource) {
        this.messageSource = messageSource;
    }
    @RequestMapping(value = "/greeting", produces = "application/json; charset=UTF-8")
//    @GetMapping("/greeting")
    @ResponseBody
    public String greeting(@RequestParam(name="lang", required=false) String lang) {
        // URL의 파라미터를 통해 로케일 설정
        Locale locale = lang != null ? Locale.forLanguageTag(lang.replace("_", "-")) : Locale.getDefault();
        logger.info("locale : "+locale);
        // 로케일에 맞는 메시지 가져오기
        String greetingMessage = messageSource.getMessage("greeting", null, locale);
        logger.info("greetingMessage : "+greetingMessage);
//        model.addAttribute("message", );

        return greetingMessage;
    }
}
