package com.example.shareharvest.repository;

import com.example.shareharvest.models.Fooditem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FoodItemRepository extends MongoRepository<Fooditem, String> {
    List<Fooditem> findByAvailable(boolean available);
    List<Fooditem> findByDonorId(String donorId);
}
