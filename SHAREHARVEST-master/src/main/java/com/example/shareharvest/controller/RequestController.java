package com.example.shareharvest.controller;

import com.example.shareharvest.models.Request;
import com.example.shareharvest.models.User;
import com.example.shareharvest.services.FoodItemService;
import com.example.shareharvest.services.RequestService;
import com.example.shareharvest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/requests")
public class RequestController {

    @Autowired
    private RequestService requestService;

    @Autowired
    private UserService userService;

    @Autowired
    private FoodItemService foodItemService;

    @PostMapping
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        try {
            // Ensure receiver is fetched to establish DBRef relationship
            User receiver = userService.findById(request.getReceiver().getId());
            request.setReceiver(receiver);
            // The foodItem in the request body should already have its ID set
            Request newRequest = requestService.createRequest(request);
            return ResponseEntity.ok(newRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Or a more specific error object
        }
    }

    @GetMapping("/receiver/{receiverId}")
    public ResponseEntity<List<Request>> getRequestsByReceiver(@PathVariable String receiverId) {
        List<Request> requests = requestService.getRequestsByReceiver(receiverId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Request>> getRequestsByDonorFoodItem(@PathVariable String donorId) {
        List<Request> requests = requestService.getRequestsByDonorFoodItem(donorId);
        return ResponseEntity.ok(requests);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Request> getRequestById(@PathVariable String id) {
        Optional<Request> request = requestService.getRequestById(id);
        return request.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Request> updateRequestStatus(@PathVariable String id, @RequestBody String status) {
        try {
            Request updatedRequest = requestService.updateRequestStatus(id, status);
            // Quantity deduction is now handled in RequestService.createRequest for ACCEPTED or REJECTED
            // So, remove the explicit deduction here.
            return ResponseEntity.ok(updatedRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null); // Or a more specific error object
        }
    }
}