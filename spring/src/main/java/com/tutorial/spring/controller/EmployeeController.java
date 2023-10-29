package com.tutorial.spring.controller;


import com.tutorial.spring.execption.ResourceNotFoundException;
import com.tutorial.spring.model.Employee;
import com.tutorial.spring.repository.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200/")
@RestController
@RequestMapping("/api/v1/")
public class EmployeeController {

    @Autowired
     EmployeeRepository employeeRepository;


    @GetMapping("/employees")
    public List<Employee> getAllEmployees(){
        return  employeeRepository.findAll();
    }


    @PostMapping("/employees/createemployee")
    public  Employee createEmployee( @RequestBody Employee employee){
        return employeeRepository.save(employee);
    }


    @GetMapping("/employees/{id}")
    public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id){
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Not Exist with id : " +id));
        return ResponseEntity.ok(emp);
    }

    @PutMapping("/employees/updateemployee/{id}")
    public ResponseEntity<Employee>  updateEmployee(@PathVariable Long id , @RequestBody Employee employee){
        Employee emp = employeeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Employee Not Exist with id : " +id));

        emp.setFirstname(employee.getFirstname());
        emp.setLastname(employee.getLastname());
        emp.setEmailId(employee.getEmailId());

        Employee updatedEmployee = employeeRepository.save(emp);
        return ResponseEntity.ok(updatedEmployee);

    }

    @DeleteMapping("/employees/deleteemployee/{id}")
    public ResponseEntity<Map<String,Boolean>> deleteEmployee(@PathVariable Long id){
        Employee employee = employeeRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :"+id));
        employeeRepository.delete(employee);
        Map<String,Boolean> response = new HashMap<>();
        response.put("deleted",Boolean.TRUE);
        return ResponseEntity.ok(response);
    }
}
