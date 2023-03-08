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

/* Following lines are dummy data for testing purposes only */

INSERT INTO users (email, pswrd, admin) VALUES
("admin1@hometeam.com", "easilyremembered", 1),
("user1@gmail.com", "pineapplepizza", 0),
("yourcat@hotmail.com", "iliekborgar", 0),
("trolypoly@burner.com", "rudewords", 0),
("elderly@aol.com", "grandkidsbirthdays", 0);
