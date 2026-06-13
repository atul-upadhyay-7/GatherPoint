package com.GatherPoint.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class PaymentResponse {
    private Long id;
    private BigDecimal amount;
    private String method;
    private String transactionRef;
    private LocalDateTime createdAt;
    private Long orderId;
}
