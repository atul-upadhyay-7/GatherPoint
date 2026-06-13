package com.GatherPoint.backend.Service;

import com.GatherPoint.backend.dto.Request.CustomerRequest;
import com.GatherPoint.backend.dto.Response.CustomerResponse;

import java.util.List;

public interface CustomerService {
    List<CustomerResponse> getAll();
    CustomerResponse getById(Long id);
    CustomerResponse create(CustomerRequest request);
    CustomerResponse update(Long id, CustomerRequest request);
    void delete(Long id);
    List<CustomerResponse> search(String query);
}
