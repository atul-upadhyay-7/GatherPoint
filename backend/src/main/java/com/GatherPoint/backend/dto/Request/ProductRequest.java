package com.GatherPoint.backend.dto.Request;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductRequest {
    private String productName;
    private BigDecimal price;
    private String uom;
    private BigDecimal tax;
    private String description;
    private Long categoryId;
}
