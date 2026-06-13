package com.GatherPoint.backend.dto.Request;

import lombok.Data;

@Data
public class TableRequest {
    private String tableNumber;
    private Integer seats;
    private Boolean active;
    private Long floorId;
}
