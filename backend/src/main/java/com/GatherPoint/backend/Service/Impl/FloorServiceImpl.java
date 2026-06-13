package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.FloorMapper;
import com.GatherPoint.backend.Model.Floor;
import com.GatherPoint.backend.Repo.FloorRepo;
import com.GatherPoint.backend.Service.FloorService;
import com.GatherPoint.backend.dto.Request.FloorRequest;
import com.GatherPoint.backend.dto.Response.FloorResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FloorServiceImpl implements FloorService {

    private final FloorRepo floorRepo;

    public FloorServiceImpl(FloorRepo floorRepo) {
        this.floorRepo = floorRepo;
    }

    @Override
    public List<FloorResponse> getAll() {
        return floorRepo.findAll().stream().map(FloorMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public FloorResponse create(FloorRequest request) {
        Floor floor = FloorMapper.toEntity(request);
        floor = floorRepo.save(floor);
        return FloorMapper.toResponse(floor);
    }

    @Override
    public FloorResponse update(Long id, FloorRequest request) {
        Floor floor = floorRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Floor not found with id: " + id));
        FloorMapper.updateEntity(floor, request);
        floor = floorRepo.save(floor);
        return FloorMapper.toResponse(floor);
    }

    @Override
    public void delete(Long id) {
        floorRepo.deleteById(id);
    }
}
