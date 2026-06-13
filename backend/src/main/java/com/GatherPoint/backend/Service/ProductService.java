package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.ProductRequest;
import com.GatherPoint.backend.dto.Response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAll();
    ProductResponse getById(Long id);
    ProductResponse create(ProductRequest request);
    ProductResponse update(Long id, ProductRequest request);
    void delete(Long id);
    List<ProductResponse> getByCategory(Long categoryId);
}
