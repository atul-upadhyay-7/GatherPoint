package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.CustomerMapper;
import com.GatherPoint.backend.Model.Customer;
import com.GatherPoint.backend.Repo.CustomerRepo;
import com.GatherPoint.backend.Service.CustomerService;
import com.GatherPoint.backend.dto.Request.CustomerRequest;
import com.GatherPoint.backend.dto.Response.CustomerResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepo customerRepo;

    public CustomerServiceImpl(CustomerRepo customerRepo) {
        this.customerRepo = customerRepo;
    }

    @Override
    public List<CustomerResponse> getAll() {
        return customerRepo.findAll().stream().map(CustomerMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public CustomerResponse getById(Long id) {
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        return CustomerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse create(CustomerRequest request) {
        Customer customer = CustomerMapper.toEntity(request);
        customer = customerRepo.save(customer);
        return CustomerMapper.toResponse(customer);
    }

    @Override
    public CustomerResponse update(Long id, CustomerRequest request) {
        Customer customer = customerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));
        CustomerMapper.updateEntity(customer, request);
        customer = customerRepo.save(customer);
        return CustomerMapper.toResponse(customer);
    }

    @Override
    public void delete(Long id) {
        customerRepo.deleteById(id);
    }

    @Override
    public List<CustomerResponse> search(String query) {
        return customerRepo.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(query, query)
                .stream().map(CustomerMapper::toResponse).collect(Collectors.toList());
    }
}
