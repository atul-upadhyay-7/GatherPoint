package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Floor;
import com.GatherPoint.backend.dto.Request.FloorRequest;
import com.GatherPoint.backend.dto.Response.FloorResponse;

import java.util.Collections;
import java.util.stream.Collectors;

public class FloorMapper {

    public static FloorResponse toResponse(Floor floor) {
        java.util.List<com.GatherPoint.backend.dto.Response.TableResponse> tableResponses = floor.getTables() != null
                ? floor.getTables().stream().map(TableMapper::toResponse).collect(Collectors.toList())
                : Collections.emptyList();
        return new FloorResponse(floor.getId(), floor.getName(), tableResponses);
    }

    public static Floor toEntity(FloorRequest request) {
        return Floor.builder().name(request.getName()).build();
    }

    public static void updateEntity(Floor floor, FloorRequest request) {
        floor.setName(request.getName());
    }
}
