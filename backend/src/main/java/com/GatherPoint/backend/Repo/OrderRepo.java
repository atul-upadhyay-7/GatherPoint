package com.GatherPoint.backend.Repo;

import com.GatherPoint.backend.Model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long> {
    List<Order> findByTableId(Long tableId);
    List<Order> findByOrderNumberContainingIgnoreCase(String orderNumber);
    Optional<Order> findByOrderNumber(String orderNumber);
    List<Order> findByEmployeeId(Long employeeId);
}
