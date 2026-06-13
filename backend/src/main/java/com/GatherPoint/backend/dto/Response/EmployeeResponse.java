package com.GatherPoint.backend.dto.Response;

import com.GatherPoint.backend.Constants.Role;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class EmployeeResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private boolean active;
}
