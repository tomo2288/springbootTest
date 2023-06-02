package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.List;

@RestController
public class ProductController {

    @Autowired
    private ProductRepository productRepository;

    @PostMapping("/productsAdd")
    public String insert(
            @RequestParam("productClass") String productClass,
            @RequestParam("productName") String productName,
            @RequestParam("productPrice") Integer productPrice,
            @RequestParam("productQuantity") Integer productQuantity,
            @RequestParam("productStatus") String productStatus,
            @RequestParam("productDetail") String productDetail,
            @RequestParam("productImage") MultipartFile productImage) throws IOException {

        Product product = new Product();
        product.setProductClass(productClass);
        product.setProductName(productName);
        product.setProductPrice(productPrice);
        product.setProductQuantity(productQuantity);
        product.setProductStatus(productStatus);
        product.setProductDetail(productDetail);

        // Check if the file is empty
        if (!productImage.isEmpty()) {
            // Convert the MultipartFile to byte[]
            byte[] imageBytes = new byte[0];
            try {
                imageBytes = productImage.getBytes();
            } catch (IOException e) {
                throw new RuntimeException(e);
            }

            // Save the byte[] to the product
            product.setProductImage(imageBytes);
        } else {
            // Handle the case where the file was empty
            return "Error: file was empty";
        }

        productRepository.save(product);

        return "執行 Create 操作";
    }
    @GetMapping("/productsGetAll")
    public List<Product> getAllProducts() {
        List<Product> products = (List<Product>) productRepository.findAll();

        // 將圖像數據轉換為Base64格式
        for (Product product : products) {
            byte[] base64Image = product.getBase64Image();
            product.setProductImage(base64Image);
        }


        return products;


    }


    }

