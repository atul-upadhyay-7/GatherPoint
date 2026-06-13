package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.FloorRequest;
import com.GatherPoint.backend.dto.Response.FloorResponse;

import java.util.List;

public interface FloorService {
    List<FloorResponse> getAll();
    FloorResponse create(FloorRequest request);
    FloorResponse update(Long id, FloorRequest request);
    void delete(Long id);
}
