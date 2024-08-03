package com.edu.koplay.service;

import com.edu.koplay.model.Gallery;
import com.edu.koplay.model.Student;
import com.edu.koplay.repository.GalleryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
public class GalleryService {
    private GalleryRepository galleryRepository;

    @Autowired
    public GalleryService(GalleryRepository galleryRepository) {
        this.galleryRepository = galleryRepository;
    }

    public List<Gallery> deleteSnapshot(Long snapshotId, Student student) {
        Gallery gallery = galleryRepository.findByGalleryIdxAndStudentAndIsDeletedFalse(snapshotId, student).orElseThrow(() -> new NoSuchElementException("삭제할게없는데요..? 이미 없어요"));
        gallery.setIsDeleted(true);

        return galleryRepository.findAllByStudentAndIsDeletedFalse(student);
    }

    //studentid
    public List<Gallery> getAllGallery(Student student) {
        return galleryRepository.findAllByStudentAndIsDeletedFalse(student);
    }

}
