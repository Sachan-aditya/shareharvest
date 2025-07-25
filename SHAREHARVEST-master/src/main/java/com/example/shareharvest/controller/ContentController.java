package com.example.shareharvest.controller;

import com.example.shareharvest.services.LanguageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/content")
public class ContentController {
    @Autowired
    private LanguageService languageService;

    @GetMapping("/{language}")
    public ResponseEntity<Map<String, String>> getContent(@PathVariable String language) {
        return ResponseEntity.ok(languageService.getContent(language));
    }
}