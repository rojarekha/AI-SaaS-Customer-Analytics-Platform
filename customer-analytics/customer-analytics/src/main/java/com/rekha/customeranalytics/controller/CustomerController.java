package com.rekha.customeranalytics.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import jakarta.validation.Valid;
import com.rekha.customeranalytics.entity.Customer;
import com.rekha.customeranalytics.service.CustomerService;
import org.springframework.web.bind.annotation.*;
import org.springframework.data.domain.Page;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import java.util.List;
import java.util.Map;



@SecurityRequirement(name = "BearerAuth")
@RestController
@RequestMapping("/customers")
@CrossOrigin(origins = "http://localhost:5173")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerService.getAllCustomers();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/{id}")
    public Customer getCustomerById(@PathVariable Integer id) {
        return customerService.getCustomerById(id);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public Customer saveCustomer(@Valid @RequestBody Customer customer){
        return customerService.saveCustomer(customer);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public Customer updateCustomer(@PathVariable Integer id,
                               @Valid @RequestBody Customer customer) {
        return customerService.updateCustomer(id, customer);
    }
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public String deleteCustomer(@PathVariable Integer id) {
        customerService.deleteCustomer(id);
        return "Customer Deleted Successfully";
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/search")
    public List<Customer> searchCustomers(@RequestParam String name) {
        return customerService.searchCustomers(name);
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/top-spender")
    public Customer topSpender() {
        return customerService.getTopSpender();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/dashboard")
    public Map<String, Object> dashboard() {
        return customerService.getDashboard();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/high-value")
    public List<Customer> getHighValueCustomers(@RequestParam Double amount) {
        return customerService.getHighValueCustomers(amount);
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/page")
    public Page<Customer> getCustomers(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "id") String sortBy) {

    return customerService.getCustomers(page, size, sortBy);
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/spending-range")
        public List<Customer> getCustomersBySpendingRange(
        @RequestParam Double min,
        @RequestParam Double max) {

    return customerService.getCustomersBySpendingRange(min, max);
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/analytics/total-spending")
    public Double getTotalSpending() {
    return customerService.getTotalSpending();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/analytics/average-spending")
    public Double getAverageSpending() {
    return customerService.getAverageSpending();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/analytics/count")
    public Long getCustomerCount() {
    return customerService.getCustomerCount();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/highest-orders")
    public Customer getHighestOrdersCustomer() {
    return customerService.getHighestOrdersCustomer();
    }
    @PreAuthorize("hasAnyRole('ADMIN','USER')")
    @GetMapping("/top5-spenders")
    public List<Customer> getTop5Spenders() {
    return customerService.getTop5Spenders();
    }

}
//cd customer-analytics
//.\mvnw.cmd spring-boot:run
//cd C:\Users\REKHA\Downloads\customer-analytics-ui
//npm run dev
//C:\Users\REKHA\Downloads\customer-analytics\customer-analytics
