package com.example.demo;

import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRepository extends CrudRepository<Product, Integer> {
    List<Product> findByProductNameContaining(String productName);
    List<Product> findByProductClass(String productClass);
}
