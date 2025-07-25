package com.example.shareharvest.services;

import com.example.shareharvest.models.Fooditem;
import com.example.shareharvest.repository.FoodItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FoodItemService {

    @Autowired
    private FoodItemRepository foodItemRepository;

    public List<Fooditem> getAllFoodItems() {
        return foodItemRepository.findAll();
    }

    public Fooditem addFoodItem(Fooditem foodItem) {
        return foodItemRepository.save(foodItem);
    }

    public List<Fooditem> getAvailableFoodItems() {
        return foodItemRepository.findByAvailable(true);
    }

    public Fooditem getFoodItemById(String id) {
        return foodItemRepository.findById(id).orElse(null);
    }

    public List<Fooditem> getFoodItemsByDonor(String donorId) {
        return foodItemRepository.findByDonorId(donorId);
    }

    public void updateFoodItemAvailability(String id, boolean available) {
        foodItemRepository.findById(id).ifPresent(foodItem -> {
            foodItem.setAvailable(available);
            foodItemRepository.save(foodItem);
        });
    }

    public void deductFoodItemQuantity(String foodItemId, int quantityToDeduct) throws Exception {
        Fooditem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() -> new Exception("Food item not found"));

        if (foodItem.getQuantity() < quantityToDeduct) {
            throw new Exception("Requested quantity exceeds available quantity");
        }

        foodItem.setQuantity(foodItem.getQuantity() - quantityToDeduct);
        if (foodItem.getQuantity() <= 0) {
            foodItem.setAvailable(false);
        }
        foodItemRepository.save(foodItem);
    }

    public void returnFoodItemQuantity(String foodItemId, int quantityToReturn) throws Exception {
        Fooditem foodItem = foodItemRepository.findById(foodItemId)
                .orElseThrow(() -> new Exception("Food item not found"));

        foodItem.setQuantity(foodItem.getQuantity() + quantityToReturn);
        foodItem.setAvailable(true); // If quantity is returned, it should be available again
        foodItemRepository.save(foodItem);
    }

    public void deleteFoodItem(String id) {
        foodItemRepository.deleteById(id);
    }
}
