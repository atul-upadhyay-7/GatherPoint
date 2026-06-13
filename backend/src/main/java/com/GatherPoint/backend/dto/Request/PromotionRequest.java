package com.GatherPoint.backend.dto.Request;

import com.GatherPoint.backend.Constants.DiscountType;
import com.GatherPoint.backend.Constants.PromotionScope;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class PromotionRequest {
    private String name;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private PromotionScope scope;
    private Integer minQuantity;
    private BigDecimal minOrderAmount;
    private Boolean active;
    private Long productId;
}
