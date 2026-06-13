package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.PosSession;
import com.GatherPoint.backend.dto.Response.SessionResponse;

public class SessionMapper {

    public static SessionResponse toResponse(PosSession session) {
        return new SessionResponse(session.getId(), session.getOpenedAt(), session.getClosedAt(),
                session.getOpeningAmount(), session.getClosingAmount(),
                session.getEmployee() != null ? EmployeeMapper.toResponse(session.getEmployee()) : null);
    }
}
