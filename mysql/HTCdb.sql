/* SQL file for setting up necessary database and tables
   requires MySQL version 8.0.16 or later for CHECK statements to work */

CREATE DATABASE IF NOT EXISTS hometeam;
USE hometeam;

/* Drop old versions of tables in reverse order of dependency */
DROP TABLE IF EXISTS product_orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
    user_id int AUTO_INCREMENT,
    email varchar(255) UNIQUE NOT NULL CHECK (email LIKE "_%@_%._%"),
    pswrd varchar(31) NOT NULL,
    admin BOOLEAN DEFAULT 0,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    PRIMARY KEY (user_id)
);

/* tag_list should have a csv format */
/* TODO: Change tag_list type to SET() once a list of tags has been made */
CREATE TABLE IF NOT EXISTS products (
    product_id int AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    price decimal(10,2) NOT NULL,
    filename varchar(255) NOT NULL,
    product_desc varchar(2047) DEFAULT 'No description',
    tag_list varchar(255) DEFAULT 'tagme',
    is_available BOOLEAN DEFAULT 0,
    tColors varchar(255) DEFAULT 'None',
    lColors varchar(255) DEFAULT 'None',
    cColors varchar(255) DEFAULT 'None',
    hColors varchar(255) DEFAULT 'None',
    PRIMARY KEY (product_id)
);

/* Each user should have exactly one cart. The cart should be created
as an empty order as soon as an account is created */
/* When an order is placed, the elements  of the user's cart should be
copied into a new order, and then erased from the cart. All product_order
entries with order_id matching the user's cart should have their order_id
updated to match that of the newly-created order */
CREATE TABLE IF NOT EXISTS orders (
    order_id int AUTO_INCREMENT,
    user_id int NOT NULL,
    total_cost decimal(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    is_cart BOOLEAN DEFAULT 0,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    location varchar(255) DEFAULT NULL,
    shipped tinyint(1) DEFAULT 0,
    paid tinyint(1) DEFAULT 0,
    email varchar(255) DEFAULT '',
    first_name varchar(100) DEFAULT '',
    last_name varchar(100) DEFAULT '',
    status varchar(10) DEFAULT 'active'
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Each order will have as many associated product_orders as individual products
in the users cart at the time of purchase */
/* product_details is to store customization details */
CREATE TABLE IF NOT EXISTS product_orders (
    order_id int NOT NULL,
    product_id int NOT NULL,
    product_quantity int NOT NULL CHECK (product_quantity > 0),
    color varchar(100) DEFAULT 'Black',
    product_type varchar(100) DEFAULT 'Short Sleeve T-shirt',
    size varchar(100) DEFAULT 'Adult Medium',
    product_details varchar(2047) DEFAULT 'No customization specified',
    PRIMARY KEY (order_id, product_id, color, product_type, size),
    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
