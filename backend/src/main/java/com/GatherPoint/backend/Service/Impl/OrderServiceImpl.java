package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Constants.OrderStatus;
import com.GatherPoint.backend.Constants.TicketStage;
import com.GatherPoint.backend.Mapper.OrderMapper;
import com.GatherPoint.backend.Model.*;
import com.GatherPoint.backend.Repo.*;
import com.GatherPoint.backend.Service.OrderService;
import com.GatherPoint.backend.dto.Request.OrderItemRequest;
import com.GatherPoint.backend.dto.Request.OrderRequest;
import com.GatherPoint.backend.dto.Response.OrderResponse;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepo orderRepo;
    private final ProductRepo productRepo;
    private final CustomerRepo customerRepo;
    private final RestaurantTableRepo tableRepo;
    private final UserRepo userRepo;
    private final KitchenTicketRepo kitchenTicketRepo;
    private final SimpMessagingTemplate messagingTemplate;

    public OrderServiceImpl(OrderRepo orderRepo, ProductRepo productRepo,
                            CustomerRepo customerRepo, RestaurantTableRepo tableRepo,
                            UserRepo userRepo, KitchenTicketRepo kitchenTicketRepo,
                            SimpMessagingTemplate messagingTemplate) {
        this.orderRepo = orderRepo;
        this.productRepo = productRepo;
        this.customerRepo = customerRepo;
        this.tableRepo = tableRepo;
        this.userRepo = userRepo;
        this.kitchenTicketRepo = kitchenTicketRepo;
        this.messagingTemplate = messagingTemplate;
    }

    @Override
    public List<OrderResponse> getAll() {
        return orderRepo.findAll().stream().map(OrderMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public OrderResponse getById(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        return OrderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse create(OrderRequest request) {
        Order order = Order.builder()
                .orderNumber("ORD-" + System.currentTimeMillis())
                .status(OrderStatus.DRAFT)
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .discount(request.getDiscount())
                .total(request.getTotal())
                .createdAt(LocalDateTime.now())
                .build();

        if (request.getCustomerId() != null) {
            order.setCustomer(customerRepo.findById(request.getCustomerId()).orElse(null));
        }
        if (request.getEmployeeId() != null) {
            order.setEmployee(userRepo.findById(request.getEmployeeId()).orElse(null));
        }
        if (request.getTableId() != null) {
            order.setTable(tableRepo.findById(request.getTableId()).orElse(null));
        }

        order = orderRepo.save(order);

        if (request.getItems() != null) {
            List<OrderItem> items = new ArrayList<>();
            for (OrderItemRequest itemReq : request.getItems()) {
                Product product = productRepo.findById(itemReq.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemReq.getProductId()));
                items.add(OrderMapper.toItemEntity(itemReq, product, order));
            }
            order.setItems(items);
            order = orderRepo.save(order);
        }

        return OrderMapper.toResponse(order);
    }

    @Override
    @Transactional
    public OrderResponse update(Long id, OrderRequest request) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));

        order.setSubtotal(request.getSubtotal());
        order.setTax(request.getTax());
        order.setDiscount(request.getDiscount());
        order.setTotal(request.getTotal());

        if (request.getCustomerId() != null) {
            order.setCustomer(customerRepo.findById(request.getCustomerId()).orElse(null));
        }
        if (request.getEmployeeId() != null) {
            order.setEmployee(userRepo.findById(request.getEmployeeId()).orElse(null));
        }
        if (request.getTableId() != null) {
            order.setTable(tableRepo.findById(request.getTableId()).orElse(null));
        }

        order = orderRepo.save(order);
        return OrderMapper.toResponse(order);
    }

    @Override
    public void delete(Long id) {
        orderRepo.deleteById(id);
    }

    @Override
    @Transactional
    public void sendToKitchen(Long id) {
        Order order = orderRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
        order.setStatus(OrderStatus.PAID);
        orderRepo.save(order);

        KitchenTicket ticket = KitchenTicket.builder()
                .orderNumber(order.getOrderNumber())
                .stage(TicketStage.TO_COOK)
                .createdAt(LocalDateTime.now())
                .order(order)
                .build();

        List<KitchenTicketItem> ticketItems = new ArrayList<>();
        if (order.getItems() != null) {
            for (OrderItem item : order.getItems()) {
                ticketItems.add(KitchenTicketItem.builder()
                        .productName(item.getProduct().getProductName())
                        .quantity(item.getQuantity())
                        .completed(false)
                        .ticket(ticket)
                        .build());
            }
        }
        ticket.setItems(ticketItems);
        kitchenTicketRepo.save(ticket);

        messagingTemplate.convertAndSend("/topic/kitchen", "New order sent to kitchen");
    }
}
