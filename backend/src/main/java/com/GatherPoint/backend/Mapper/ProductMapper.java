package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Category;
import com.GatherPoint.backend.Model.Product;
import com.GatherPoint.backend.dto.Request.ProductRequest;
import com.GatherPoint.backend.dto.Response.CategoryResponse;
import com.GatherPoint.backend.dto.Response.ProductResponse;

public class ProductMapper {

    public static ProductResponse toResponse(Product product) {
        CategoryResponse categoryResponse = product.getCategory() != null
                ? CategoryMapper.toResponse(product.getCategory())
                : null;
        return new ProductResponse(product.getId(), product.getProductName(), product.getPrice(),
                product.getUom(), product.getTax(), product.getDescription(), categoryResponse);
    }

    public static Product toEntity(ProductRequest request, Category category) {
        return Product.builder().productName(request.getProductName()).price(request.getPrice())
                .uom(request.getUom()).tax(request.getTax()).description(request.getDescription())
                .category(category).build();
    }

    public static void updateEntity(Product product, ProductRequest request, Category category) {
        product.setProductName(request.getProductName());
        product.setPrice(request.getPrice());
        product.setUom(request.getUom());
        product.setTax(request.getTax());
        product.setDescription(request.getDescription());
        product.setCategory(category);
    }
}
