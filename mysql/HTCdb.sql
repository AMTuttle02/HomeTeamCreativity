/* SQL file for setting up necessary database and tables
   requires MySQL version 8.0.16 or later for CHECK statements to work */

CREATE DATABASE IF NOT EXISTS hometeam;
USE hometeam;

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
DROP TABLE IF EXISTS products;
CREATE TABLE IF NOT EXISTS products (
    product_id int AUTO_INCREMENT,
    product_name varchar(255) NOT NULL,
    price decimal(10,2) NOT NULL,
    filename varchar(255) NOT NULL,
    product_desc varchar(2047) DEFAULT 'No description',
    tag_list varchar(255) DEFAULT 'tagme',
    is_available BOOLEAN DEFAULT 0,
    PRIMARY KEY (product_id)
);

/* Each user should have exactly one cart. The cart should be created
as an empty order as soon as an account is created */
/* When an order is placed, the elements  of the user's cart should be
copied into a new order, and then erased from the cart. All product_order
entries with order_id matching the user's cart should have their order_id
updated to match that of the newly-created order */
DROP TABLE IF EXISTS orders;
CREATE TABLE IF NOT EXISTS orders (
    order_id int AUTO_INCREMENT,
    user_id int NOT NULL,
    total_cost decimal(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT 1,
    is_cart BOOLEAN DEFAULT 0,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (order_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

/* Each order will have as many associated product_orders as individual products
in the users cart at the time of purchase */
/* product_details is to store customization details */
DROP TABLE IF EXISTS product_orders;
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

/* Following lines are dummy data for testing purposes only */
INSERT INTO users (email, pswrd, admin, first_name, last_name) VALUES
("admin1@hometeam.com", "HT1p0CENi0sCU", 1, "Admin", "Account"),
("user1@gmail.com", "HTElbQN.BtJD2", 0, "First", "User"),
("yourcat@hotmail.com", "HTKWLMGUdmTrs", 0, "Cat", "Cats"),
("trolypoly@burner.com", "HTabDDCL7uA5o", 0, "Troly", "Poly"),
("elderly@aol.com", "HTBYBlPEXF0rA", 0, "Elder", "Old");

INSERT INTO products (product_name, price, filename) VALUES
("Be Like Friends", 16.00, "designOne.png"),
("Northmor Football, edition 1", 18.00, "nfootball1deisgn.png"),
("Northmor Volleyball, edition 1", 16.00, "vball21design.png"),
("Indians Baseball, edition 1", 16.00, "indians layered on baseball design.png"),
("A Moo Point", 20.00, "moo point design.png"),
("If One Has Faith", 18.00, "if one has faith design.png"),
("Findlay Oilers, edition 1", 16.00, "oilers hearts cursive uf design.png"),
("Akron Zips, edition 1", 16.00, "layered school ua zips design.png"),
("Me? Sarcastic? Never", 16.00, "me sarcastic never design.png");