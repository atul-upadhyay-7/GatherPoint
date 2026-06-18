package com.GatherPoint.backend.dto.Response;

import com.GatherPoint.backend.Constants.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeResponse {
    private Long id;
    private String name;
    private String email;
    private Role role;
    private boolean active;
    private boolean allowOfflineSelling;
}
