package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Constants.OrderStatus;
import com.GatherPoint.backend.Mapper.PaymentMapper;
import com.GatherPoint.backend.Model.Order;
import com.GatherPoint.backend.Model.Payment;
import com.GatherPoint.backend.Repo.OrderRepo;
import com.GatherPoint.backend.Repo.PaymentRepo;
import com.GatherPoint.backend.Service.PaymentService;
import com.GatherPoint.backend.dto.Request.PaymentRequest;
import com.GatherPoint.backend.dto.Response.PaymentResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class PaymentServiceImpl implements PaymentService {

    private final PaymentRepo paymentRepo;
    private final OrderRepo orderRepo;

    public PaymentServiceImpl(PaymentRepo paymentRepo, OrderRepo orderRepo) {
        this.paymentRepo = paymentRepo;
        this.orderRepo = orderRepo;
    }

    @Override
    @Transactional
    public PaymentResponse processCashPayment(PaymentRequest request, BigDecimal tenderedAmount) {
        Order order = orderRepo.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
        Payment payment = Payment.builder()
                .amount(request.getAmount())
                .method("CASH")
                .transactionRef("CASH-" + System.currentTimeMillis())
                .createdAt(LocalDateTime.now())
                .order(order)
                .build();
        payment = paymentRepo.save(payment);
        order.setStatus(OrderStatus.PAID);
        orderRepo.save(order);
        return PaymentMapper.toResponse(payment);
    }

    @Override
    @Transactional
    public PaymentResponse processCardPayment(PaymentRequest request) {
        Order order = orderRepo.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
        Payment payment = Payment.builder()
                .amount(request.getAmount())
                .method("CARD")
                .transactionRef(request.getTransactionRef())
                .createdAt(LocalDateTime.now())
                .order(order)
                .build();
        payment = paymentRepo.save(payment);
        order.setStatus(OrderStatus.PAID);
        orderRepo.save(order);
        return PaymentMapper.toResponse(payment);
    }

    @Override
    @Transactional
    public PaymentResponse processUpiPayment(PaymentRequest request) {
        Order order = orderRepo.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));
        Payment payment = Payment.builder()
                .amount(request.getAmount())
                .method("UPI")
                .transactionRef(request.getTransactionRef())
                .createdAt(LocalDateTime.now())
                .order(order)
                .build();
        payment = paymentRepo.save(payment);
        order.setStatus(OrderStatus.PAID);
        orderRepo.save(order);
        return PaymentMapper.toResponse(payment);
    }
}
