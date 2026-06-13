package com.GatherPoint.backend.dto.Request;

import lombok.Data;

@Data
public class CustomerRequest {
    private String name;
    private String email;
    private String phone;
}
