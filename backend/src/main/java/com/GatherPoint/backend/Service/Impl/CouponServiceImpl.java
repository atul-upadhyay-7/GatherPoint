package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.CouponMapper;
import com.GatherPoint.backend.Model.Coupon;
import com.GatherPoint.backend.Repo.CouponRepo;
import com.GatherPoint.backend.Service.CouponService;
import com.GatherPoint.backend.dto.Request.CouponRequest;
import com.GatherPoint.backend.dto.Response.CouponResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CouponServiceImpl implements CouponService {

    private final CouponRepo couponRepo;

    public CouponServiceImpl(CouponRepo couponRepo) {
        this.couponRepo = couponRepo;
    }

    @Override
    public List<CouponResponse> getAll() {
        return couponRepo.findAll().stream().map(CouponMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public CouponResponse create(CouponRequest request) {
        Coupon coupon = CouponMapper.toEntity(request);
        coupon = couponRepo.save(coupon);
        return CouponMapper.toResponse(coupon);
    }

    @Override
    public CouponResponse update(Long id, CouponRequest request) {
        Coupon coupon = couponRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Coupon not found with id: " + id));
        CouponMapper.updateEntity(coupon, request);
        coupon = couponRepo.save(coupon);
        return CouponMapper.toResponse(coupon);
    }

    @Override
    public void delete(Long id) {
        couponRepo.deleteById(id);
    }
}
