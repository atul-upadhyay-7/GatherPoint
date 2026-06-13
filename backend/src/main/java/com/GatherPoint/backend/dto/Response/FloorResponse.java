package com.GatherPoint.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class FloorResponse {
    private Long id;
    private String name;
    private List<TableResponse> tables;
}
