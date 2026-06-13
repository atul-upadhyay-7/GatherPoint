package com.GatherPoint.backend.dto.Request;

import com.GatherPoint.backend.Constants.Role;
import lombok.Data;

@Data
public class EmployeeRequest {
    private String name;
    private String email;
    private String password;
    private Role role;
}
