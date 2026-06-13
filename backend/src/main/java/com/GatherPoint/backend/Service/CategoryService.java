package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.CategoryRequest;
import com.GatherPoint.backend.dto.Response.CategoryResponse;

import java.util.List;

public interface CategoryService {
    List<CategoryResponse> getAll();
    CategoryResponse getById(Long id);
    CategoryResponse create(CategoryRequest request);
    CategoryResponse update(Long id, CategoryRequest request);
    void delete(Long id);
}
