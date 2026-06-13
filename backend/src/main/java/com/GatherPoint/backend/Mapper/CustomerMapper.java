package com.GatherPoint.backend.Mapper;

import com.GatherPoint.backend.Model.Customer;
import com.GatherPoint.backend.dto.Request.CustomerRequest;
import com.GatherPoint.backend.dto.Response.CustomerResponse;

public class CustomerMapper {

    public static CustomerResponse toResponse(Customer customer) {
        return new CustomerResponse(customer.getId(), customer.getName(), customer.getEmail(), customer.getPhone());
    }

    public static Customer toEntity(CustomerRequest request) {
        return Customer.builder().name(request.getName()).email(request.getEmail()).phone(request.getPhone()).build();
    }

    public static void updateEntity(Customer customer, CustomerRequest request) {
        customer.setName(request.getName());
        customer.setEmail(request.getEmail());
        customer.setPhone(request.getPhone());
    }
}
