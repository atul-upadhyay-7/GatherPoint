package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.SessionRequest;
import com.GatherPoint.backend.dto.Response.SessionResponse;

import java.math.BigDecimal;
import java.util.List;

public interface SessionService {
    SessionResponse getActive(Long employeeId);
    SessionResponse openSession(Long employeeId, SessionRequest request);
    SessionResponse closeSession(Long id, BigDecimal closingAmount);
    List<SessionResponse> getHistory();
}
