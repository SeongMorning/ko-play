package com.edu.koplay.service.oauth;

import com.edu.koplay.dto.*;
import com.edu.koplay.model.UserEntity;
import com.edu.koplay.persistence.UserRepository;
import com.edu.koplay.util.ROLE;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    private final UserRepository userRepository;

    @Autowired
    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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

//        String username = oAuth2Response.getProvider()+" "+oAuth2Response.getProviderId();
        String email = oAuth2Response.getEmail();

        //유저 이메일을 통해서 검색함
        UserEntity existData = userRepository.findByEmail(email);
        //db에 유저가 없는경우
        if( existData == null){
            logger.info("유저가 없는경우");
            UserEntity userEntity = new UserEntity();
            userEntity.setEmail(oAuth2Response.getEmail());
            userEntity.setName(oAuth2Response.getName());
            userEntity.setProvider(oAuth2Response.getProvider());
            userRepository.save(userEntity);

            UserDTO userDTO = new UserDTO();
//            userDTO.setEmail(oAuth2Response.getEmail());
            userDTO.setData(oAuth2Response.getName());
            //새로운 유저 생성
            return new CustomOAuth2User(userDTO);
        }else{
            //db에 유저가 있는경우
            logger.info("유저가 있는경우");
            existData.setEmail(oAuth2Response.getEmail());
            existData.setName(oAuth2Response.getName());

            userRepository.save(existData);

            UserDTO userDTO = new UserDTO();
//            userDTO.setEmail(existData.getEmail());
            userDTO.setData(oAuth2Response.getName());
            userDTO.setRoles(ROLE.PARENT.name());

            return new CustomOAuth2User(userDTO);

        }

    }
}
