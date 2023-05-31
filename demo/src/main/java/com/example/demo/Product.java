package com.example.demo;


import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicUpdate;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.Serializable;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;

@Entity
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Data
@DynamicUpdate
@Table(name = "Product")
public class Product implements Serializable {

    private static final long serivalVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer productID;
    private String productClass;
    private String productName;
    private Integer productPrice;
    private Integer productQuantity;
    private byte[] productImage;
    private String productDetail;
    private Integer productBuyPerson;
    private Timestamp productDate;
    @Column(name = "productStatus")
    private String productStatus;


    @Override
    public String toString() {
        return "Product [productId=" + productID + ", productClass=" + productClass + ", productName=" + productName
                + ", productPrice=" + productPrice + ", productQuantity=" + productQuantity + ", productImage="
                + productImage + ", productDetail=" + productDetail + ", productBuyPerson=" + productBuyPerson
                + ", productDate=" + productDate + ", productStatus=" + productStatus + "]";
    }

    public static byte[] getPicture(String path) throws IOException {
        FileInputStream fis = new FileInputStream(path);
        byte[] buffer = new byte[fis.available()];
        fis.read(buffer);
        fis.close();
        return buffer;
    }


}
