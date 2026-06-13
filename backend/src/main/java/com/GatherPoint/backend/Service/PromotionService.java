package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.PromotionRequest;
import com.GatherPoint.backend.dto.Response.PromotionResponse;

import java.util.List;

public interface PromotionService {
    List<PromotionResponse> getAll();
    PromotionResponse create(PromotionRequest request);
    PromotionResponse update(Long id, PromotionRequest request);
    void delete(Long id);
}
