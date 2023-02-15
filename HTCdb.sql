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

INSERT INTO users (email, pswrd, admin) VALUES
("admin1@hometeam.com", "12345", 1),
("user1@gmail.com", "pineapplepizza3", 0),
("yourcat@hotmail.com", "iliekborgar456", 0),
("trolypoly@burner.com", "11rudewords", 0),
("elderly@aol.com", "7grandkidsbirthdays", 0);
