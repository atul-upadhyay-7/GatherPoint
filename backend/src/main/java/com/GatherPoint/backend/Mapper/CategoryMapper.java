package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Category;
import com.GatherPoint.backend.dto.Request.CategoryRequest;
import com.GatherPoint.backend.dto.Response.CategoryResponse;

public class CategoryMapper {

    public static CategoryResponse toResponse(Category category) {
        return new CategoryResponse(category.getId(), category.getName(), category.getColor());
    }

    public static Category toEntity(CategoryRequest request) {
        return Category.builder().name(request.getName()).color(request.getColor()).build();
    }

    public static void updateEntity(Category category, CategoryRequest request) {
        category.setName(request.getName());
        category.setColor(request.getColor());
    }
}
