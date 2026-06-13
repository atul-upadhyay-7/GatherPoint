package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.PaymentMethod;
import com.GatherPoint.backend.dto.Request.PaymentMethodRequest;
import com.GatherPoint.backend.dto.Response.PaymentMethodResponse;

public class PaymentMethodMapper {

    public static PaymentMethodResponse toResponse(PaymentMethod paymentMethod) {
        return new PaymentMethodResponse(paymentMethod.getId(), paymentMethod.getName(),
                paymentMethod.isEnabled(), paymentMethod.getUpiId());
    }

    public static PaymentMethod toEntity(PaymentMethodRequest request) {
        return PaymentMethod.builder().name(request.getName())
                .enabled(request.getEnabled() != null ? request.getEnabled() : true)
                .upiId(request.getUpiId()).build();
    }

    public static void updateEntity(PaymentMethod paymentMethod, PaymentMethodRequest request) {
        paymentMethod.setName(request.getName());
        paymentMethod.setEnabled(request.getEnabled() != null ? request.getEnabled() : paymentMethod.isEnabled());
        paymentMethod.setUpiId(request.getUpiId());
    }
}
