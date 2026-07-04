package com.rekha.customeranalytics.service;

import com.rekha.customeranalytics.entity.Customer;
import com.rekha.customeranalytics.exception.ResourceNotFoundException;
import com.rekha.customeranalytics.repository.CustomerRepository;

import org.springframework.stereotype.Service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CustomerService {

    private final CustomerRepository customerRepository;
    private static final Logger logger =
        LoggerFactory.getLogger(CustomerService.class);

    public CustomerService(CustomerRepository customerRepository) {
        this.customerRepository = customerRepository;
    }

    // Get All Customers
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get Customer By Id
    public Customer getCustomerById(Integer id) {
        return customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));
    }

    // Save Customer
public Customer saveCustomer(Customer customer) {

    logger.info("Customer Added Successfully: {}", customer.getName());

    return customerRepository.save(customer);
}

    // Update Customer
    public Customer updateCustomer(Integer id, Customer customer) {

        Customer existing = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

        existing.setName(customer.getName());
        existing.setEmail(customer.getEmail());
        existing.setCity(customer.getCity());
        existing.setTotalSpending(customer.getTotalSpending());
        existing.setOrdersCount(customer.getOrdersCount());
        existing.setImage(customer.getImage());

        logger.info("Customer Updated Successfully: {}", existing.getName());

        return customerRepository.save(existing);
    }

    // Delete Customer
    public void deleteCustomer(Integer id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

                        logger.info("Customer Deleted Successfully: {}", customer.getName());

        customerRepository.delete(customer);
    }

    // Search Customers
public List<Customer> searchCustomers(String name) {

    logger.info("Searching customer: {}", name);

    return customerRepository.findByNameContainingIgnoreCase(name);
}

    // Top Spender
    public Customer getTopSpender() {
        return customerRepository.findAll()
                .stream()
                .max(Comparator.comparing(Customer::getTotalSpending))
                .orElse(null);
    }

    // Dashboard
    public Map<String, Object> getDashboard() {

        List<Customer> customers = customerRepository.findAll();

        double totalSpending = customers.stream()
                .mapToDouble(Customer::getTotalSpending)
                .sum();

        double averageSpending = customers.isEmpty()
                ? 0
                : totalSpending / customers.size();

        Map<String, Object> dashboard = new HashMap<>();

        dashboard.put("totalCustomers", customers.size());
        dashboard.put("totalSpending", totalSpending);
        dashboard.put("averageSpending", averageSpending);

        return dashboard;
    }

    // High Value Customers
    public List<Customer> getHighValueCustomers(Double amount) {
        return customerRepository.findByTotalSpendingGreaterThan(amount);
    }

    // Spending Range
    public List<Customer> getCustomersBySpendingRange(Double min, Double max) {
        return customerRepository.findByTotalSpendingBetween(min, max);
    }

public Double getTotalSpending() {

    return customerRepository.findAll()
            .stream()
            .mapToDouble(customer ->
                    customer.getTotalSpending() == null ? 0.0 : customer.getTotalSpending())
            .sum();
}

    // Average Spending
public Double getAverageSpending() {

    List<Customer> customers = customerRepository.findAll();

    if (customers.isEmpty()) {
        return 0.0;
    }

    return customers.stream()
            .mapToDouble(customer ->
                    customer.getTotalSpending() == null ? 0.0 : customer.getTotalSpending())
            .average()
            .orElse(0.0);
}

    // Customer Count
    public Long getCustomerCount() {
        return customerRepository.count();
    }

    // Highest Orders Customer
    public Customer getHighestOrdersCustomer() {

        return customerRepository.findAll()
                .stream()
                .max(Comparator.comparing(Customer::getOrdersCount))
                .orElse(null);
    }

    // Top 5 Spenders
    public List<Customer> getTop5Spenders() {

        return customerRepository.findAll()
                .stream()
                .sorted(Comparator.comparing(Customer::getTotalSpending).reversed())
                .limit(5)
                .toList();
    }

    // Pagination
    public Page<Customer> getCustomers(int page, int size, String sortBy) {

        Pageable pageable = PageRequest.of(
                page,
                size,
                Sort.by(sortBy).ascending()
        );

        return customerRepository.findAll(pageable);
    }
}