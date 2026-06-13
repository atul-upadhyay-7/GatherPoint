package com.GatherPoint.backend.dto.Request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class PaymentRequest {
    private Long orderId;
    private BigDecimal amount;
    private String method;
    private String transactionRef;
}
