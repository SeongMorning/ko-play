package com.edu.koplay.dto;

import com.edu.koplay.model.RecommendLevel;
import com.edu.koplay.model.Student;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.Base64;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudentDTO {
    private String id;
    private String pw;
    private String name;
    private String nickname;

    @JsonProperty("profileImg")
    @JsonDeserialize(using = Base64Deserializer.class)
    @JsonSerialize(using = Base64Serializer.class)
    private byte[] profileImg;
    private String birth;
    private String schoolName;
    private int exp;
    private int speechLevel;
    private int listeningLevel;
    private int readingLevel;
    //GameData
    private int totalGameCount;
    private String nation;
    private boolean visited;

    public StudentDTO(final Student studentEntity
    ) {
        this.id = studentEntity.getStudentId();
//        this.pw = studentEntity.getStudentPw();
        this.name = studentEntity.getStudentName();
        SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd");
        this.birth = format.format(studentEntity.getBirth());
        this.profileImg = studentEntity.getProfileImg();
        this.nickname = studentEntity.getNickname();
        this.schoolName = studentEntity.getSchoolName();
        this.exp = studentEntity.getExp();
        this.visited = studentEntity.getVisited();
    }

    public StudentDTO(final Student studentEntity
            , final RecommendLevel recommendLevelEntity
    ) {
        this.id = studentEntity.getStudentId();
//        this.pw = studentEntity.getStudentPw();
        this.name = studentEntity.getStudentName();
        SimpleDateFormat format = new SimpleDateFormat("yyyy.MM.dd");
        this.birth = format.format(studentEntity.getBirth());
        this.profileImg = studentEntity.getProfileImg();
        this.nickname = studentEntity.getNickname();
        this.schoolName = studentEntity.getSchoolName();
        this.exp = studentEntity.getExp();
        this.speechLevel = recommendLevelEntity.getLevelSpeech();
        this.listeningLevel = recommendLevelEntity.getLevelListening();
        this.readingLevel = recommendLevelEntity.getLevelReading();
        this.nation = studentEntity.getParent().getNationality();
        this.visited = studentEntity.getVisited();
    }

    public static class Base64Deserializer extends com.fasterxml.jackson.databind.JsonDeserializer<byte[]> {
        @Override
        public byte[] deserialize(com.fasterxml.jackson.core.JsonParser p, com.fasterxml.jackson.databind.DeserializationContext ctxt)
                throws IOException, JsonProcessingException {
            String base64 = p.getValueAsString();
            if (base64 == null) {
                return null;
            }
            return Base64.getDecoder().decode(base64);
        }
    }


    public static class Base64Serializer extends com.fasterxml.jackson.databind.JsonSerializer<byte[]> {
        @Override
        public void serialize(byte[] value, com.fasterxml.jackson.core.JsonGenerator gen, com.fasterxml.jackson.databind.SerializerProvider serializers)
                throws IOException {
            gen.writeString(Base64.getEncoder().encodeToString(value));
        }
    }
}
