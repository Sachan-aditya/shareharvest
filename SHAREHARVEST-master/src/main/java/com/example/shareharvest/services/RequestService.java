package com.example.shareharvest.services;

import com.example.shareharvest.models.Request;
import com.example.shareharvest.repository.RequestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestService {

    @Autowired
    private RequestRepository requestRepository;

    @Autowired
    private FoodItemService foodItemService; // Inject FoodItemService

    public Request createRequest(Request request) throws Exception {
        // Deduct quantity immediately when request is created
        foodItemService.deductFoodItemQuantity(request.getFoodItem().getId(), request.getRequestedQuantity());
        return requestRepository.save(request);
    }

    public List<Request> getRequestsByReceiver(String receiverId) {
        return requestRepository.findByReceiverId(receiverId);
    }

    public List<Request> getRequestsByDonorFoodItem(String donorId) {
        return requestRepository.findByFoodItemDonorId(donorId);
    }

    public Optional<Request> getRequestById(String id) {
        return requestRepository.findById(id);
    }

    public Request updateRequestStatus(String id, String status) throws Exception {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new Exception("Request not found"));
        request.setStatus(status);

        if ("REJECTED".equals(status)) {
            // Return quantity if request is rejected
            foodItemService.returnFoodItemQuantity(request.getFoodItem().getId(), request.getRequestedQuantity());
        }

        return requestRepository.save(request);
    }
}