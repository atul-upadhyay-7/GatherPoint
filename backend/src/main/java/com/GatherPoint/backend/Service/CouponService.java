package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.CouponRequest;
import com.GatherPoint.backend.dto.Response.CouponResponse;

import java.util.List;

public interface CouponService {
    List<CouponResponse> getAll();
    CouponResponse create(CouponRequest request);
    CouponResponse update(Long id, CouponRequest request);
    void delete(Long id);
}
