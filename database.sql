CREATE DATABASE IF NOT EXISTS `c-backend`;
USE `c-backend`;

CREATE TABLE IF NOT EXISTS `users` (
    ID int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  	Username varchar(255) NOT NULL UNIQUE,
  	Email varchar(255) NOT NULL UNIQUE,
  	Password varchar(255) NOT NULL
    );
    
INSERT INTO users (Username, Email, Password) VALUES ("PortalHUN", "giotomi03@gmail.com", "$2b$10$JRaVgDirxosTs5cSl9/U6OUJe4L5jaMLhvj.voES68nH3gWdyjvfa");

CREATE TABLE IF NOT EXISTS classes (
  ID int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  Name varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS characters (
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