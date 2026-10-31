CREATE TABLE IF NOT EXISTS `pickupLocations` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `location` varchar(255) NOT NULL,
  `charge_sales_tax` tinyint(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `location` (`location`)
);