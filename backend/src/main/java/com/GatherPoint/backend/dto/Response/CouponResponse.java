package com.GatherPoint.backend.dto.Response;

import com.GatherPoint.backend.Constants.DiscountType;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.math.BigDecimal;

@Data
@AllArgsConstructor
public class CouponResponse {
    private Long id;
    private String code;
    private DiscountType discountType;
    private BigDecimal discountValue;
    private boolean active;
}
