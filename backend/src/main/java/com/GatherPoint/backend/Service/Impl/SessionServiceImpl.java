package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.SessionMapper;
import com.GatherPoint.backend.Model.PosSession;
import com.GatherPoint.backend.Model.User;
import com.GatherPoint.backend.Repo.PosSessionRepo;
import com.GatherPoint.backend.Repo.UserRepo;
import com.GatherPoint.backend.Service.SessionService;
import com.GatherPoint.backend.dto.Request.SessionRequest;
import com.GatherPoint.backend.dto.Response.SessionResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SessionServiceImpl implements SessionService {

    private final PosSessionRepo sessionRepo;
    private final UserRepo userRepo;

    @Override
    public SessionResponse getActive(Long employeeId) {
        PosSession session = sessionRepo.findByEmployeeIdAndClosedAtIsNull(employeeId)
                .orElse(null);
        return session != null ? SessionMapper.toResponse(session) : null;
    }

    @Override
    public SessionResponse openSession(Long employeeId, SessionRequest request) {
        User user = userRepo.findById(employeeId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + employeeId));
        PosSession session = PosSession.builder()
                .openedAt(LocalDateTime.now())
                .openingAmount(request.getOpeningAmount() != null ? request.getOpeningAmount() : BigDecimal.ZERO)
                .employee(user)
                .build();
        session = sessionRepo.save(session);
        return SessionMapper.toResponse(session);
    }

    @Override
    public SessionResponse closeSession(Long id, BigDecimal closingAmount) {
        PosSession session = sessionRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Session not found with id: " + id));
        session.setClosedAt(LocalDateTime.now());
        session.setClosingAmount(closingAmount);
        session = sessionRepo.save(session);
        return SessionMapper.toResponse(session);
    }

    @Override
    public List<SessionResponse> getHistory() {
        return sessionRepo.findAll().stream().map(SessionMapper::toResponse).collect(Collectors.toList());
    }
}
