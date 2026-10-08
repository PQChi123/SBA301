package org.example.Entities;

import jakarta.persistence.*;
//@Data
//@NoArgsConstructor
//@AllArgsConstructor
@Entity
@Table(name ="Cars")
// Tạo getter và setter, Tạo constructor default và có tham số.


public class ProductEntities {
    @Id // Khai báo @Id giải quyết triệt để lỗi gạch đỏ ở tên Class
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String brand;
    private double price;
    private double discount;
    private String image;

    public ProductEntities(int id, String name, String brand, double price, double discount, String image) {
        this.id = id;
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.discount = discount;
        this.image = image;
    }

    public ProductEntities() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public double getDiscount() {
        return discount;
    }

    public void setDiscount(double discount) {
        this.discount = discount;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }
}
