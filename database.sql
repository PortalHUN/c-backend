DROP USER `c-backend`@`%`;
DROP DATABASE `c-backend`;
FLUSH PRIVILEGES;

CREATE USER `c-backend`@`%` IDENTIFIED BY 'asdasd';
CREATE DATABASE IF NOT EXISTS `c-backend`;
GRANT ALL PRIVILEGES ON `c-backend`.* TO 'c-backend'@'%' WITH GRANT OPTION;
FLUSH PRIVILEGES;

CREATE TABLE users (
  ID int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Username varchar(255) NOT NULL UNIQUE,
  Email varchar(255) NOT NULL UNIQUE,
  Password varchar(255) NOT NULL
);

INSERT INTO users (Username, Email, Password) VALUES 
("Portal","kszabolcs1020@gmail.com", "$2a$10$DA04VqZstzUiU/U0iw8qVu0M55mtZzFb3O7bNYDbZWjKbnf3ByweW"),
("PortalHUN", "giotomi03@gmail.com", "$2a$10$DA04VqZstzUiU/U0iw8qVu0M55mtZzFb3O7bNYDbZWjKbnf3ByweW");

CREATE TABLE classes (
  ID int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Name varchar(255) NOT NULL
);

CREATE TABLE characters (
  ID int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserID int(11) UNSIGNED NOT NULL,
  ClassID int(11) UNSIGNED NOT NULL,
  Name varchar(255) NOT NULL,
  CONSTRAINT c_uid_id FOREIGN KEY (UserID) REFERENCES users(ID) ON DELETE CASCADE,
  CONSTRAINT c_cid_id FOREIGN KEY (ClassID) REFERENCES classes(ID) ON DELETE CASCADE
);

INSERT INTO classes (Name) VALUES 
("Barbarian"),
("Bard"),
("Cleric"),
("Druid"),
("Fighter"),
("Monk"),
("Paladin"),
("Ranger"),
("Rouge"),
("Sorcerer"),
("Warlock"),
("Wizard"),
("Artificer"),
("Blood Hunter");

INSERT INTO characters (UserID, ClassID, Name) VALUES 
(1, 1, "Portal"),
(1, 1, "Portalasd"),
(1, 1, "Portal1"),
(1, 1, "Portal2"),
(2, 6, "Calm");