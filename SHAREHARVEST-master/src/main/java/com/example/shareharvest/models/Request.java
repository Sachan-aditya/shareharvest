package com.example.shareharvest.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DBRef;
import lombok.Getter;
import lombok.Setter;

@Document(collection = "requests")
@Getter
@Setter
public class Request {
    @Id
    private String id;

    @DBRef
    private Fooditem foodItem;

    @DBRef
    private User receiver;

    private String status; // e.g., PENDING, ACCEPTED, REJECTED
    private int requestedQuantity;

    // Getters and Setters (Lombok handles these, but explicit for clarity/debugging)
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Fooditem getFoodItem() {
        return foodItem;
    }

    public void setFoodItem(Fooditem foodItem) {
        this.foodItem = foodItem;
    }

    public User getReceiver() {
        return receiver;
    }

    public void setReceiver(User receiver) {
        this.receiver = receiver;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRequestedQuantity() {
        return requestedQuantity;
    }

    public void setRequestedQuantity(int requestedQuantity) {
        this.requestedQuantity = requestedQuantity;
    }
}
