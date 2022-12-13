CREATE DATABASE IF NOT EXISTS `c-backend`;
USE `c-backend`;

CREATE TABLE IF NOT EXISTS `assignedroles` (
  `ID` tinyint(3) UNSIGNED NOT NULL,
  `UserID` int(10) UNSIGNED NOT NULL,
  `RoleID` tinyint(3) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

INSERT INTO `assignedroles` (`ID`, `UserID`, `RoleID`) VALUES
(1, 1, 1),
(2, 1, 2);


CREATE TABLE IF NOT EXISTS `roles` (
  `ID` tinyint(3) UNSIGNED NOT NULL,
  `RoleName` varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


INSERT INTO `roles` (`ID`, `RoleName`) VALUES
(1, 'SysAdmin'),
(2, 'Admin');


CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) UNSIGNED NOT NULL,
  `Username` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `Email` varchar(255) COLLATE utf8mb4_bin NOT NULL,
  `Password` varchar(255) COLLATE utf8mb4_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;


INSERT INTO `users` (`ID`, `Username`, `Email`, `Password`) VALUES
(1, 'PortalHUN', 'kszabolcs1020+c-backend@gmail.com', '$2b$10$Qnq1JszPahsBut5aAKyqgecjKYyfdCz/bt/h9Cgbo5p5o8N078a7S');


ALTER TABLE `assignedroles`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `RoleID` (`RoleID`);


ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`);


ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `Email` (`Email`);


ALTER TABLE `assignedroles`
  MODIFY `ID` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `roles`
  MODIFY `ID` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;


ALTER TABLE `users`
  MODIFY `ID` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;


ALTER TABLE `assignedroles`
  ADD CONSTRAINT `ar_UID` FOREIGN KEY (`UserID`) REFERENCES `users` (`ID`) ON DELETE CASCADE,
  ADD CONSTRAINT `ar_RID` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`ID`) ON DELETE CASCADE;
