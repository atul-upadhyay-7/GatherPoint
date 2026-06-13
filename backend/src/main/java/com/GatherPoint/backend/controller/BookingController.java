package com.GatherPoint.backend.controller;

import com.GatherPoint.backend.Model.Booking;
import com.GatherPoint.backend.Repo.BookingRepo;
import com.GatherPoint.backend.Repo.RestaurantTableRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.PatchMapping;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class BookingController {

    private final BookingRepo bookingRepo;
    private final RestaurantTableRepo tableRepo;

    @GetMapping
    public List<Booking> getAll() {
        return bookingRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Booking> getById(@PathVariable Long id) {
        return bookingRepo.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Booking> create(@RequestBody Booking booking) {
        if (booking.getTable() != null && booking.getTable().getId() != null) {
            tableRepo.findById(booking.getTable().getId()).ifPresent(booking::setTable);
        }
        booking.setCreatedAt(LocalDateTime.now());
        if (booking.getStatus() == null) booking.setStatus("CONFIRMED");
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingRepo.save(booking));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Booking> update(@PathVariable Long id, @RequestBody Booking details) {
        return bookingRepo.findById(id).map(booking -> {
            booking.setCustomerName(details.getCustomerName());
            booking.setCustomerEmail(details.getCustomerEmail());
            booking.setCustomerPhone(details.getCustomerPhone());
            booking.setBookingTime(details.getBookingTime());
            booking.setGuestCount(details.getGuestCount());
            booking.setNotes(details.getNotes());
            booking.setStatus(details.getStatus());
            if (details.getTable() != null && details.getTable().getId() != null) {
                tableRepo.findById(details.getTable().getId()).ifPresent(booking::setTable);
            }
            return ResponseEntity.ok(bookingRepo.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Booking> patchStatus(@PathVariable Long id, @RequestBody java.util.Map<String, String> updates) {
        return bookingRepo.findById(id).map(booking -> {
            if (updates.containsKey("status")) booking.setStatus(updates.get("status"));
            if (updates.containsKey("customerName")) booking.setCustomerName(updates.get("customerName"));
            if (updates.containsKey("customerEmail")) booking.setCustomerEmail(updates.get("customerEmail"));
            if (updates.containsKey("customerPhone")) booking.setCustomerPhone(updates.get("customerPhone"));
            if (updates.containsKey("notes")) booking.setNotes(updates.get("notes"));
            return ResponseEntity.ok(bookingRepo.save(booking));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!bookingRepo.existsById(id)) return ResponseEntity.notFound().build();
        bookingRepo.deleteById(id);
        return ResponseEntity.ok("Deleted");
    }
}
