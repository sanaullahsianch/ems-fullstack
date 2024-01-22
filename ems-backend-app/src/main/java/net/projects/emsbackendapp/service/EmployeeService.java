package net.projects.emsbackendapp.service;

import lombok.AllArgsConstructor;
import net.projects.emsbackendapp.dto.EmployeeDto;
import org.springframework.stereotype.Service;

import java.util.List;

public interface EmployeeService {
    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);
    List<EmployeeDto> getAllEmployees();
    EmployeeDto updateEmployee(Long employeeId, EmployeeDto employeeDto);

    void deleteEmployee(Long employeeId);



}



