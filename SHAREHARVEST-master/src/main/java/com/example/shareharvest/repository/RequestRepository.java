package com.example.shareharvest.repository;

import com.example.shareharvest.models.Request;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends MongoRepository<Request, String> {
    List<Request> findByReceiverId(String receiverId);
    List<Request> findByFoodItemDonorId(String foodItemDonorId);
}