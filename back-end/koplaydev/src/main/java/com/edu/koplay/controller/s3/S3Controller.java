package com.edu.koplay.controller.s3;


import com.edu.koplay.service.S3ImageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/s3")
public class S3Controller {
    S3ImageService s3ImageService;

    S3Controller(S3ImageService s3ImageService){
        this.s3ImageService = s3ImageService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> s3Upload(@RequestPart(value = "image", required = false) MultipartFile image){

        try{
            ResponseEntity<?> profileImage = s3ImageService.upload(image);
            return ResponseEntity.ok(profileImage);
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }

    }

    @GetMapping("/delete")
    public ResponseEntity<?> s3delete(@RequestParam String addr){
        try{
            s3ImageService.deleteImageFromS3(addr);

            return ResponseEntity.ok("삭제되었어용~");
        }catch (Exception e){
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
