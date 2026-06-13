package com.GatherPoint.backend.dto.Response;

import com.GatherPoint.backend.Constants.DiscountType;
import com.GatherPoint.backend.Constants.PromotionScope;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class PromotionResponse {
    private Long id;
    private String name;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private PromotionScope scope;
    private Integer minQuantity;
    private BigDecimal minOrderAmount;
    private boolean active;
    private ProductResponse product;
}
