package com.rekha.customeranalytics.repository;

import com.rekha.customeranalytics.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {

    List<Customer> findByNameContainingIgnoreCase(String name);

    List<Customer> findByTotalSpendingGreaterThan(Double totalSpending);

    List<Customer> findByTotalSpendingBetween(Double min, Double max);

}