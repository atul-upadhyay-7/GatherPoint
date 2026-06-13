package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Payment;
import com.GatherPoint.backend.dto.Response.PaymentResponse;

public class PaymentMapper {

    public static PaymentResponse toResponse(Payment payment) {
        return new PaymentResponse(payment.getId(), payment.getAmount(), payment.getMethod(),
                payment.getTransactionRef(), payment.getCreatedAt(),
                payment.getOrder() != null ? payment.getOrder().getId() : null);
    }
}
