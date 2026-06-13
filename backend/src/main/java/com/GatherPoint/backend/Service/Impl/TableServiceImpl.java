package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.TableMapper;
import com.GatherPoint.backend.Model.Floor;
import com.GatherPoint.backend.Model.RestaurantTable;
import com.GatherPoint.backend.Repo.FloorRepo;
import com.GatherPoint.backend.Repo.RestaurantTableRepo;
import com.GatherPoint.backend.Service.TableService;
import com.GatherPoint.backend.dto.Request.TableRequest;
import com.GatherPoint.backend.dto.Response.TableResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TableServiceImpl implements TableService {

    private final RestaurantTableRepo tableRepo;
    private final FloorRepo floorRepo;

    @Override
    public List<TableResponse> getAll() {
        return tableRepo.findAll().stream().map(TableMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public TableResponse create(TableRequest request) {
        Floor floor = request.getFloorId() != null
                ? floorRepo.findById(request.getFloorId())
                .orElseThrow(() -> new RuntimeException("Floor not found with id: " + request.getFloorId()))
                : null;
        RestaurantTable table = TableMapper.toEntity(request, floor);
        table = tableRepo.save(table);
        return TableMapper.toResponse(table);
    }

    @Override
    public TableResponse update(Long id, TableRequest request) {
        RestaurantTable table = tableRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Table not found with id: " + id));
        Floor floor = request.getFloorId() != null
                ? floorRepo.findById(request.getFloorId()).orElse(null)
                : null;
        TableMapper.updateEntity(table, request, floor);
        table = tableRepo.save(table);
        return TableMapper.toResponse(table);
    }

    @Override
    public void delete(Long id) {
        tableRepo.deleteById(id);
    }

    @Override
    public List<TableResponse> getByFloor(Long floorId) {
        return tableRepo.findByFloorId(floorId).stream()
                .map(TableMapper::toResponse).collect(Collectors.toList());
    }
}
