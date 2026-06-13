package com.GatherPoint.backend.dto.Request;

import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class OrderRequest {
    private Long tableId;
    private Long customerId;
    private Long employeeId;
    private BigDecimal subtotal;
    private BigDecimal tax;
    private BigDecimal discount;
    private BigDecimal total;
    private List<OrderItemRequest> items;
}
