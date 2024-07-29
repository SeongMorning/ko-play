package com.edu.koplay.controller.parent;

import com.edu.koplay.service.parent.ParentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.edu.koplay.model.*;
//import com.edu.koplay.service.ParentService;

import java.util.List;

@RestController
@RequestMapping("/parents")
public class ParentController {
    private ParentService parentService;

    @Autowired
    public ParentController(ParentService parentService) {
        this.parentService = parentService;
    }

    @PostMapping("/signin")
    public Parent signIn(@RequestBody Parent parent) {
        return parentService.signIn(parent);
    }

    @GetMapping("/signout")
    public void signOut() {
        parentService.signOut();
    }

    @PutMapping("/nation")
    public void changeNation( @RequestParam Long parentId, @RequestParam String nation) {
        parentService.changeNation(parentId, nation);
    }

    @PostMapping("/child")
    public Parent createChild(@RequestBody Student student) {
        return parentService.createChild(student);
    }

    @GetMapping("/info")
    public Parent getParentInfo(@RequestParam Long parentId) {
        return parentService.getParentInfo(parentId);
    }

    @GetMapping("/children")
    public List<Student> getChildren(@RequestParam Long parentId) {
        return parentService.getChildren(parentId);
    }

    @DeleteMapping("/child/{childId}")
    public void deleteChild(@PathVariable Long childId) {
        parentService.deleteChild(childId);
    }

    @GetMapping("/child/{childId}")
    public Student getChild(@PathVariable Long childId) {
        return parentService.getChild(childId);
    }

    @GetMapping("/child/{childId}/statistics")
    public String getChildStatistics(@PathVariable Long childId) {
        return parentService.getChildStatistics(childId);
    }
}

