package com.GatherPoint.backend.Model;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Booking {
    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String customerName;
    private String customerEmail;
    private String customerPhone;
    private LocalDateTime bookingTime;
    private Integer guestCount;
    private String notes;
    @ManyToOne
    private RestaurantTable table;
    private String status; // CONFIRMED, CANCELLED, COMPLETED
    private LocalDateTime createdAt;
}
