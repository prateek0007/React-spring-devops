package com.example.backend.controller;

import com.example.backend.dto.ContactRequest;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class ContactController {

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitForm(
            @Valid @RequestBody ContactRequest request) {

        return ResponseEntity.ok(
                Map.of("message", "Thank you for your time.")
        );
    }
}
