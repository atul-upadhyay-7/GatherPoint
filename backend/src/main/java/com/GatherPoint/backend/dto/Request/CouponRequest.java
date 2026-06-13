package com.GatherPoint.backend.dto.Request;

import com.GatherPoint.backend.Constants.DiscountType;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class CouponRequest {
    private String code;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private Boolean active;
}
