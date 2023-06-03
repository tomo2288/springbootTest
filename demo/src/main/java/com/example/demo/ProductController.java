package com.example.demo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.*;

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
        product.setProductDate(new Timestamp(System.currentTimeMillis()));

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


        return products;
    }

    @PutMapping("/producetUpdate/{productID}")
    public String update(@PathVariable Integer productID, @RequestBody Product product ){
        product.setProductID(productID);
        productRepository.save(product);
        return "執行 Update操作";
    }

    @DeleteMapping("/productDelete/{productID}")
    public String delete(@PathVariable Integer productID){
        productRepository.deleteById(productID);
        return "執行 Delete操作";
    }

    @GetMapping("/selectById/{productID}")
    public Product selectById(@PathVariable Integer productID){
        return productRepository.findById(productID).orElse(null);
    }


    @GetMapping("/loadImage")
    public ResponseEntity<?> loadImage(@RequestParam("productID") Integer productID) {
        // 1. 從資料庫中取得產品，包含其圖片資訊
        Product product = productRepository.findById(productID).orElse(null);
        if (product == null) {
            return ResponseEntity.notFound().build();
        }

        // 2. 取得圖片資訊，這裡假設圖片是以 Base64 編碼的字符串存儲在資料庫中
        byte[] imageBytes = product.getProductImage();

        // 3. 將圖片資料編碼為 Base64 字符串
        String imageBase64 = Base64.getEncoder().encodeToString(imageBytes);

        // 4. 將 Base64 編碼的圖片包裝成一個 Map 或者其他的 POJO 並返回
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("imageData", imageBase64);

        return ResponseEntity.ok(responseBody);
    }

    @GetMapping("/productSelectByName")
    public List<Product> selectByName(@RequestParam String productName) {
        return productRepository.findByProductNameContaining(productName);
    }
    @GetMapping("/productSelectByClass/{productClass}")
    public List<Product> selectByProductClass(@PathVariable String productClass){
        return productRepository.findByProductClass(productClass);
    }
    }

