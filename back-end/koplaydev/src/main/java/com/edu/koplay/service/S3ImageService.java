package com.edu.koplay.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.UnsupportedEncodingException;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.util.*;

import com.amazonaws.util.IOUtils;
import com.edu.koplay.dto.GalleryDTO;
import com.edu.koplay.dto.ResponseDTO;
import com.edu.koplay.dto.StudentDTO;
import com.edu.koplay.model.Gallery;
import com.edu.koplay.model.Parent;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.GalleryRepository;
import com.edu.koplay.repository.ParentRepository;
import com.edu.koplay.repository.StudentRepository;
import com.edu.koplay.service.facade.ParentFacadeService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RequiredArgsConstructor
@Component
public class S3ImageService {

    private final AmazonS3 amazonS3;
    private final StudentRepository studentRepository;
    private final GalleryRepository galleryRepository;
    private final ParentFacadeService parentFacadeService;
    private final ParentRepository parentRepository;



    @Value("${cloud.aws.s3.bucketName}")
    private String bucketName;

    public ResponseEntity<?> upload(MultipartFile image, String folder) throws Exception {
        if(image == null || image.isEmpty() || Objects.isNull(image.getOriginalFilename())){
            throw new IOException("File is empty");
        }
        return this.uploadImage(image, folder);
    }

    private ResponseEntity<?> uploadImage(MultipartFile image, String folder) throws Exception {
        this.validateImageFileExtention(image.getOriginalFilename());
        try {
            return this.uploadImageToS3(image, folder);
        } catch (IOException e) {
            throw new IOException("uploadImage Exception");
        }
    }

    private void validateImageFileExtention(String filename) throws Exception {
        int lastDotIndex = filename.lastIndexOf(".");
        if (lastDotIndex == -1) {
            throw new Exception("no validation");
        }

        String extention = filename.substring(lastDotIndex + 1).toLowerCase();
        List<String> allowedExtentionList = Arrays.asList("jpg", "jpeg", "png", "gif");

        if (!allowedExtentionList.contains(extention)) {
            throw new Exception("not allowed Extention: " + extention);
        }
    }
    @Transactional
    protected ResponseEntity<?> uploadImageToS3(MultipartFile image, String folder) throws Exception {
        String originalFilename = image.getOriginalFilename(); //원본 파일 명
        String extension = originalFilename.substring(originalFilename.lastIndexOf(".")); //확장자 명
        String id = getAuthenticationData();

        String s3FileName = folder + "/" + UUID.randomUUID().toString().substring(0, 10) + originalFilename; //변경된 파일 명


        InputStream is = image.getInputStream();
        byte[] bytes = IOUtils.toByteArray(is);

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentType("image/" + extension);
        metadata.setContentLength(bytes.length);
        ByteArrayInputStream byteArrayInputStream = new ByteArrayInputStream(bytes);

        try{
            PutObjectRequest putObjectRequest =
                    new PutObjectRequest(bucketName, s3FileName, byteArrayInputStream, metadata)
                            .withCannedAcl(CannedAccessControlList.PublicRead);
            amazonS3.putObject(putObjectRequest); // put image to S3
        }catch (Exception e){
            e.printStackTrace();
            throw new Exception("Upload Error");
        }finally {
            byteArrayInputStream.close();
            is.close();
        }
        Optional<Student> byStudentId = studentRepository.findByStudentId(id);
        String url = amazonS3.getUrl(bucketName, s3FileName).toString();

        if (folder.equals("iamge")) {
            Optional<Parent> byId = parentRepository.findById(byStudentId.get().getParent().getParentIdx());
            Gallery gallery = Gallery.builder()
                    .student(byStudentId.get())
                    .parent(byId.get())
                    .snapshot(url)
                    .build();
            galleryRepository.save(gallery);

            List<Gallery> galleries = galleryRepository.findAllByStudentAndIsDeletedFalse(byStudentId.get());
            ResponseDTO<GalleryDTO> response = ResponseDTO.<GalleryDTO>builder().data(galleries.stream()
                    .map(GalleryDTO::new)
                    .toList()).build();

            return ResponseEntity.ok().body(response);
        }else if(folder.equals("profile")){
            Student student = byStudentId.orElseThrow();

            // S3에서 기존 프로필 이미지 삭제하기
            System.out.println("이미지"+student.getProfileImg());
            String oldS3FileName = student.getProfileImg().substring(student.getProfileImg().lastIndexOf("/") + 1);
            System.out.println(oldS3FileName);
            amazonS3.deleteObject(new DeleteObjectRequest(bucketName, "profile/" + oldS3FileName));

            student.setProfileImg(url);
            studentRepository.save(student);

            System.out.println(student.toString());

            StudentDTO dto = new StudentDTO(student);

            ResponseDTO<StudentDTO> response = ResponseDTO.<StudentDTO>builder().data(List.of(dto)).build();

            return ResponseEntity.ok().body(response);
        }
        ResponseDTO<String> response = ResponseDTO.<String>builder().error("fail save file").build();
        return ResponseEntity.badRequest().body(response);
    }
    @Transactional
    public void deleteImageFromS3(String imageAddress) throws Exception {
        String key = getKeyFromImageAddress(imageAddress);
        try{
            amazonS3.deleteObject(new DeleteObjectRequest(bucketName, key));
            Optional<Gallery> gallery = galleryRepository.findBySnapshot(imageAddress);
            if (gallery.isPresent()) {
                Long galleryIdx = gallery.get().getGalleryIdx();
                // galleryIdx를 사용하여 추가적인 작업 수행
            }
        }catch (Exception e){
            throw new Exception("Delete Error");
        }
    }

    private String getKeyFromImageAddress(String imageAddress) throws Exception {
        try{
            URL url = new URL(imageAddress);
            String decodingKey = URLDecoder.decode(url.getPath(), "UTF-8");
            return decodingKey.substring(1); // 맨 앞의 '/' 제거
        }catch (MalformedURLException | UnsupportedEncodingException e){
            throw new Exception("getKeyFromImageAddress Error");
        }
    }
    private String getAuthenticationData() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        return authentication.getName();
    }
}