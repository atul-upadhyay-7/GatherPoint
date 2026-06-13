package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.CategoryMapper;
import com.GatherPoint.backend.Model.Category;
import com.GatherPoint.backend.Repo.CategoryRepo;
import com.GatherPoint.backend.Service.CategoryService;
import com.GatherPoint.backend.dto.Request.CategoryRequest;
import com.GatherPoint.backend.dto.Response.CategoryResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepo categoryRepo;

    public CategoryServiceImpl(CategoryRepo categoryRepo) {
        this.categoryRepo = categoryRepo;
    }

    @Override
    public List<CategoryResponse> getAll() {
        return categoryRepo.findAll().stream().map(CategoryMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public CategoryResponse getById(Long id) {
        Category category = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        return CategoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse create(CategoryRequest request) {
        Category category = CategoryMapper.toEntity(request);
        category = categoryRepo.save(category);
        return CategoryMapper.toResponse(category);
    }

    @Override
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = categoryRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found with id: " + id));
        CategoryMapper.updateEntity(category, request);
        category = categoryRepo.save(category);
        return CategoryMapper.toResponse(category);
    }

    @Override
    public void delete(Long id) {
        categoryRepo.deleteById(id);
    }
}
