-- -------------------------------------------------------------
-- TablePlus 5.0.2(458)
--
-- https://tableplus.com/
--
-- Database: viatick
-- Generation Time: 2022-10-16 5:39:41.3810 PM
-- -------------------------------------------------------------


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


DROP TABLE IF EXISTS `Devices`;
CREATE TABLE `Devices` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `icon` varchar(255) NOT NULL,
  `fields` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `DeviceUserHistories`;
CREATE TABLE `DeviceUserHistories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `takenAt` datetime DEFAULT NULL,
  `usage` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `DeviceUserId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `DeviceUserId` (`DeviceUserId`),
  CONSTRAINT `deviceuserhistories_ibfk_1` FOREIGN KEY (`DeviceUserId`) REFERENCES `DeviceUsers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `DeviceUsers`;
CREATE TABLE `DeviceUsers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `deviceData` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(10) unsigned DEFAULT NULL,
  `DeviceId` int(10) unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `DeviceUsers_UserId_DeviceId_unique` (`UserId`,`DeviceId`),
  UNIQUE KEY `device_users_device_id_user_id` (`DeviceId`,`UserId`),
  CONSTRAINT `deviceusers_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `Users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `deviceusers_ibfk_2` FOREIGN KEY (`DeviceId`) REFERENCES `Devices` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS `Users`;
CREATE TABLE `Users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `slug` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

INSERT INTO `Devices` (`id`, `name`, `slug`, `icon`, `fields`, `createdAt`, `updatedAt`) VALUES
(1, 'Smart Car Park', 'smart-car-park', 'parking.png', 'totalSpost,takenSpots,availableSpots', '2022-10-16 11:01:21', '2022-10-16 11:01:21'),
(2, 'Air conditioner', 'air-conditioner', 'aircon.png', 'temperature,humidity', '2022-10-16 11:03:33', '2022-10-16 11:03:33'),
(3, 'Intercom', 'intercom', 'intercom.png', '', '2022-10-16 11:03:58', '2022-10-16 11:03:58');

INSERT INTO `DeviceUserHistories` (`id`, `takenAt`, `usage`, `createdAt`, `updatedAt`, `DeviceUserId`) VALUES
(1, '2022-10-15 18:30:00', 64, '2022-10-16 11:08:19', '2022-10-16 11:08:19', 1),
(2, '2022-10-15 19:30:00', 34, '2022-10-16 11:08:25', '2022-10-16 11:08:25', 1),
(3, '2022-10-15 20:30:00', 44, '2022-10-16 11:08:30', '2022-10-16 11:08:30', 1),
(4, '2022-10-16 00:30:00', 52, '2022-10-16 11:08:38', '2022-10-16 11:08:38', 1),
(5, '2022-10-16 05:30:00', 62, '2022-10-16 11:08:47', '2022-10-16 11:08:47', 1),
(6, '2022-10-16 11:30:00', 77, '2022-10-16 11:08:57', '2022-10-16 11:08:57', 2),
(7, '2022-10-16 15:30:00', 77, '2022-10-16 11:08:59', '2022-10-16 11:08:59', 2),
(8, '2022-10-16 16:30:00', 77, '2022-10-16 11:09:01', '2022-10-16 11:09:01', 2),
(9, '2022-10-16 09:30:00', 77, '2022-10-16 11:09:03', '2022-10-16 11:09:03', 2),
(10, '2022-10-15 19:30:00', 11, '2022-10-16 11:09:19', '2022-10-16 11:09:19', 3);

INSERT INTO `DeviceUsers` (`id`, `deviceData`, `createdAt`, `updatedAt`, `UserId`, `DeviceId`) VALUES
(1, '\"{\\\"totalSpots\\\":5,\\\"takenSpots\\\":2,\\\"availableSpots\\\":3}\"', '2022-10-16 11:02:18', '2022-10-16 11:07:09', 1, 1),
(2, '{\"temperature\":24,\"humidity\":42}', '2022-10-16 11:05:09', '2022-10-16 11:05:09', 1, 2),
(3, '\"\"', '2022-10-16 11:05:29', '2022-10-16 11:05:38', 1, 3),
(4, '{\"totalSpots\":4,\"takenSpots\":3,\"availableSpots\":1}', '2022-10-16 11:07:23', '2022-10-16 11:07:23', 2, 1),
(5, '{\"temperature\":22,\"humidity\":52}', '2022-10-16 11:07:44', '2022-10-16 11:07:44', 2, 2);

INSERT INTO `Users` (`id`, `name`, `slug`, `createdAt`, `updatedAt`) VALUES
(1, 'Lucy Connor', 'lucy-connor', '2022-10-16 11:01:17', '2022-10-16 11:01:17'),
(2, 'Johny Harris', 'johny-harris', '2022-10-16 11:06:43', '2022-10-16 11:06:43');



/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;