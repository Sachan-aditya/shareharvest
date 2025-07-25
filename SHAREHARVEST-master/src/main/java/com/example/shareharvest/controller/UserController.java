package com.example.shareharvest.controller;
import com.example.shareharvest.models.User;
import com.example.shareharvest.services.GoogleAuthService;
import com.example.shareharvest.services.SocialShareService;
import com.example.shareharvest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private SocialShareService socialShareService;

    @Autowired
    private GoogleAuthService googleAuthService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User registeredUser = userService.registerUser(user);
            return ResponseEntity.ok(registeredUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            User loggedInUser = userService.loginUser(user.getUsername(), user.getPassword());
            return ResponseEntity.ok(loggedInUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/google-login")
    public ResponseEntity<?> googleLogin(@RequestBody String idTokenString) {
        try {
            GoogleIdToken.Payload payload = googleAuthService.verifyGoogleIdToken(idTokenString);
            if (payload == null) {
                return ResponseEntity.badRequest().body("Invalid Google ID Token");
            }

            String email = payload.getEmail();
            String username = (String) payload.get("name");
            String photoUrl = (String) payload.get("picture");

            User user = userService.loginOrCreateGoogleUser(email, username, photoUrl);
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{id}/points")
    public ResponseEntity<Void> addPoints(@PathVariable String id, @RequestParam int points) {
        userService.addPoints(id, points);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<User>> getLeaderboard() {
        return ResponseEntity.ok(userService.getTopUsers());
    }
    @GetMapping("/{id}/share-link")
    public ResponseEntity<String> getShareLink(@PathVariable String id) {
        return ResponseEntity.ok(socialShareService.generateShareLink(id));
    }
    @PutMapping("/{id}/register-partner")
    public ResponseEntity<Void> registerPartner(@PathVariable String id, @RequestParam String userType) {
        userService.registerPartner(id, userType);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/partners")
    public ResponseEntity<List<User>> getPartners(@RequestParam String userType) {
        return ResponseEntity.ok(userService.getPartners(userType));
    }
}