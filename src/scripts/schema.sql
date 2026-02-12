CREATE TABLE products (
    productId INT AUTO_INCREMENT PRIMARY KEY,
    productName VARCHAR(150) NOT NULL,
    productDescription TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL
);