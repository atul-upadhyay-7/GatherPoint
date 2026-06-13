package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.EmployeeRequest;
import com.GatherPoint.backend.dto.Response.EmployeeResponse;

import java.util.List;

public interface EmployeeService {
    List<EmployeeResponse> getAll();
    EmployeeResponse create(EmployeeRequest request);
    void changePassword(Long id, String newPassword);
    void archive(Long id);
    void delete(Long id);
}
