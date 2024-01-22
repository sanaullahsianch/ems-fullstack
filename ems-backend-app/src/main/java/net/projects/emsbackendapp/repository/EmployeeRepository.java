package net.projects.emsbackendapp.repository;

import net.projects.emsbackendapp.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{



}
