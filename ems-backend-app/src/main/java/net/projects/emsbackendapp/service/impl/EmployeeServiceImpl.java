package net.projects.emsbackendapp.service.impl;

import net.projects.emsbackendapp.dto.EmployeeDto;
import net.projects.emsbackendapp.entity.Employee;
import net.projects.emsbackendapp.exception.ResourceNotFoundException;
import net.projects.emsbackendapp.mapper.EmployeeMapper;
import net.projects.emsbackendapp.repository.EmployeeRepository;
import net.projects.emsbackendapp.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;


@Service

public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        Employee employee = EmployeeMapper.mapToEmployee(employeeDto);
        Employee savedEmployee = employeeRepository.save(employee);
        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }

    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
            Employee employee = employeeRepository.findById(employeeId)
                    .orElseThrow(()->new ResourceNotFoundException("Employee does not exist with the given id"+employeeId));
            return EmployeeMapper.mapToEmployeeDto(employee);
    }


    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();

        return employees.stream().map((employee) -> EmployeeMapper.mapToEmployeeDto(employee))
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException("Employee does not exist with given id "+employeeId)
                );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());

        Employee updatedEmployeeObj = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(
                        ()-> new ResourceNotFoundException("Employee does not exist with given id "+employeeId)
                );
        employeeRepository.deleteById(employeeId);
    }
}
