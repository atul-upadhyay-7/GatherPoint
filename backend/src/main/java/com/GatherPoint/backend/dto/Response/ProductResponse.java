package com.GatherPoint.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class ProductResponse {
    private Long id;
    private String productName;
    private BigDecimal price;
    private String uom;
    private BigDecimal tax;
    private String description;
    private CategoryResponse category;
}
