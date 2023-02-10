CREATE DATABASE IF NOT EXISTS hometeam;
USE hometeam;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    user_id int auto_increment,
    email varchar(127) UNIQUE NOT NULL,
    password varchar(31) NOT NULL,
    admin BOOLEAN DEFAULT 0,
    PRIMARY KEY (user_id)
);

INSERT INTO users (email, password, admin) VALUES
("admin1@hometeam.com", "12345", 1),
("user1@gmail.com", "pineapplepizza", 0),
("yourcat@hotmail.com", "iliekborgar", 0),
("trolypoly@burner.com", "rudewords", 0),
("elderly@aol.com", "grandkidsbirthdays", 0);
