package com.GatherPoint.backend.Service.Impl;

import com.GatherPoint.backend.Mapper.EmployeeMapper;
import com.GatherPoint.backend.Model.User;
import com.GatherPoint.backend.Repo.UserRepo;
import com.GatherPoint.backend.Service.EmployeeService;
import com.GatherPoint.backend.dto.Request.EmployeeRequest;
import com.GatherPoint.backend.dto.Response.EmployeeResponse;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    private final UserRepo userRepo;
    private final PasswordEncoder passwordEncoder;

    public EmployeeServiceImpl(UserRepo userRepo, PasswordEncoder passwordEncoder) {
        this.userRepo = userRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public List<EmployeeResponse> getAll() {
        return userRepo.findAll().stream().map(EmployeeMapper::toResponse).collect(Collectors.toList());
    }

    @Override
    public EmployeeResponse create(EmployeeRequest request) {
        User user = EmployeeMapper.toEntity(request);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userRepo.save(user);
        return EmployeeMapper.toResponse(user);
    }

    @Override
    public void changePassword(Long id, String newPassword) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepo.save(user);
    }

    @Override
    public void archive(Long id) {
        User user = userRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setActive(false);
        userRepo.save(user);
    }

    @Override
    public void delete(Long id) {
        userRepo.deleteById(id);
    }
}
