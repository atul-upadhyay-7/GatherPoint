package com.GatherPoint.backend.controller;

import com.GatherPoint.backend.Constants.TicketStage;
import com.GatherPoint.backend.Model.KitchenTicket;
import com.GatherPoint.backend.Model.KitchenTicketItem;
import com.GatherPoint.backend.Repo.KitchenTicketRepo;
import com.GatherPoint.backend.Repo.KitchenTicketItemRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/kitchen")
@RequiredArgsConstructor
public class KitchenController {

    private final KitchenTicketRepo kitchenTicketRepo;

    private final KitchenTicketItemRepo kitchenTicketItemRepo;

    private final SimpMessagingTemplate messagingTemplate;

    @GetMapping("/orders")
    public List<KitchenTicket> getKitchenTickets() {
        return kitchenTicketRepo.findAll();
    }

    @PatchMapping("/orders/{id}/prepare")
    public ResponseEntity<?> prepareOrder(@PathVariable Long id) {
        Optional<KitchenTicket> opt = kitchenTicketRepo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        KitchenTicket ticket = opt.get();
        ticket.setStage(TicketStage.PREPARING);
        KitchenTicket saved = kitchenTicketRepo.save(ticket);

        // Broadcast to KDS / POS via WebSocket
        messagingTemplate.convertAndSend("/topic/kitchen", (Object) Map.of(
                "event", "ORDER_PREPARING",
                "ticket", saved
        ));
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/orders/{id}/complete")
    public ResponseEntity<?> completeOrder(@PathVariable Long id) {
        Optional<KitchenTicket> opt = kitchenTicketRepo.findById(id);
        if (opt.isEmpty()) return ResponseEntity.notFound().build();

        KitchenTicket ticket = opt.get();
        ticket.setStage(TicketStage.COMPLETED);
        KitchenTicket saved = kitchenTicketRepo.save(ticket);

        messagingTemplate.convertAndSend("/topic/kitchen", (Object) Map.of(
                "event", "ORDER_COMPLETED",
                "ticket", saved
        ));
        return ResponseEntity.ok(saved);
    }

    @PatchMapping("/orders/{ticketId}/items/{itemId}/complete")
    public ResponseEntity<?> completeItem(@PathVariable Long ticketId, @PathVariable Long itemId) {
        Optional<KitchenTicket> ticketOpt = kitchenTicketRepo.findById(ticketId);
        if (ticketOpt.isEmpty()) return ResponseEntity.notFound().build();

        Optional<KitchenTicketItem> itemOpt = kitchenTicketItemRepo.findById(itemId);
        if (itemOpt.isEmpty()) return ResponseEntity.notFound().build();

        KitchenTicketItem item = itemOpt.get();
        item.setCompleted(true);
        kitchenTicketItemRepo.save(item);

        messagingTemplate.convertAndSend("/topic/kitchen", (Object) Map.of(
                "event", "ITEM_COMPLETED",
                "ticketId", ticketId,
                "itemId", itemId
        ));

        return ResponseEntity.ok(Map.of("success", true, "item", item));
    }
}
