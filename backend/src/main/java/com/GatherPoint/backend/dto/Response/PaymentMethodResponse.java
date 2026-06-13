package com.GatherPoint.backend.dto.Response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PaymentMethodResponse {
    private Long id;
    private String name;
    private boolean enabled;
    private String upiId;
}
