package com.example.shareharvest.controller;

import com.example.shareharvest.models.Fooditem;
import com.example.shareharvest.models.User;
import com.example.shareharvest.services.FoodItemService;
import com.example.shareharvest.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/food-items")
public class FoodItemController {

    @Autowired
    private FoodItemService foodItemService;

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<Fooditem>> getAllFoodItems() {
        List<Fooditem> foodItems = foodItemService.getAvailableFoodItems();
        return ResponseEntity.ok(foodItems);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Fooditem> getFoodItemById(@PathVariable String id) {
        Fooditem foodItem = foodItemService.getFoodItemById(id);
        if (foodItem != null) {
            return ResponseEntity.ok(foodItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public ResponseEntity<Fooditem> addFoodItem(@RequestBody Fooditem foodItem) {
        // Ensure the donor is fetched from DB to establish DBRef relationship
        User donor = userService.findById(foodItem.getDonor().getId());
        foodItem.setDonor(donor);
        Fooditem newFoodItem = foodItemService.addFoodItem(foodItem);
        return ResponseEntity.ok(newFoodItem);
    }

    @PutMapping("/{id}/available")
    public ResponseEntity<Void> updateFoodItemAvailability(
            @PathVariable String id, @RequestParam boolean available) {
        foodItemService.updateFoodItemAvailability(id, available);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFoodItem(@PathVariable String id) {
        foodItemService.deleteFoodItem(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/donor/{donorId}")
    public ResponseEntity<List<Fooditem>> getFoodItemsByDonor(@PathVariable String donorId) {
        List<Fooditem> foodItems = foodItemService.getFoodItemsByDonor(donorId);
        return ResponseEntity.ok(foodItems);
    }
}