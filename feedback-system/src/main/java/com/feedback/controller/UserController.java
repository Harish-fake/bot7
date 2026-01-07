package com.feedback.controller;

import com.feedback.model.User;
import com.feedback.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:4200")
@RequiredArgsConstructor
public class UserController {
    
    private final UserService userService;
    
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable String id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(@PathVariable String id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateProfile(id, user));
    }
}
