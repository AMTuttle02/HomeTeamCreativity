/* SQL file for setting up necessary database and tables
   requires MySQL version 8.0.16 or later for CHECK statements to work */

CREATE DATABASE IF NOT EXISTS hometeam;
USE hometeam;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    user_id int auto_increment,
    email varchar(127) UNIQUE NOT NULL CHECK (email LIKE "_%@_%._%"),
    pswrd varchar(31) NOT NULL,
    admin BOOLEAN DEFAULT 0,
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

/* Following lines are dummy data for testing purposes only */
INSERT INTO users (email, pswrd, admin) VALUES
("admin1@hometeam.com", "easilyremembered", 1),
("user1@gmail.com", "pineapplepizza", 0),
("yourcat@hotmail.com", "iliekborgar", 0),
("trolypoly@burner.com", "rudewords", 0),
("elderly@aol.com", "grandkidsbirthdays", 0);

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