package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Product;
import com.GatherPoint.backend.Model.Promotion;
import com.GatherPoint.backend.dto.Request.PromotionRequest;
import com.GatherPoint.backend.dto.Response.PromotionResponse;

public class PromotionMapper {

    public static PromotionResponse toResponse(Promotion promotion) {
        return new PromotionResponse(promotion.getId(), promotion.getName(), promotion.getDiscountType(),
                promotion.getDiscountValue(), promotion.getScope(), promotion.getMinQuantity(),
                promotion.getMinOrderAmount(), promotion.isActive(),
                promotion.getProduct() != null ? ProductMapper.toResponse(promotion.getProduct()) : null);
    }

    public static Promotion toEntity(PromotionRequest request, Product product) {
        return Promotion.builder().name(request.getName()).discountType(request.getDiscountType())
                .discountValue(request.getDiscountValue()).scope(request.getScope())
                .minQuantity(request.getMinQuantity()).minOrderAmount(request.getMinOrderAmount())
                .active(request.getActive() != null ? request.getActive() : true).product(product).build();
    }

    public static void updateEntity(Promotion promotion, PromotionRequest request, Product product) {
        promotion.setName(request.getName());
        promotion.setDiscountType(request.getDiscountType());
        promotion.setDiscountValue(request.getDiscountValue());
        promotion.setScope(request.getScope());
        promotion.setMinQuantity(request.getMinQuantity());
        promotion.setMinOrderAmount(request.getMinOrderAmount());
        promotion.setActive(request.getActive() != null ? request.getActive() : promotion.isActive());
        promotion.setProduct(product);
    }
}
