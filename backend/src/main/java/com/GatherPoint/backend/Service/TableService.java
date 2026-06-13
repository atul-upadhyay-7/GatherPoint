package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.TableRequest;
import com.GatherPoint.backend.dto.Response.TableResponse;

import java.util.List;

public interface TableService {
    List<TableResponse> getAll();
    TableResponse create(TableRequest request);
    TableResponse update(Long id, TableRequest request);
    void delete(Long id);
    List<TableResponse> getByFloor(Long floorId);
}
