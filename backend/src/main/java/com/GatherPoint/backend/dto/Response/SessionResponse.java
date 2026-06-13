package com.GatherPoint.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class SessionResponse {
    private Long id;
    private LocalDateTime openedAt;
    private LocalDateTime closedAt;
    private BigDecimal openingAmount;
    private BigDecimal closingAmount;
    private EmployeeResponse employee;
}
