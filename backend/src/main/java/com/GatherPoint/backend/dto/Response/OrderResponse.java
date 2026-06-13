package com.GatherPoint.backend.dto.Response;

import com.GatherPoint.backend.Constants.OrderStatus;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private OrderStatus status;
    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal total;
    private CustomerResponse customer;
    private EmployeeResponse employee;
    private TableResponse table;
    private LocalDateTime createdAt;
    private List<OrderItemResponse> items;
}
