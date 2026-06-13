package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.PromotionMapper;
import com.GatherPoint.backend.Model.Product;
import com.GatherPoint.backend.Model.Promotion;
import com.GatherPoint.backend.Repo.ProductRepo;
import com.GatherPoint.backend.Repo.PromotionRepo;
import com.GatherPoint.backend.Service.PromotionService;
import com.GatherPoint.backend.dto.Request.PromotionRequest;
import com.GatherPoint.backend.dto.Response.PromotionResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepo promotionRepo;
    private final ProductRepo productRepo;

    public PromotionServiceImpl(PromotionRepo promotionRepo, ProductRepo productRepo) {
        this.promotionRepo = promotionRepo;
        this.productRepo = productRepo;
    }

    @Override
    public List<PromotionResponse> getAll() {
        return promotionRepo.findAll().stream().map(PromotionMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public PromotionResponse create(PromotionRequest request) {
        Product product = request.getProductId() != null
                ? productRepo.findById(request.getProductId()).orElse(null)
                : null;
        Promotion promotion = PromotionMapper.toEntity(request, product);
        promotion = promotionRepo.save(promotion);
        return PromotionMapper.toResponse(promotion);
    }

    @Override
    public PromotionResponse update(Long id, PromotionRequest request) {
        Promotion promotion = promotionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Promotion not found with id: " + id));
        Product product = request.getProductId() != null
                ? productRepo.findById(request.getProductId()).orElse(null)
                : null;
        PromotionMapper.updateEntity(promotion, request, product);
        promotion = promotionRepo.save(promotion);
        return PromotionMapper.toResponse(promotion);
    }

    @Override
    public void delete(Long id) {
        promotionRepo.deleteById(id);
    }
}
