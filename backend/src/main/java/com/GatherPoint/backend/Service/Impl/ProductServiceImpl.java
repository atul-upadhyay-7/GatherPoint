package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.ProductMapper;
import com.GatherPoint.backend.Model.Category;
import com.GatherPoint.backend.Model.Product;
import com.GatherPoint.backend.Repo.CategoryRepo;
import com.GatherPoint.backend.Repo.ProductRepo;
import com.GatherPoint.backend.Service.ProductService;
import com.GatherPoint.backend.dto.Request.ProductRequest;
import com.GatherPoint.backend.dto.Response.ProductResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;

    public ProductServiceImpl(ProductRepo productRepo, CategoryRepo categoryRepo) {
        this.productRepo = productRepo;
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<ProductResponse> getAll() {
        return productRepo.findAll().stream().map(ProductMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public ProductResponse getById(Long id) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        return ProductMapper.toResponse(product);
    }

    @Override
    public ProductResponse create(ProductRequest request) {
        Category category = request.getCategoryId() != null
                ? categoryRepo.findById(request.getCategoryId()).orElse(null)
                : null;
        Product product = ProductMapper.toEntity(request, category);
        product = productRepo.save(product);
        return ProductMapper.toResponse(product);
    }

    @Override
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = productRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
        Category category = request.getCategoryId() != null
                ? categoryRepo.findById(request.getCategoryId()).orElse(null)
                : null;
        ProductMapper.updateEntity(product, request, category);
        product = productRepo.save(product);
        return ProductMapper.toResponse(product);
    }

    @Override
    public void delete(Long id) {
        productRepo.deleteById(id);
    }

    @Override
    public List<ProductResponse> getByCategory(Long categoryId) {
        return productRepo.findByCategoryId(categoryId).stream()
                .map(ProductMapper::toResponse).collect(Collectors.toList());
    }
}
