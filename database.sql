CREATE DATABASE IF NOT EXISTS `c-backend`;
USE `c-backend`;

CREATE TABLE IF NOT EXISTS `users` (
    ID int(11) UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
  	Username varchar(255) NOT NULL UNIQUE,
  	Email varchar(255) NOT NULL UNIQUE,
  	Password varchar(255) NOT NULL
    );
    
INSERT INTO users (Username, Email, Password) VALUES ("PortalHUN", "giotomi03@gmail.com", "$2b$10$JRaVgDirxosTs5cSl9/U6OUJe4L5jaMLhvj.voES68nH3gWdyjvfa");

--Get user roles
--SELECT RoleName from roles as r
--JOIN assignedroles AS ar ON r.ID = ar.RoleID
--JOIN users AS u ON u.ID = ar.UserID
--WHERE u.Username = "PortalHUN";