package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.OrderRequest;
import com.GatherPoint.backend.dto.Response.OrderResponse;

import java.util.List;

public interface OrderService {
    List<OrderResponse> getAll();
    OrderResponse getById(Long id);
    OrderResponse create(OrderRequest request);
    OrderResponse update(Long id, OrderRequest request);
    void delete(Long id);
    void sendToKitchen(Long id);
}
