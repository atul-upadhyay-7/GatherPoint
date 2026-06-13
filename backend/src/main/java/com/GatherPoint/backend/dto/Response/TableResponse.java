package com.GatherPoint.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TableResponse {
    private Long id;
    private Integer tableNumber;
    private Integer seats;
    private boolean active;
    private Long floorId;
}
