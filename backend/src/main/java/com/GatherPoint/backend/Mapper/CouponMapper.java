package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Coupon;
import com.GatherPoint.backend.dto.Request.CouponRequest;
import com.GatherPoint.backend.dto.Response.CouponResponse;

public class CouponMapper {

    public static CouponResponse toResponse(Coupon coupon) {
        return new CouponResponse(coupon.getId(), coupon.getCode(), coupon.getDiscountType(),
                coupon.getDiscountValue(), coupon.isActive());
    }

    public static Coupon toEntity(CouponRequest request) {
        return Coupon.builder().code(request.getCode()).discountType(request.getDiscountType())
                .discountValue(request.getDiscountValue())
                .active(request.getActive() != null ? request.getActive() : true).build();
    }

    public static void updateEntity(Coupon coupon, CouponRequest request) {
        coupon.setCode(request.getCode());
        coupon.setDiscountType(request.getDiscountType());
        coupon.setDiscountValue(request.getDiscountValue());
        coupon.setActive(request.getActive() != null ? request.getActive() : coupon.isActive());
    }
}
