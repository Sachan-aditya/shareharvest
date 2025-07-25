package com.example.shareharvest.services;

import org.springframework.stereotype.Service;

@Service
public class SocialShareService {

    private final String BASE_SHARE_URL = "https://shareharvest.com/share/"; // Replace with your actual domain

    public String generateShareLink(String itemId) {
        // In a real application, you might want to use a short URL service or a more complex token
        return BASE_SHARE_URL + itemId;
    }
}