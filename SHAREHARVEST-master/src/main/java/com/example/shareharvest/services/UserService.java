package com.example.shareharvest.services;

import com.example.shareharvest.models.User;
import com.example.shareharvest.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Comparator;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) throws Exception {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new Exception("Username already exists");
        }
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new Exception("Email already exists");
        }
        // Hash password before saving in a real application
        return userRepository.save(user);
    }

    public User loginUser(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new Exception("User not found"));
        if (!user.getPassword().equals(password)) { // In a real application, compare hashed passwords
            throw new Exception("Invalid credentials");
        }
        return user;
    }

    public User loginOrCreateGoogleUser(String email, String username, String photoUrl) {
        return userRepository.findByEmail(email).map(existingUser -> {
            // Update existing user with Google info if necessary (e.g., photoUrl)
            if (photoUrl != null && !photoUrl.equals(existingUser.getPhotoUrl())) {
                existingUser.setPhotoUrl(photoUrl);
                userRepository.save(existingUser);
            }
            return existingUser;
        }).orElseGet(() -> {
            // Create new user for Google login
            User newUser = new User();
            newUser.setEmail(email);
            newUser.setUsername(username);
            newUser.setPhotoUrl(photoUrl);
            newUser.setRole("RECEIVER"); // Default role for new Google users
            newUser.setPoints(0);
            // Password can be null or generated for Google users
            return userRepository.save(newUser);
        });
    }

    public void addPoints(String userId, int points) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setPoints(user.getPoints() + points);
            userRepository.save(user);
        });
    }

    public List<User> getTopUsers() {
        List<User> users = userRepository.findAll();
        users.sort(Comparator.comparingInt(User::getPoints).reversed());
        return users;
    }

    public void registerPartner(String userId, String userType) {
        userRepository.findById(userId).ifPresent(user -> {
            user.setRole(userType); // Update role
            userRepository.save(user);
        });
    }

    public List<User> getPartners(String userType) {
        return userRepository.findByRole(userType);
    }

    public User findById(String userId) {
        return userRepository.findById(userId).orElse(null);
    }
}