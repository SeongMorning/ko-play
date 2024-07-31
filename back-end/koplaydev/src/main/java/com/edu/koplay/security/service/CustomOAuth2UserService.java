package com.edu.koplay.security.service;

import com.edu.koplay.model.Parent;
import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.security.dto.*;
import com.edu.koplay.security.util.ROLE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    private final ParentRepository parentRepository;

    @Autowired
    public CustomOAuth2UserService(ParentRepository userRepository) {
        this.parentRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        logger.info("oAuth2User"+oAuth2User);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
            logger.info("oAuth2Response: "+oAuth2Response);
        }else if(registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }else{
            return null;
        }

        String email = oAuth2Response.getEmail();

        //유저 이메일을 통해서 검색함
        Optional<Parent> existData = parentRepository.findByParentEmail(email);
        //db에 유저가 없는경우
        if(existData.isEmpty()){
            logger.info("유저가 없는경우");
            Parent parentEntity = new Parent();
            parentEntity.setParentEmail(oAuth2Response.getEmail());
            parentEntity.setParentName(oAuth2Response.getName());
            parentEntity.setProvider(oAuth2Response.getProvider());
            parentRepository.save(parentEntity);

            UserDTO userDTO = new UserDTO();
            userDTO.setData(oAuth2Response.getEmail());
//            userDTO.setData(oAuth2Response.getName());
            //새로운 유저 생성
            return new CustomOAuth2User(userDTO);
        }else{
            //db에 유저가 있는경우
            logger.info("유저가 있는경우");
            existData.get().setParentEmail(oAuth2Response.getEmail());
            existData.get().setParentName(oAuth2Response.getName());

            parentRepository.save(existData.get());

            UserDTO userDTO = new UserDTO();
            userDTO.setData(oAuth2Response.getEmail());
//            userDTO.setData(oAuth2Response.getName());
            userDTO.setRoles(ROLE.PARENT.name());

            return new CustomOAuth2User(userDTO);

        }

    }
}
