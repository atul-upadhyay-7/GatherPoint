package com.GatherPoint.backend.dto.Request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class SessionRequest {
    private BigDecimal openingAmount;
}
