package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.PaymentRequest;
import com.GatherPoint.backend.dto.Response.PaymentResponse;

import java.math.BigDecimal;

public interface PaymentService {
    PaymentResponse processCashPayment(PaymentRequest request, BigDecimal tenderedAmount);
    PaymentResponse processCardPayment(PaymentRequest request);
    PaymentResponse processUpiPayment(PaymentRequest request);
}
