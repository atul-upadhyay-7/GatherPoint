package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Order;
import com.GatherPoint.backend.Model.OrderItem;
import com.GatherPoint.backend.Model.Product;
import com.GatherPoint.backend.dto.Request.OrderItemRequest;
import com.GatherPoint.backend.dto.Request.OrderRequest;
import com.GatherPoint.backend.dto.Response.OrderItemResponse;
import com.GatherPoint.backend.dto.Response.OrderResponse;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderResponse toResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getItems() != null
                ? order.getItems().stream().map(OrderMapper::toItemResponse).collect(Collectors.toList())
                : Collections.emptyList();
        return new OrderResponse(order.getId(), order.getOrderNumber(), order.getStatus(),
                order.getSubtotal(), order.getTax(), order.getDiscount(), order.getTotal(),
                order.getCustomer() != null ? CustomerMapper.toResponse(order.getCustomer()) : null,
                order.getEmployee() != null ? EmployeeMapper.toResponse(order.getEmployee()) : null,
                order.getTable() != null ? TableMapper.toResponse(order.getTable()) : null,
                order.getCreatedAt(), itemResponses);
    }

    public static OrderItemResponse toItemResponse(OrderItem item) {
        return new OrderItemResponse(item.getId(), item.getQuantity(), item.getUnitPrice(),
                item.getTotalPrice(),
                item.getProduct() != null ? ProductMapper.toResponse(item.getProduct()) : null);
    }

    public static OrderItem toItemEntity(OrderItemRequest request, Product product, Order order) {
        return OrderItem.builder().quantity(request.getQuantity()).unitPrice(request.getUnitPrice())
                .totalPrice(request.getUnitPrice().multiply(java.math.BigDecimal.valueOf(request.getQuantity())))
                .product(product).order(order).build();
    }
}
