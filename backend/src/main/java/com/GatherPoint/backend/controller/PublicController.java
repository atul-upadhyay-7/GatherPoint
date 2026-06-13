package com.GatherPoint.backend.controller;

import com.GatherPoint.backend.Constants.OrderStatus;
import com.GatherPoint.backend.Model.*;
import com.GatherPoint.backend.Repo.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/public")
@RequiredArgsConstructor
public class PublicController {

    private final ProductRepo productRepo;
    private final CategoryRepo categoryRepo;
    private final RestaurantTableRepo tableRepo;
    private final BookingRepo bookingRepo;
    private final CustomerRepo customerRepo;
    private final OrderRepo orderRepo;
    private final FloorRepo floorRepo;

    @GetMapping("/categories")
    public List<Category> getCategories() {
        return categoryRepo.findAll();
    }

    @GetMapping("/products")
    public List<Product> getAvailableProducts() {
        return productRepo.findByAvailableTrue();
    }

    @GetMapping("/tables")
    public List<RestaurantTable> getTables(@RequestParam(required = false) Long floorId) {
        if (floorId != null) {
            return tableRepo.findByFloorIdAndActiveTrue(floorId);
        }
        return tableRepo.findByActiveTrue();
    }

    @GetMapping("/floors")
    public List<Floor> getFloors() {
        return floorRepo.findAll();
    }

    @PostMapping("/bookings")
    public ResponseEntity<Booking> createBooking(@RequestBody Booking booking) {
        if (booking.getTable() != null && booking.getTable().getId() != null) {
            Optional<RestaurantTable> tableOpt = tableRepo.findById(booking.getTable().getId());
            tableOpt.ifPresent(booking::setTable);
        }
        booking.setCreatedAt(LocalDateTime.now());
        if (booking.getStatus() == null) booking.setStatus("CONFIRMED");
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingRepo.save(booking));
    }

    @PostMapping("/customers")
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer saved = customerRepo.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PostMapping("/orders")
    public ResponseEntity<?> placeOrder(@RequestBody PublicOrderRequest request) {
        if (request.items == null || request.items.isEmpty()) {
            return ResponseEntity.badRequest().body("Order must have at least one item");
        }

        Order order = new Order();
        order.setOrderNumber("ORD-" + System.currentTimeMillis());
        order.setStatus(OrderStatus.DRAFT);
        order.setCreatedAt(LocalDateTime.now());

        if (request.tableId != null) {
            tableRepo.findById(request.tableId).ifPresent(order::setTable);
        }

        if (request.customerId != null) {
            customerRepo.findById(request.customerId).ifPresent(order::setCustomer);
        }

        BigDecimal subtotal = BigDecimal.ZERO;
        BigDecimal totalTax = BigDecimal.ZERO;
        java.util.ArrayList<OrderItem> items = new java.util.ArrayList<>();

        for (PublicOrderRequest.ItemRequest itemReq : request.items) {
            Optional<Product> prodOpt = productRepo.findById(itemReq.productId);
            if (prodOpt.isEmpty()) continue;
            Product product = prodOpt.get();
            OrderItem oi = new OrderItem();
            oi.setOrder(order);
            oi.setProduct(product);
            oi.setQuantity(itemReq.quantity);
            BigDecimal unitPrice = product.getPrice();
            oi.setUnitPrice(unitPrice);
            BigDecimal lineTotal = unitPrice.multiply(BigDecimal.valueOf(itemReq.quantity));
            oi.setTotalPrice(lineTotal);
            subtotal = subtotal.add(lineTotal);
            BigDecimal taxAmount = lineTotal.multiply(product.getTax()).divide(BigDecimal.valueOf(100));
            totalTax = totalTax.add(taxAmount);
            items.add(oi);
        }

        order.setItems(items);
        order.setSubtotal(subtotal);
        order.setTax(totalTax);
        order.setDiscount(BigDecimal.ZERO);
        order.setTotal(subtotal.add(totalTax));

        Order saved = orderRepo.save(order);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping("/orders/{orderNumber}")
    public ResponseEntity<Order> getOrder(@PathVariable String orderNumber) {
        Optional<Order> order = orderRepo.findByOrderNumber(orderNumber);
        return order.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    public static class PublicOrderRequest {
        public Long tableId;
        public Long customerId;
        public List<ItemRequest> items;

        public static class ItemRequest {
            public Long productId;
            public int quantity;
        }
    }
}
