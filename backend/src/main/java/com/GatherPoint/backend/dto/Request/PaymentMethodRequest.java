package com.GatherPoint.backend.dto.Request;

import lombok.Data;

@Data
public class PaymentMethodRequest {
    private String name;
    private Boolean enabled;
    private String upiId;
}
