package com.example.shareharvest.services;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LanguageService {
    private Map<String, Map<String, String>> translations;

    @PostConstruct
    public void init() throws Exception {
        translations = new HashMap<>();
        ObjectMapper mapper = new ObjectMapper();
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();

        // Load all translation files from resources/i18n/
        Resource[] resources = resolver.getResources("classpath:i18n/*.json");
        for (Resource resource : resources) {
            String filename = resource.getFilename();
            String langCode = filename.substring(0, filename.lastIndexOf("."));
            Map<String, String> translation = mapper.readValue(resource.getInputStream(), Map.class);
            translations.put(langCode, translation);
        }
    }

    public Map<String, String> getContent(String language) {
        return translations.getOrDefault(language, translations.get("en"));
    }

    // New method to get a specific translation with parameters
    public String getTranslation(String language, String key, Object... params) {
        Map<String, String> langTranslations = translations.getOrDefault(language, translations.get("en"));
        String template = langTranslations.getOrDefault(key, key);
        return String.format(template, params);
    }
}