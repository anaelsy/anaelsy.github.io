CREATE DATABASE database_trend;

USE database_trend;

CREATE TABLE category(
    id INT (11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    category VARCHAR(60) NOT NULL
);
CREATE TABLE accesories(
    id INT (11) NOT NULL AUTO_INCREMENT,
    productType VARCHAR (60) NOT NULL,
    categoryId INT (11) NOT NULL,
    PRIMARY KEY (id, categoryId),
    CONSTRAINT fk_category FOREIGN KEY (categoryId) REFERENCES category(id)
);

CREATE TABLE products(
    id INT (11) NOT NULL ,
    productName VARCHAR (60) NOT NULL,
    typeId INT (11) NOT NULL,
    description VARCHAR(200) NOT NULL,
    price INT (11) NOT NULL,
    stock TINYINT (1),
    PRIMARY KEY (id, typeId),
    CONSTRAINT fk_accesories FOREIGN KEY (typeId) REFERENCES accesories(id)
);

CREATE TABLE customer(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    customerName VARCHAR (60) NOT NULL,
    password VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL
);

CREATE TABLE address(
    id INT (11) NOT NULL AUTO_INCREMENT,
    street VARCHAR (60) NOT NULL,
    number INT (11) NOT NULL,
    CP INT (11) NOT NULL,
    city VARCHAR (60) NOT NULL,
    state VARCHAR (60) NOT NULL,
    district VARCHAR (60) NOT NULL,
    customerId INT (11) NOT NULL,
    PRIMARY KEY (id, customerId),
    CONSTRAINT fk_customer FOREIGN KEY (customerId) REFERENCES customer(id)
);

CREATE TABLE checkout(
    id INT (11) NOT NULL AUTO_INCREMENT,
    notified TINYINT (1),
    addressId INT (11) NOT NULL,
    paid TINYINT (1) NOT NULL,
    PRIMARY KEY (id, addressId),
    CONSTRAINT fk_address FOREIGN KEY (addressId) REFERENCES address(id)
);

CREATE TABLE purchases(
    id INT (11) NOT NULL AUTO_INCREMENT,
    customerId INT (11) NOT NULL,
    productId INT (11) NOT NULL,
    checkoutId INT (11) NOT NULL,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    valid TINYINT (1) NOT NULL,
    PRIMARY KEY (id, productId, checkoutId, customerId),
    CONSTRAINT fk_product FOREIGN KEY (productId) REFERENCES products(id),
    CONSTRAINT fk_checkout FOREIGN KEY (checkoutId) REFERENCES checkout(id),
    CONSTRAINT fk_customer_purchase FOREIGN KEY (customerId) REFERENCES customer(id)
);

CREATE TABLE delivered(
    id INT (11) NOT NULL AUTO_INCREMENT,
    purchaseId INT (11) NOT NULL,
    delivered TINYINT (1),
    comments VARCHAR(200),
    PRIMARY KEY (id, purchaseId),
    CONSTRAINT fk_purchases FOREIGN KEY (purchaseId) REFERENCES purchases(id)
);
CREATE TABLE contact(
    id INT (11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR (60) NOT NULL,
    email VARCHAR (60) NOT NULL,
    comments VARCHAR (200) NOT NULL
)

