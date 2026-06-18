package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.User;
import com.GatherPoint.backend.dto.Request.EmployeeRequest;
import com.GatherPoint.backend.dto.Response.EmployeeResponse;

public class EmployeeMapper {

    public static EmployeeResponse toResponse(User user) {
        return new EmployeeResponse(
                user.getId(),
                user.getName(),
                user.getEmail(),
                user.getRole(),
                user.isActive(),
                user.isAllowOfflineSelling()
        );
    }

    public static User toEntity(EmployeeRequest request) {
        return User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(request.getRole())
                .active(true)
                .allowOfflineSelling(request.isAllowOfflineSelling())
                .build();
    }
}
