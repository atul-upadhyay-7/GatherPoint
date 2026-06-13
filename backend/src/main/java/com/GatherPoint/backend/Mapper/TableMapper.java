package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Floor;
import com.GatherPoint.backend.Model.RestaurantTable;
import com.GatherPoint.backend.dto.Request.TableRequest;
import com.GatherPoint.backend.dto.Response.TableResponse;

public class TableMapper {

    public static TableResponse toResponse(RestaurantTable table) {
        return new TableResponse(table.getId(), table.getTableNumber(), table.getSeats(),
                table.isActive(), table.getFloor() != null ? table.getFloor().getId() : null);
    }

    public static RestaurantTable toEntity(TableRequest request, Floor floor) {
        return RestaurantTable.builder().tableNumber(request.getTableNumber()).seats(request.getSeats())
                .active(request.getActive() != null ? request.getActive() : true).floor(floor).build();
    }

    public static void updateEntity(RestaurantTable table, TableRequest request, Floor floor) {
        table.setTableNumber(request.getTableNumber());
        table.setSeats(request.getSeats());
        table.setActive(request.getActive() != null ? request.getActive() : table.isActive());
        table.setFloor(floor);
    }
}
