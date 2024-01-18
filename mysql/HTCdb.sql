-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 21, 2023 at 06:34 PM
-- Server version: 10.6.12-MariaDB-cll-lve
-- PHP Version: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u684790856_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `total_cost` decimal(10,2) NOT NULL,
  `is_active` tinyint(1) DEFAULT 1,
  `is_cart` tinyint(1) DEFAULT 0,
  `order_date` timestamp NOT NULL DEFAULT current_timestamp(),
  `location` varchar(255) DEFAULT NULL,
  `shipped` tinyint(1) DEFAULT 0,
  `paid` tinyint(1) DEFAULT 0,
  `email` varchar(255) DEFAULT '',
  `first_name` varchar(100) DEFAULT '',
  `last_name` varchar(100) DEFAULT '',
  `status` varchar(10) DEFAULT 'active'
);

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `user_id`, `total_cost`, `is_active`, `is_cart`, `order_date`, `location`, `shipped`, `paid`, `email`, `first_name`, `last_name`, `status`) VALUES
(23, 14, '16.00', 1, 0, '2023-07-22 00:32:12', 'Home', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(26, 16, '0.00', 1, 1, '2023-07-30 21:29:35', 'dg', 0, 0, 'it@hometeamcreativity.com', 'IT', 'Admin', 'active'),
(27, 17, '28.00', 1, 0, '2023-07-30 22:02:02', 'house', 0, 0, 'admin@hometeamcreativity.com', 'Maggie', 'Tuttle', 'complete'),
(28, 14, '16.00', 1, 0, '2023-07-31 21:09:10', 'Not sure when I\'ll get it, but sometime. 2 Years is the 23rd but not a big deal if I don\'t get it before then.', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(29, 17, '88.00', 1, 0, '2023-08-01 00:04:05', 'test', 0, 0, 'admin@hometeamcreativity.com', 'Maggie', 'Tuttle', 'complete'),
(30, 18, '20.00', 1, 0, '2023-08-01 01:34:36', 'Home', 0, 0, 'ktuttle@compuserve.com', 'Dad', 'Tuttle', 'complete'),
(31, 18, '0.00', 1, 1, '2023-08-01 01:43:50', NULL, 0, 0, '', '', '', 'active'),
(32, 19, '0.00', 1, 1, '2023-08-01 02:27:50', NULL, 0, 0, '', '', '', 'active'),
(33, 20, '0.00', 1, 1, '2023-08-01 14:51:18', NULL, 0, 0, '', '', '', 'active'),
(34, 21, '20.00', 1, 1, '2023-08-01 15:09:18', NULL, 0, 0, '', '', '', 'active'),
(35, 22, '0.00', 1, 1, '2023-08-01 15:33:11', NULL, 0, 0, '', '', '', 'active'),
(36, 23, '16.00', 1, 0, '2023-08-01 18:41:04', 'I can get it from Alex whenever he sees you! :)', 0, 1, 'kaytlynw01@gmail.com', 'Kaytlyn', 'Williams', 'complete'),
(37, 23, '0.00', 1, 1, '2023-08-01 18:46:17', NULL, 0, 0, '', '', '', 'active'),
(38, 24, '0.00', 1, 1, '2023-08-04 19:35:29', NULL, 0, 0, '', '', '', 'active'),
(39, 25, '196.00', 1, 0, '2023-08-17 19:27:28', '1110 Fairview ave Galion, OH 44833', 1, 0, 'stelaweber@yahoo.com', 'Eny', 'Weber Morasko', 'complete'),
(40, 25, '0.00', 1, 1, '2023-08-17 19:54:03', NULL, 0, 0, '', '', '', 'active'),
(41, 26, '48.00', 1, 0, '2023-08-29 20:02:47', '986 Ramsey Drive Mansfield , Ohio 44905', 1, 0, 'bethanyfulk@yahoo.com', 'Beth', 'Fulk', 'complete'),
(42, 26, '0.00', 1, 1, '2023-08-29 20:07:42', NULL, 0, 0, '', '', '', 'active'),
(43, 27, '22.00', 1, 0, '2023-08-29 20:14:37', 'Northmor school', 0, 1, 'Keirns49@gmail.com', 'Sarah', 'Keirns', 'complete'),
(44, 27, '0.00', 1, 1, '2023-08-29 20:17:09', NULL, 0, 0, '', '', '', 'active'),
(45, 28, '26.00', 1, 0, '2023-08-29 20:21:44', 'Iberia Dollar General ', 0, 1, 'jojob96@gmail.com', 'Jodi', 'Britt', 'complete'),
(46, 28, '0.00', 1, 1, '2023-08-29 20:26:02', NULL, 0, 0, '', '', '', 'active'),
(47, 29, '26.00', 1, 0, '2023-08-29 20:53:08', 'Northmor ', 0, 1, 'kim.harvey72@yahoo.com', 'Kim', 'Harvey', 'complete'),
(48, 29, '0.00', 1, 1, '2023-08-29 21:03:19', NULL, 0, 0, '', '', '', 'active'),
(49, 30, '26.00', 1, 0, '2023-08-29 21:31:54', 'Iberia dollar general', 0, 1, 'Julie.schnuerer@gmail.com', 'Julie', 'Schnuerer', 'complete'),
(50, 30, '0.00', 1, 1, '2023-08-29 21:43:34', NULL, 0, 0, '', '', '', 'active'),
(51, 31, '44.00', 1, 0, '2023-08-29 21:51:49', 'Northmor ', 0, 1, 'patriciafactor82@gmail.com', 'Trish', 'Factor', 'complete'),
(52, 32, '28.00', 1, 0, '2023-08-29 23:24:16', 'Northmor ', 0, 0, 'sckrabill@yahoo.com', 'Casey', 'Krabill', 'complete'),
(53, 32, '0.00', 1, 1, '2023-08-29 23:27:11', NULL, 0, 0, '', '', '', 'active'),
(54, 31, '0.00', 1, 1, '2023-08-30 01:56:33', NULL, 0, 0, '', '', '', 'active'),
(55, 33, '26.00', 1, 0, '2023-08-30 18:39:34', 'Northmor school ', 0, 1, 'cramerandrea6@gmail.com', 'Andrea', 'Cramer', 'complete'),
(56, 34, '18.00', 1, 0, '2023-08-30 18:48:11', 'Northmor ', 0, 1, 'bcjgh4@gmail.com', 'Jolene', 'Healea', 'complete'),
(57, 33, '0.00', 1, 1, '2023-08-30 18:49:14', NULL, 0, 0, '', '', '', 'active'),
(58, 34, '0.00', 1, 1, '2023-08-31 14:29:19', NULL, 0, 0, '', '', '', 'active'),
(59, 35, '18.00', 1, 1, '2023-09-03 21:07:32', NULL, 0, 0, '', '', '', 'active'),
(60, 36, '0.00', 1, 1, '2023-09-13 19:00:20', NULL, 0, 0, '', '', '', 'active'),
(61, 14, '16.00', 1, 0, '2023-10-05 18:32:53', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(62, 37, '0.00', 1, 1, '2023-10-06 00:28:30', NULL, 0, 0, '', '', '', 'active'),
(63, 16, '16.00', 1, 0, '2023-10-06 00:30:36', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(64, 16, '20.00', 1, 1, '2023-10-06 00:34:08', NULL, 0, 0, '', '', '', 'active'),
(65, 17, '18.00', 1, 0, '2023-10-15 20:19:27', 'test', 0, 1, 'admin@hometeamcreativity.com', 'Maggie', 'Tuttle', 'complete'),
(66, 16, '16.00', 1, 0, '2023-10-18 00:46:03', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(67, 16, '16.00', 1, 0, '2023-10-18 00:56:18', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(68, 14, '16.00', 1, 0, '2023-10-18 00:57:57', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(69, 14, '16.00', 1, 0, '2023-10-18 00:59:49', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(70, 14, '16.00', 1, 0, '2023-10-18 01:00:35', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(71, 14, '16.00', 1, 0, '2023-10-18 01:03:21', 'dg', 0, 0, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(72, 14, '0.00', 1, 1, '2023-10-18 01:03:51', NULL, 0, 0, '', '', '', 'active'),
(73, 38, '0.00', 1, 1, '2023-10-22 21:28:44', NULL, 0, 0, '', '', '', 'active'),
(74, 37, '32.00', 1, 0, '2023-10-31 23:36:12', 'dg', 0, 1, 'alexmtuttle@gmail.com', 'Alex', 'Tuttle', 'complete'),
(75, 37, '48.00', 1, 0, '2023-11-03 00:15:33', 'house', 0, 0, 'test@gmail.com', 'test', 'test', 'complete'),
(76, 17, '42.00', 1, 0, '2023-11-03 00:38:49', 'test', 0, 0, 'admin@hometeamcreativity.com', 'Maggie', 'Tuttle', 'complete'),
(77, 17, '0.00', 1, 1, '2023-11-20 15:59:17', NULL, 0, 0, '', '', '', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `product_id` int(11) NOT NULL,
  `product_name` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `filename` varchar(255) NOT NULL,
  `product_desc` varchar(2047) DEFAULT 'No description',
  `tag_list` varchar(255) DEFAULT 'tagme',
  `is_available` tinyint(1) DEFAULT 0,
  `tColors` varchar(255) DEFAULT 'None',
  `lColors` varchar(255) DEFAULT 'None',
  `cColors` varchar(255) DEFAULT 'None',
  `hColors` varchar(255) DEFAULT 'None',
  `nameOnBack` tinyint(1) DEFAULT NULL,
  `numberOnBack` tinyint(1) DEFAULT NULL,
  `categories` varchar(1000) DEFAULT NULL,
  `default_style` varchar(255) DEFAULT NULL
);

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`product_id`, `product_name`, `price`, `filename`, `product_desc`, `tag_list`, `is_available`, `tColors`, `lColors`, `cColors`, `hColors`, `nameOnBack`, `numberOnBack`, `categories`, `default_style`) VALUES
(0, 'Custom Design', '16.00', 'customDesign.png', 'No description', 'custom personal', 0, 'Black', 'Black', 'Black', 'Black', NULL, NULL, 'All ', 'tshirt'),
(1, 'Be Like Friends', '16.00', 'designOne.png', 'No description', 'Friends Friend Ross Rachel Joey Chandler Monica Love Joy Kind', 0, 'Black Navy Royal Red Maroon Green Purple', ' Black Navy Red Royal', 'Black', ' Black Navy Red', NULL, NULL, 'All  Other Friends Sitcom', 'longsleeve'),
(3, 'Be Like Friends', '16.00', 'BLF (yellow pink orange sky white).png', 'No description', 'friends custom', 0, ' Gray', ' Gray', ' Gray', ' Gray', NULL, NULL, 'All  Other Friends Sitcom', 'crewneck'),
(4, 'Be Like Friends', '16.00', 'BLF (primary).png', 'No description', 'friends custom', 0, ' Pink Yellow Orange White', ' White', ' White', ' White', NULL, NULL, 'All  Other Friends Sitcom', 'hoodie'),
(5, 'Me? Sarcastic? Never', '16.00', 'MSN (black green maroon purple red royal navy.png', 'No description', 'sarcasm funny comedy custom shirt girl gift comedic sarcastic quote never me', 0, ' Green Black Maroon Purple Red Royal Navy', ' Black Navy Red Royal', ' Black', ' Black Navy Red', NULL, NULL, 'All  Other Quotes', 'tshirt'),
(6, 'Me? Sarcastic? Never', '16.00', 'MSN (yellow pink orange sky grey white.png', 'No description', 'sarcasm humor shirt custom me sarcastic never', 0, '     Gray White Orange Yellow', ' Gray White', ' Gray White', ' White Gray', NULL, NULL, 'All  Other Quotes', 'longsleeve'),
(7, 'Akron Zips, Edition 1', '16.00', 'UAE1(nbpmrr).png', 'No description', 'akron university of akron zips zippers college shirts custom school hoodie', 0, ' Black  Maroon Purple Red Royal Navy', ' Black Navy Red Royal', ' Black', '  Navy Red  Black', NULL, NULL, 'All  School Akron', 'hoodie'),
(8, 'Akron Zips, Edition 1', '16.00', 'UAE1(pgwg).png', 'No description', 'akron university of akron zips zippers college shirts custom school hoodie', 0, ' Gray Pink Green White', ' Gray White', ' Gray White', '  Gray White', NULL, NULL, 'All  School Akron', 'tshirt'),
(9, 'Akron Zips, Edition 1', '16.00', 'UAE1(oy).png', 'No description', 'akron university of akron zips zippers college shirts custom school hoodie', 0, ' Yellow Orange', '', '', '', NULL, NULL, 'All  School Akron', 'tshirt'),
(10, 'Findlay Oilers, Edition 1', '16.00', 'FOE1(bnp).png', 'No description', 'findlay university of ohio school college custom shirt hoodie longsleeve ', 0, ' Black Navy Purple', ' Black Navy', ' Black', ' Black Navy', NULL, NULL, 'All  School Findlay', 'tshirt'),
(11, 'Findlay Oilers, Edition 1', '16.00', 'FOE1(gw).png', 'No description', 'findlay university of ohio school college custom shirt hoodie longsleeve ', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Findlay', 'tshirt'),
(12, 'Findlay Oilers, Edition 1', '16.00', 'FOE1(pgrro).png', 'No description', 'findlay university of ohio school college custom shirt hoodie longsleeve ', 0, ' Orange Pink Maroon Royal Green Red Yellow', '  Red Royal', '', ' Red', NULL, NULL, 'All  School Findlay', 'tshirt'),
(13, 'If One Has Faith', '18.00', 'IOHF(WPgl).png', 'No description', 'faith God Jesus Spiritual Faith Everything If One Has Lord Christian shirt custom hoodie longsleeve tshirt', 0, ' Royal Black Purple Navy', ' Royal Navy Black', ' Black', ' Navy Black', NULL, NULL, 'All  Faith', 'tshirt'),
(14, 'If One Has Faith', '18.00', 'IOHF(blackpinkgl).png', 'No description', 'faith God Jesus Spiritual Faith Everything If One Has Lord Christian shirt custom hoodie longsleeve tshirt', 0, ' Gray White Green Yellow', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  Faith', 'tshirt'),
(15, 'If One Has Faith', '18.00', 'IOHF(whitegold.png', 'No description', 'faith God Jesus Spiritual Faith Everything If One Has Lord Christian shirt custom hoodie longsleeve tshirt', 0, ' Maroon Red', ' Red', '', ' Red', NULL, NULL, 'All  Faith', 'tshirt'),
(16, 'If One Has Faith', '18.00', 'IOHF(Blackpurplegl).png', 'No description', 'faith God Jesus Spiritual Faith Everything If One Has Lord Christian shirt custom hoodie longsleeve tshirt', 0, ' Pink Orange', '', '', '', NULL, NULL, 'All  Faith', 'tshirt'),
(17, 'A Moo Point', '20.00', 'moo point design.png', 'No description', 'friends a moo point its moo cow tv shows custom shirt funny comedy animal usa', 0, ' Gray Black Pink Maroon Orange Purple Green Navy', ' Gray Black Navy', ' Black Gray', ' Black Gray Navy', NULL, NULL, 'All  Other Friends Sitcom Quotes', 'tshirt'),
(18, 'A Moo Point', '20.00', 'AMP (blkblbr).png', 'No description', 'friends a moo point', 0, '    Yellow White  Red', '  White Red', ' White', ' White Red', NULL, NULL, 'All  Other Friends Sitcom Quotes', 'tshirt'),
(23, 'Mount Gilead Baseball, Edition 1', '16.00', 'IBE1(bp).png', 'No description', 'baseball, indians, mount gilead, sports, custom, tshirt', 0, ' White   Pink Gray', ' White Gray', ' White Gray', ' White Gray', NULL, NULL, 'All  School Sports Mount Gilead Baseball Softball', 'tshirt'),
(24, 'Mount Gilead Baseball, Edition 1', '16.00', 'IBE1(wp).png', 'No description', 'baseball, indians, mount gilead, sports, custom, tshirt', 0, ' Black', ' Black', ' Black', ' Black', NULL, NULL, 'All  School Sports Mount Gilead Baseball Softball', 'tshirt'),
(25, 'Mount Gilead Baseball, Edition 1', '16.00', 'IBE1(wb).png', 'No description', 'baseball, indians, mount gilead, sports, custom, tshirt', 0, ' Purple Navy Green Royal Red Orange Maroon', ' Red Royal Navy', '', ' Red Navy', NULL, NULL, 'All  School Sports Baseball Mount Gilead Softball', 'tshirt'),
(26, 'Northmor Volleyball, Edition 1', '16.00', 'NVE1(yellowhite).png', 'No description', 'northmor, volleyball, sports, school, knights, golden, vball', 0, ' Black Pink Maroon Green Red Royal Navy Purple', ' Black Navy Royal Red', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Northmor Volleyball Sports', 'tshirt'),
(27, 'Northmor Volleyball, Edition 1', '16.00', 'NVE1(blkye_.png', 'No description', 'northmor, volleyball, sports, school, knights, golden, vball', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Northmor Sports Volleyball', 'tshirt'),
(28, 'Northmor Volleyball, Edition 1', '16.00', 'NVE1(bw).png', 'No description', 'northmor, volleyball, sports, school, knights, golden, vball', 0, ' Yellow Orange', '', '', '', NULL, NULL, 'All  School Northmor Sports Volleyball', 'tshirt'),
(29, 'Northmor Football, Edition 1', '18.00', 'NFE1(gw).png', 'No description', 'northmor, football, sports, school, knights, golden, fball', 0, ' Black Red Maroon Pink Green Purple Royal Navy', ' Black Navy Red Royal', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(30, 'Northmor Football, Edition 1', '18.00', 'NFE1(bg).png', 'No description', 'northmor, football, sports, school, knights, golden, fball', 0, ' White Gray', ' White Gray', ' White Gray', ' White Gray', NULL, NULL, 'All  School Sports Football Northmor', 'tshirt'),
(32, 'Northmor Football, Edition 1', '18.00', 'NFE1(bblkgl).png', 'No description', 'northmor, football, sports, school, knights, golden, fball', 0, ' Yellow Orange', '', '', '', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(34, 'Saint Joseph, Edition 1', '16.00', 'SJE1(wy).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes', 0, ' Black Navy Royal Purple', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  School Faith St. Joseph', 'tshirt'),
(35, 'Saint Joseph, Edition 2', '16.00', 'SJE1(by).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes', 0, ' Gray Pink Maroon Red Green', ' Gray Red', ' Gray', ' Gray Red', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(36, 'Saint Joseph, Edition 1', '16.00', 'SJE1(bo).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes', 0, ' White', ' White', ' White', ' White', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(37, 'Saint Joseph, Edition 1', '16.00', 'SJE1(bo,w).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes', 0, ' Yellow Orange', '', '', '', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(38, 'Saint Joseph, Edition 2', '16.00', 'SJE2(navy).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes pray', 0, ' White Pink Gray Maroon Orange Red Green', ' White Red Gray', ' White Gray', ' White Gray Red', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(39, 'Saint Joseph, Edition 2', '16.00', 'SJE2(red).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes pray', 0, ' Black Yellow Purple Royal Navy', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(40, 'Saint Joseph, Edition 3', '16.00', 'SJE3(bw).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes pray', 0, ' Red  Orange Gray Yellow Pink Green Maroon Purple', ' Red Gray', ' Gray', ' Red Gray', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(41, 'Saint Joseph, Edition 3', '16.00', 'SJE3(rw_.png', 'No description', 'saint joseph school saints faith school galion oh  st joe sts joes pray', 0, ' Black Navy Royal', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(42, 'Saint Joseph, Edition 3', '16.00', 'SJE3(rb).png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes pray', 0, ' White', ' White', ' White', ' White', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(43, 'Saint Joseph, Edition 4', '16.00', 'SJE4w.png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes pray', 0, ' Gray Black Red Maroon Navy Royal Green Purple', ' Gray Black Navy Red Royal', ' Gray Black', ' Gray Navy Black Red', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(44, 'Saint Joseph, Edition 4', '16.00', 'SJE4b.png', 'No description', 'saint joseph school saints faith school galion oh st joe sts joes pray', 0, ' White Yellow Pink Orange', ' White', ' White', ' White', NULL, NULL, 'All  Faith School St. Joseph', 'tshirt'),
(45, 'Ohio, Edition 1', '16.00', 'OE1rw.png', 'No description', 'ohio state oh usa state cheetah print', 0, ' Black', ' Black', ' Black', ' Black', NULL, NULL, 'All  Ohio School', 'tshirt'),
(46, 'Ohio, Edition 1', '16.00', 'OE1wb.png', 'No description', 'ohio state cheetah print shirts custom state shirts usa', 0, ' Red Yellow Pink Green Maroon Orange Purple Royal', ' Red Royal', '', ' Red', NULL, NULL, 'All  Ohio School', 'tshirt'),
(47, 'Ohio, Edition 1', '16.00', 'OE1rwi.png', 'No description', 'ohio state oh usa state ', 0, ' Gray Navy', ' Gray Navy', ' Gray', ' Gray Navy', NULL, NULL, 'All  Ohio School', 'tshirt'),
(48, 'Ohio, Edition 2', '16.00', 'OE2w.png', 'No description', 'Ohio, state, oh, usa state state outline shirts custom ', 0, ' Red Black Royal Navy Purple Maroon Gray', ' Red Black Navy Royal Gray', ' Black Gray', ' Red Black Navy Gray', NULL, NULL, 'All  Ohio School', 'tshirt'),
(49, 'Ohio, Edition 2', '16.00', 'OE2b.png', 'No description', 'Ohio, state, oh, usa state state outline shirts custom ', 0, ' White Yellow Pink Orange Green', ' White', ' White', ' White', NULL, NULL, 'All  Ohio School', 'tshirt'),
(51, 'Northmor, Edition 1', '18.00', 'NE1whgl.png', 'No description', 'northmor, knights, glitter shirts', 0, ' Black Navy Royal Red Purple Maroon', ' Black Navy Red Royal', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Northmor', 'tshirt'),
(52, 'Northmor, Edition 1', '18.00', 'NE1 blkgl.png', 'No description', 'northmor, knights, glitter shirts', 0, ' Yellow Orange', '', '', '', NULL, NULL, 'All  School Northmor', 'tshirt'),
(53, 'Northmor, Edition 1', '18.00', 'NE1, bg.png', 'No description', 'northmor, knights, glitter shirts', 0, '  Gray White Green Pink', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Northmor', 'tshirt'),
(57, 'Baseball Game Day', '16.00', 'bgdwht.png', 'No description', 'baseball, sports, sport, shirts, game day gameday sports school baseball home run', 0, ' Royal Maroon Black Purple Red Navy', '  Royal Navy Black Red', ' Black', ' Navy Black Red', NULL, NULL, 'All  Sports Baseball Seasons Summer Spring Softball', 'tshirt'),
(58, 'Baseball Game Day', '16.00', 'bgdblk.png', 'No description', 'baseball, sports, sport, shirts, game day gameday sports school baseball home run', 0, ' Yellow White Pink Green Orange Gray', ' Gray White', ' White Gray', ' White Gray', NULL, NULL, 'All  Sports Baseball Seasons  Spring Summer Softball', 'tshirt'),
(59, 'Football Game Day', '16.00', 'fbgdb.png', 'No description', 'football game day fall sports', 0, '  Gray White Yellow Pink Orange Green', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  Sports Football Seasons Fall', 'tshirt'),
(60, 'Football Game Day', '16.00', 'fbgdw.png', 'No description', 'football game day fall sports', 0, '    Royal Black Maroon Red Navy Purple', '   Royal Navy Black Red', ' Black', '  Black Navy Red', NULL, NULL, 'All  Sports Football Seasons Fall', 'tshirt'),
(61, 'Northmor Football, Edition 2', '16.00', 'NFE2bwy.png', 'No description', 'northmor football', 0, ' Gray Black Maroon Royal Navy', ' Gray Black Royal Navy', ' Gray Black', ' Gray Black  Navy', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(62, 'Northmor Football, Edition 2', '16.00', 'NFE2bw.png', 'No description', 'football northmor', 0, ' Yellow Pink Red Orange Green Purple', ' Red', '', ' Red', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(63, 'Northmor Football, Edition 2', '16.00', 'NFE2by.png', 'No description', 'northmor football', 0, ' White', ' White', ' White', ' White', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(64, 'Northmor, Edition 2', '16.00', 'NE2wy.png', 'No description', 'northmor simple knights knighthead', 0, ' Black Gray Maroon Red Green Purple Royal Navy', ' Black Gray Red Navy Royal', ' Black Gray', ' Black Gray Red Navy', NULL, NULL, 'All  School Northmor', 'tshirt'),
(65, 'Northmor, Edition 2', '16.00', 'NE2b.png', 'No description', 'northmor knights simple knighthead', 0, ' White Yellow Orange Pink', ' White', ' White', ' White', NULL, NULL, 'All  School Northmor', 'tshirt'),
(66, 'Autism Awareness, Edition 1', '16.00', 'AAE1 wp.png', 'No description', 'autism awareness ', 0, ' Royal Black Navy Gray Maroon Purple Red', ' Royal Black Gray Navy Red', ' Black Gray', ' Navy Black Gray Red', NULL, NULL, 'All  Health Autism', 'tshirt'),
(67, 'Autism Awareness, Edition 1', '16.00', 'AAE1bp.png', 'No description', 'autism awareness', 0, ' Orange White Green Yellow', ' White', ' White', ' White', NULL, NULL, 'All  Health Autism', 'tshirt'),
(68, 'Autism Awareness, Edition 1', '16.00', 'AAE1br.png', 'No description', 'autism awareness', 0, ' Pink', '', '', '', NULL, NULL, 'All  Health Autism', 'tshirt'),
(70, 'Guess What? Chicken Butt', '16.00', 'gwcbwhite.png', 'No description', 'guess what chicken butt funny quotes chick farm kids', 0, ' Red Black Maroon Purple Royal  Navy', ' Red Black Navy Royal', ' Black', ' Red Black Navy', NULL, NULL, 'All  Other Quotes', 'tshirt'),
(71, 'Guess What? Chicken Butt', '16.00', 'gwcbblack.png', 'No description', 'guess what chicken butt funny quotes chick farm kids', 0, ' Green Yellow Pink White Gray Orange', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  Other Quotes', 'tshirt'),
(72, 'Northmor, Edition 3', '16.00', 'NE3by.png', 'No description', 'northmor cheetah print knights', 0, ' White Gray Pink Green', ' White Gray', ' White Gray', ' White Gray', NULL, NULL, 'All  School Northmor', 'tshirt'),
(73, 'Northmor, Edition 3', '16.00', 'NE32yw.png', 'No description', 'northmor cheetah print knights', 0, ' Black Maroon Purple Red Navy', ' Black Navy Red', ' Black', ' Black Navy Red', NULL, NULL, 'All  School Northmor', 'tshirt'),
(74, 'Northmor, Edition 3', '16.00', 'NE3wb.png', 'No description', 'northmor cheetah print knights', 0, ' Yellow Orange Royal', ' Royal', '', '', NULL, NULL, 'All  School Northmor', 'tshirt'),
(75, 'Lynch Syndrome Awareness, Edition 1', '20.00', 'lsaeb.png', 'No description', 'Lynch Syndrome Awareness', 0, ' Pink Gray  White Orange Green', ' White Gray', ' White Gray', ' White Gray', NULL, NULL, 'All  Health', 'tshirt'),
(76, 'Lynch Syndrome Awareness, Edition 1', '20.00', 'lsae1w.png', 'No description', 'Lynch Syndrome Awareness', 0, ' Maroon Black Navy', ' Black Navy', ' Black', ' Black Navy', NULL, NULL, 'All  Health', 'tshirt'),
(77, 'Bowling Green Falcons, Edition 1', '16.00', 'BGFE1ow.png', 'No description', 'Bowling Green Falcons cheetah print', 0, ' Black Navy Royal Maroon Green Purple', ' Black Navy Royal', ' Black', '  Black Navy', NULL, NULL, 'All  School', 'tshirt'),
(78, 'Bowling Green Falcons, Edition 1', '16.00', 'BGFE1wb.png', 'No description', 'Bowling Green Falcons cheetah print', 0, ' Orange Red Pink Yellow', ' Red', '', ' Red', NULL, NULL, 'All  School', 'tshirt'),
(79, 'Bowling Green Falcons, Edition 1', '16.00', 'bge1ob.png', 'No description', 'Bowling Green Falcons cheetah print', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School', 'tshirt'),
(80, 'Northmor, Edition 4', '18.00', 'ne4gg.png', 'No description', 'northmor knights 4 gold glitter', 0, ' Black Gray Maroon Purple Red White ', ' Black Red Gray White', ' Black Gray', '  Black Gray White', NULL, NULL, 'All  School Northmor', 'tshirt'),
(81, 'Northmor, Edition 4', '18.00', 'ne4b.png', 'No description', 'northmor knights glitter ', 0, ' Yellow Pink Green Orange Royal Navy', ' Royal Navy', '', ' Navy', NULL, NULL, 'All  School Northmor', 'tshirt'),
(82, 'Northmor, Edition 5', '16.00', 'ne5wg.png', 'No description', 'northmor knights 5 in the castle knightcastle', 0, ' Black Navy Royal Red Maroon Purple', ' Black Navy Red Royal', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Northmor', 'tshirt'),
(86, 'Northmor, Edition 5', '16.00', 'ne5bg.png', 'No description', 'northmor knights 5 in the castle knightcastle', 0, ' White Green Gray Pink', ' White Gray', ' White Gray', ' White Gray', NULL, NULL, 'All  School Northmor', 'tshirt'),
(87, 'Northmor, Edition 5', '16.00', 'ne5bw.png', 'No description', 'northmor in the castle knights 5', 0, ' Yellow Orange', '', '', '', NULL, NULL, 'All  School Northmor', 'tshirt'),
(88, 'Northmor, Edition 6', '16.00', 'ne6w.png', 'No description', 'northmor knights', 0, '  Black Royal Navy Purple Maroon Red', '  Black Red Royal Navy', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Northmor', 'tshirt'),
(89, 'Northmor, Edition 6', '16.00', 'ne6b.png', 'No description', 'northmor knights simple knighthead', 0, '  White Pink Yellow Gray Orange Green', ' White Gray', ' White Gray', '  White Gray', NULL, NULL, 'All  School Northmor', 'tshirt'),
(90, 'Northmor, Edition 7', '18.00', 'ne7gg.png', 'No description', 'glitter northmor knights ', 0, ' Black Maroon Purple  Gray White Navy Red', ' Black Gray White Navy Red', ' Black  White Gray', ' Black Gray White Navy Red', NULL, NULL, 'All  School Northmor', 'tshirt'),
(91, 'Northmor, Edition 7', '18.00', 'ne7bg.png', 'No description', 'northmor knights black glitter knighthead', 0, ' Yellow Pink Orange Green Royal', ' Royal', '', '', NULL, NULL, 'All  School Northmor', 'tshirt'),
(92, 'Mount Gilead, Edition 1', '18.00', 'mge1sp.png', 'No description', 'mount gilead indians glitter purple', 0, ' Black Yellow Pink Maroon Green Red Royal Navy Orange', ' Black Navy Royal Red', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Mount Gilead', 'tshirt'),
(93, 'Mount Gilead, Edition 1', '18.00', 'mge1bp.png', 'No description', 'mount gilead indians purple glitter', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Mount Gilead', 'tshirt'),
(94, 'Mount Gilead, Edition 1', '18.00', 'mge1bs.png', 'No description', 'mount gilead indians purple glitter black', 0, ' Purple', '', '', '', NULL, NULL, 'All  School Mount Gilead', 'tshirt'),
(95, 'Northmor, Edition 8', '16.00', 'ne8g.png', 'No description', 'northmor knights', 0, '  Gray Black Pink Maroon Purple Red Royal Green Navy', ' Gray Black Navy Red Royal', ' Gray Black', ' Gray Black Navy Red', NULL, NULL, 'All  School Northmor', 'tshirt'),
(96, 'Northmor, Edition 8', '16.00', 'ne8b.png', 'No description', 'northmor golden knights', 0, '   White Yellow Orange', ' White', ' White', ' White', NULL, NULL, 'All  School Northmor', 'tshirt'),
(97, 'Northmor, Edition 9', '16.00', 'ne9bg.png', 'No description', 'northmor knights cheetah print golden', 0, ' Gray  Green Pink White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Northmor', 'tshirt'),
(98, 'Northmor, Edition 9', '16.00', 'ne9wg.png', 'No description', 'northmor knights 9 golden cheetah print', 0, ' Black Maroon Red Royal Navy Purple', ' Black Navy Red Royal', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Northmor', 'tshirt'),
(99, 'Findlay Oilers, Edition 2', '16.00', 'foe2wo.png', 'No description', 'findlay university of oilers cheetah print uf', 0, ' Black Pink Navy', ' Black Navy', ' Black', ' Black Navy', NULL, NULL, 'All  School Findlay', 'tshirt'),
(100, 'Findlay Oilers, Edition 2', '16.00', 'foe2bw.png', 'No description', 'findlay university of oilers cheetah print uf', 0, ' Orange Yellow Green Purple Red Royal Maroon', ' Red Royal', '', ' Red', NULL, NULL, 'All  School Findlay', 'tshirt'),
(101, 'Findlay Oilers, Edition 2', '16.00', 'foe2ob.png', 'No description', 'findlay university of oilers cheetah print uf', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Findlay', 'tshirt'),
(103, 'Northmor Football, Edition 3', '18.00', 'NFE3sbb.png', 'No description', 'football, northmor, edition3, knights, golden, goldenknights, northmorschool, school spirit fball shirts', 0, ' Yellow Gray Orange Royal Green White Pink', ' Gray Royal White', '  Gray White', ' Gray White', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(104, 'Northmor Football, Edition 3', '18.00', 'NFE3swy.png', 'No description', 'football, northmor, edition3, knights, golden, goldenknights, northmorschool, school spirit fball shirts', 0, ' Black Red Navy Maroon Purple', ' Black Navy Red', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(105, 'Forgiven Acts 2:38', '16.00', 'Fb.png', 'No description', 'forgiven acts 2:38 faith spiritual church spirit God Jesus Christian christians forgive churchshirts baptism sacrament love hope', 0, ' Gray Yellow Pink Green Orange', '   Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  Faith Other Quotes', 'tshirt'),
(106, 'Forgiven Acts 2:38', '16.00', 'Fw.png', 'No description', 'forgiven acts 2:38 faith spiritual church spirit God Jesus Christian christians forgive churchshirts baptism sacrament love hope', 0, ' Purple Black  Maroon Royal Red Navy', ' Navy Red Royal Black', ' Black', '   Navy Red Black', NULL, NULL, 'All  Faith Other Quotes', 'tshirt'),
(107, 'Cool Mom', '16.00', 'cmw.png', 'No description', 'cool mom, mother, shirts, mothersday regular mom i am not a regular mom i am a cool mom funmom fun momhoodie hoodie ', 0, '  Maroon Royal Purple Black Red Navy', ' Red Royal Black Navy', ' Black', '  Red Navy Black', NULL, NULL, 'All  Family Other Quotes', 'tshirt'),
(108, 'Cool Mom', '16.00', 'cmb.png', 'No description', 'mother mom cool mom shirt shirts mother mothers mothersday funmom fun funny humerous laugh hoodie', 0, ' Pink Yellow Gray Orange Green White', ' White Gray', '  White Gray', ' White Gray', NULL, NULL, 'All  Other Family Quotes', 'tshirt'),
(109, 'HomeTeam Creativity, Edition 1', '18.00', 'HTVE1bgw.png', 'No description', 'hometeam creativity edition 1 business shirt shirts hoodie tshirt long sleeve crewneck sweatshirt home team creative custom busines small shop apparel', 0, ' Black Pink Maroon Purple Red Green', ' Black Red', ' Black', ' Black Red', NULL, NULL, 'All  Other', 'tshirt'),
(110, 'HomeTeam Creativity, Edition 1', '18.00', 'HTCE1bgb.png', 'No description', 'hometeam creativity edition 1 business shirt shirts hoodie tshirt long sleeve crewneck sweatshirt home team creative custom busines small shop apparel', 0, ' White Orange Yellow', ' White', ' White', ' White', NULL, NULL, 'All  Other', 'tshirt'),
(111, 'HomeTeam Creativity, Edition 1', '18.00', 'HTCE1sw.png', 'No description', 'hometeam creativity edition 1 business shirt shirts hoodie tshirt long sleeve crewneck sweatshirt home team creative custom busines small shop apparel', 0, ' Royal Navy', '   Royal Navy', '', ' Navy', NULL, NULL, 'All  Other', 'tshirt'),
(112, 'HomeTeam Creativity, Edition 1', '18.00', 'HTCE1wb.png', 'No description', 'hometeam creativity edition 1 business shirt shirts hoodie tshirt long sleeve crewneck sweatshirt home team creative custom busines small shop apparel', 0, ' Gray', ' Gray', ' Gray', ' Gray', NULL, NULL, 'All  Other', 'tshirt'),
(113, 'Saint Joseph, Edition 5', '16.00', 'sje5rw.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Black Purple Royal Green Navy', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(114, 'Saint Joseph, Edition 5', '16.00', 'sje5rb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, '  Gray White Orange Yellow', '  Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(115, 'Saint Joseph, Edition 5', '16.00', 'sje5bw.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Red Maroon Pink', ' Red', '', ' Red', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(116, 'Saint Joseph, Edition 6', '16.00', 'sje6rw.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Royal Black Navy Green Purple', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(117, 'Saint Joseph, Edition 6', '16.00', 'sje6rb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, '  Gray Orange Yellow White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(118, 'Saint Joseph, Edition 6', '16.00', 'sje6wb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Maroon Pink Red', ' Red', '', ' Red', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(119, 'Saint Joseph, Edition 7', '16.00', 'sje7wr.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Black Purple Royal Green Navy', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(120, 'Saint Joseph, Edition 7', '16.00', 'sje7rb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Gray Yellow Orange White', '  Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(121, 'Saint Joseph, Edition 7', '16.00', 'sje7bw.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' Red Maroon Pink', ' Red', '', ' Red', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(122, 'Saint Joseph, Edition 8', '16.00', 'sje8rw.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, '  Black Royal Navy Green Purple', ' Navy Royal Black', ' Black', ' Black Navy', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(123, 'Saint Joseph, Edition 8', '16.00', 'sje8rb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, ' White Yellow Orange', ' White Gray', ' White Gray', ' White Gray', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(124, 'Saint Joseph, Edition 8', '16.00', 'sje8bw.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints ', 0, '   Pink Maroon Red', ' Red', '', ' Red', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(125, 'Saint Joseph, Edition 9', '18.00', 'sje9rs.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints glitter sparkle', 0, ' Black Purple Royal Green Navy Yellow', ' Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(126, 'Saint Joseph, Edition 9', '18.00', 'sje9bs.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints glitter sparkle', 0, '  Red Pink Maroon Orange', ' Red', '', ' Red', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(127, 'Saint Joseph, Edition 9', '18.00', 'sje9rb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints glitter sparkle', 0, ' White Gray', ' White Gray', ' Gray White', ' White Gray', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(128, 'Saint Joseph, Edition 10', '18.00', 'sje10rs.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints glitter sparkle', 0, ' Royal Navy Black Yellow Green Purple', ' Royal Navy Black', ' Black', ' Black Navy', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(129, 'Saint Joseph, Edition 10', '18.00', 'sje10bs.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints glitter sparkle', 0, ' Maroon Pink Orange Red', ' Red', '', ' Red', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(130, 'Saint Joseph, Edition 10', '18.00', 'sje10rb.png', 'No description', 'saint joseph st joe st joseph saints sts sjs school spirit wear custom apparel saint joseph catholic school galion christian saints glitter sparkle', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  School St. Joseph', 'tshirt'),
(131, 'Bless Your Heart', '20.00', 'byhgp.png', 'No description', 'bless your heart, blessed, christian, apparel, faith, jesus, hearts, love, blesse, Jesus, God, spiritual, loves', 0, ' Yellow Black Navy White Royal Red Green Maroon Orange', ' Navy Black White Red Royal', ' Black White', ' Black White Navy Red', NULL, NULL, 'All  Faith Other Quotes', 'tshirt'),
(132, 'Bless Your Heart', '20.00', 'byhb.png', 'No description', 'bless your heart, blessed, christian, apparel, faith, jesus, hearts, love, blesse, Jesus, God, spiritual, loves', 0, '  Gray', ' Gray', ' Gray', ' Gray', NULL, NULL, 'All  Other Faith Quotes', 'tshirt'),
(133, 'Bless Your Heart', '20.00', 'byhy.png', 'No description', 'bless your heart, blessed, christian, apparel, faith, jesus, hearts, love, blesse, Jesus, God, spiritual, loves', 0, ' Pink Purple', '', '', '', NULL, NULL, 'All  Other Faith Quotes', 'tshirt'),
(134, 'USA, Edition 1', '16.00', 'usae1bw.png', 'No description', 'usa, edition1, united states of america us patriotic july red white blue stars stripes', 0, ' Red Black Gray Yellow Pink Maroon Green Orange Purple', ' Red Black Gray', '  Gray Black', ' Red Black Gray', NULL, NULL, 'All  Patriotic', 'tshirt'),
(135, 'USA, Edition 1', '16.00', 'usae1rw.png', 'No description', 'usa, edition1, united states of america us patriotic july red white blue stars stripes', 0, ' Royal Navy', ' Royal Navy', '', ' Navy', NULL, NULL, 'All  Patriotic', 'tshirt'),
(136, 'USA, Edition 1', '16.00', 'usae1rb.png', 'No description', 'usa, edition1, united states of america us patriotic july red white blue stars stripes', 0, ' White', ' White', ' White', ' White', NULL, NULL, 'All  Patriotic', 'tshirt'),
(137, 'Mount Gilead, Edition 2', '20.00', 'mge1pb.png', 'No description', 'indians mount gilead edition2 stacked indian mt gilead mtgilead mountgilead glitter sparkle multicolor', 0, ' Gray Royal White Yellow Orange Green', ' Gray Royal White', ' Gray White', ' Gray White', NULL, NULL, 'All  School Mount Gilead', 'tshirt'),
(138, 'Mount Gilead, Edition 2', '20.00', 'mge1pw.png', 'No description', 'indians mount gilead edition2 stacked indian mt gilead mtgilead mountgilead glitter sparkle multicolor', 0, ' Black Maroon Red Navy', ' Black Navy Red', ' Black', ' Black Navy Red', NULL, NULL, 'All  School Mount Gilead', 'tshirt'),
(139, 'Mount Gilead, Edition 2', '20.00', 'mge1bw.png', 'No description', 'indians mount gilead edition2 stacked indian mt gilead mtgilead mountgilead glitter sparkle multicolor', 0, ' Purple Pink', '', '', '', NULL, NULL, 'All  School Mount Gilead', 'tshirt'),
(140, 'Even Jesus', '16.00', 'ejwy.png', 'No description', 'even jesus had a fish story fishing fishy bible christian funny humor dad shirts ', 0, ' Maroon Black Red Royal Gray Navy Pink Purple Green', ' Black Navy Red Royal Gray', ' Black Gray', ' Black Gray Red Navy', NULL, NULL, 'All  Faith Other Fishing', 'tshirt'),
(141, 'Even Jesus', '16.00', 'ejbr.png', 'No description', 'even jesus had a fish story fishing fishy bible christian funny humor dad shirts ', 0, ' Orange Yellow White', ' White', ' White', ' White', NULL, NULL, 'All  Faith Other Fishing', 'tshirt'),
(143, 'Northmor Football Senior Mom, 2024', '18.00', 'nfsm24wg.png', 'No description', 'Northmor Football Senior Mom, 2024 knights', 0, ' Black', ' Black', ' Black', ' Black', 1, 1, 'All  School Sports Seniors Football Northmor', 'tshirt'),
(144, 'Northmor Football Senior Mom, 2024', '18.00', 'nfsm24b.png', 'No description', 'Northmor Football Senior Mom, 2024 knights', 0, ' Yellow', '', '', '', 1, 1, 'All  School Sports Northmor Seniors Football', 'tshirt'),
(145, 'Northmor Football Senior Mom, 2024', '18.00', 'nfsm24bg.png', 'No description', 'Northmor Football Senior Mom, 2024 knights knight', 0, ' Gray White', ' Gray White', ' Gray White', ' Gray White', 1, 1, 'All  Football Seniors Northmor School Sports', 'tshirt'),
(146, 'Northmor Football Mom, Edition 1', '18.00', 'nfme1g.png', 'No description', 'Northmor Football Mom, Edition 1 fball nhs knights school sports high ', 0, ' Black Maroon Purple Red White Navy', ' Black Navy Red White', ' Black White', ' Black Navy Red White', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(147, 'Northmor Football Mom, Edition 1', '18.00', 'nfme1b.png', 'No description', 'Northmor Football Mom, Edition 1 fball nhs knights school sports high ', 0, '  Gray Yellow Pink Orange Green Royal', ' Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(148, 'Northmor Football Mom, Edition 2', '18.00', 'nfme2gw.png', 'No description', 'Northmor Football Mom, Edition 2 fball nhs knights school sports high ', 0, ' Black Navy Red Maroon Purple', ' Black Red Navy', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(149, 'Northmor Football Mom, Edition 2', '18.00', 'nfme2bw.png', 'No description', 'Northmor Football Mom, Edition 2 fball nhs knights school sports high ', 0, ' Gray Yellow Orange   Royal Green Pink', '  Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(150, 'Northmor Football Mom, Edition 2', '18.00', 'nfme2gb.png', 'No description', 'Northmor Football Mom, Edition 2 fball nhs knights school sports high ', 0, ' White', ' White', ' White', ' White', NULL, NULL, 'All   School Sports Northmor  Football', 'tshirt'),
(151, 'Northmor Football Mom, Edition 3 ', '18.00', 'nfme3gw.png', 'No description', 'Northmor Football Mom, Edition 3 fball nhs knights school sports high ', 0, ' Black Maroon Red Navy Purple', ' Black Navy Red', ' Black', ' Black Red Navy', NULL, NULL, 'All  School Sports  Northmor Football', 'tshirt'),
(152, 'Northmor Football Mom, Edition 3', '18.00', 'nfme3bw.png', 'No description', 'Northmor Football Mom, Edition 3 fball nhs knights school sports high ', 0, ' Yellow Orange Royal Gray Pink Green', '  Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(153, 'Northmor Football Mom, Edition 3', '18.00', 'nfme3bg.png', 'No description', 'Northmor Football Mom, Edition 3 fball nhs knights school sports high ', 0, ' White', ' White', ' White', ' White', NULL, NULL, 'All  School Sports Northmor Football', 'tshirt'),
(154, 'Northmor Volleyball Mom, Edition 1', '18.00', 'nvme1g.png', 'No description', 'Northmor Volleyball Mom, Edition 1 nhs knights knight vball sports girls team', 0, ' Black  Red  Navy White Maroon Purple', ' Black Navy Red White', ' Black White', ' Black Red Navy White', NULL, NULL, 'All  School Sports Northmor Volleyball', 'tshirt'),
(155, 'Northmor Volleyball Mom, Edition 1 ', '18.00', 'nvme1b.png', 'No description', 'Northmor Volleyball Mom, Edition 1 nhs knights knight vball sports girls team', 0, ' Yellow Orange Royal Gray Green Pink', '  Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Northmor Volleyball', 'tshirt'),
(156, 'Northmor Basketball Mom, Edition 1', '18.00', 'nbbme1g.png', 'No description', 'Northmor Basketball Mom, Edition 1 nhs bball ball sports teams guy boy team knights knight', 0, '  White Black Gray Maroon Purple Red  Navy', '  White Black Navy Red ', ' White Black', ' White Black Red Navy', NULL, NULL, 'All  School Sports Northmor Basketball', 'tshirt'),
(157, 'Northmor Basketball Mom, Edition 1', '18.00', 'nbbme1b.png', 'No description', 'Northmor Basketball Mom, Edition 1 nhs bball ball sports teams guy boy team knights knight', 0, '  Gray Royal Yellow Pink Orange Green', ' Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Northmor Basketball', 'tshirt'),
(158, 'Northmor Baseball Mom, Edition 1', '18.00', 'nbme1g.png', 'No description', 'Northmor Baseball Mom, Edition 1 bball ball knight knights team teams guys boys men mens', 0, ' Black Gray Maroon Purple Red  White Navy', ' Black Navy Red  White', ' Black White', ' Black Navy Red White', NULL, NULL, 'All  School Sports Northmor Baseball', 'tshirt'),
(159, 'Northmor Baseball Mom, Edition 1', '18.00', 'nbme1b.png', 'No description', 'Northmor Baseball Mom, Edition 1 bball ball knight knights team teams guys boys men mens', 0, ' Yellow Pink Gray Royal Orange Green', ' Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Baseball Northmor', 'tshirt'),
(160, 'Northmor Softball Mom, Edition 1 ', '18.00', 'nsme1g.png', 'No description', 'Northmor Softball Mom, Edition 1 bball ball knight knights team teams girls ladies women womens', 0, '  White Black  Maroon Purple Red Navy', ' White Black Navy Red', ' White Black', ' White Navy Red Black', NULL, NULL, 'All  School Sports Northmor Softball', 'tshirt'),
(161, 'Northmor Softball Mom, Edition 1', '18.00', 'nsme1b.png', 'No description', 'Northmor Softball Mom, Edition 1 bball ball knight knights team teams girls ladies women womens', 0, '   Gray Yellow Pink Orange Royal Green', '  Gray Royal', ' Gray', ' Gray', NULL, NULL, 'All  School Sports Northmor Softball', 'tshirt'),
(162, 'Hocus Pocus', '16.00', 'hpws.png', 'No description', 'Hocus Pocus halloween fall october september oct sept spooky season oct31', 0, ' Purple Maroon Green Navy Royal Red Black', ' Red Royal Black Navy', ' Black', ' Red Navy', NULL, NULL, 'All  Holiday Halloween Seasons Fall', 'tshirt'),
(163, 'Hocus Pocus', '16.00', 'hpbs.png', 'No description', 'Hocus Pocus halloween fall october september oct sept spooky season oct31', 0, ' Pink Yellow Orange White', ' White', ' White', ' White', NULL, NULL, 'All  Seasons Holiday Halloween Fall', 'tshirt'),
(164, 'Hocus Pocus', '16.00', 'hpbg.png', 'No description', 'Hocus Pocus halloween fall october september oct sept spooky season oct31', 0, ' Gray', ' Gray', ' Gray', ' Gray', NULL, NULL, 'All  Seasons Holiday Halloween Fall', 'tshirt'),
(165, 'Resting Witch Face', '16.00', 'rwfw.png', 'No description', 'Resting Witch Face halloween fall october september oct sept spooky season oct31 funny sarcasm sarcastic comedy witches ', 0, ' Maroon Royal Black Purple Red Navy', ' Royal Red Black Navy', ' Black', ' Navy Red  Black', NULL, NULL, 'All  Seasons Holiday Fall Halloween', 'tshirt'),
(166, 'Resting Witch Face ', '16.00', 'rwfb.png', 'No description', 'Resting Witch Face halloween fall october september oct sept spooky season oct31 funny sarcasm sarcastic comedy witches ', 0, ' Orange Pink Gray Yellow White Green', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  Seasons Holiday Halloween Fall', 'tshirt'),
(167, 'Gobble', '18.00', 'gww.png', 'No description', 'Gobble turkey thanksgiving fall season nov thanks thankful holiday november gobbles turkeys', 0, '  Green Black Purple Royal Navy', '  Black Navy Royal', ' Black', ' Black Navy', NULL, NULL, 'All  Holiday Seasons Fall Thanksgiving', 'tshirt'),
(168, 'Gobble', '18.00', 'gbb.png', 'No description', 'Gobble turkey thanksgiving fall season nov thanks thankful holiday november gobbles turkeys', 0, ' Gray White Yellow Pink', ' Gray White', ' Gray White', ' Gray White', NULL, NULL, 'All  Seasons Holiday Thanksgiving Fall', 'tshirt'),
(169, 'Gobble', '18.00', 'gnored.png', 'No description', 'Gobble turkey thanksgiving fall season nov thanks thankful holiday november gobbles turkeys', 0, ' Red Maroon', ' Red', '', ' Red', NULL, NULL, 'All  Seasons Holiday Thanksgiving Fall', 'tshirt'),
(170, 'Gobble', '18.00', 'gnoorange.png', 'No description', 'Gobble turkey thanksgiving fall season nov thanks thankful holiday november gobbles turkeys', 0, ' Orange', '', '', '', NULL, NULL, 'All  Seasons Holiday Thanksgiving Fall', 'tshirt'),
(176, 'test', '16.00', 'Screenshot 2023-11-10 201956.png', 'No description', 'test', 0, ' Navy', ' Navy', ' Black', ' Navy', NULL, NULL, 'All ', 'longsleeve');

-- --------------------------------------------------------

--
-- Table structure for table `product_orders`
--

CREATE TABLE `product_orders` (
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `product_quantity` int(11) NOT NULL CHECK (`product_quantity` > 0),
  `color` varchar(100) NOT NULL DEFAULT 'Black',
  `product_type` varchar(100) NOT NULL DEFAULT 'Short Sleeve T-shirt',
  `size` varchar(100) NOT NULL DEFAULT 'Adult Medium',
  `product_details` varchar(2047) DEFAULT 'No customization specified'
);

--
-- Dumping data for table `product_orders`
--

INSERT INTO `product_orders` (`order_id`, `product_id`, `product_quantity`, `color`, `product_type`, `size`, `product_details`) VALUES
(23, 71, 1, 'Yellow', 'Short Sleeve T-Shirt', 'Adult Large', 'No Custom Details'),
(27, 0, 1, 'Navy', 'Hooded Sweatshirt', 'Adult Medium', 'test'),
(28, 0, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Large', 'Hello. I would like to order a shirt for Jess for celebrating 2 years. However, it has nothing to do with that. She wants a shirt that says \"Just Here For The Capybara\" with a picture of a capybara below the words. Thank you. Let me know price and how to pay. Not sure what color would look good, so I picked black. Please send me multiple options on different colors to review.'),
(29, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(29, 143, 4, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'Name:  Number: 0'),
(30, 109, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult XXX-Large', 'No Custom Details'),
(34, 1, 1, 'Black', 'Long Sleeve T-Shirt', 'Adult Large', 'No Custom Details'),
(36, 7, 1, 'Navy', 'Short Sleeve T-Shirt', 'Adult Medium', 'No Custom Details'),
(39, 15, 1, 'Red', 'Long Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 17, 1, 'Purple', 'Short Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 34, 1, 'Black', 'Hooded Sweatshirt', 'Youth Small', 'No Custom Details'),
(39, 34, 1, 'Black', 'Long Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 37, 1, 'Yellow', 'Short Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 38, 1, 'White', 'Short Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 40, 1, 'Pink', 'Short Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 41, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult X-Large', 'No Custom Details'),
(39, 43, 1, 'Black', 'Hooded Sweatshirt', 'Adult X-Large', 'No Custom Details'),
(39, 44, 1, 'Pink', 'Short Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(39, 46, 1, 'Red', 'Short Sleeve T-Shirt', 'Youth Small', 'No Custom Details'),
(41, 143, 1, 'Black', 'Hooded Sweatshirt', 'Adult X-Large', 'Name: Fulk Number: 2'),
(41, 143, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Large', 'Name: Fulk Number: 2'),
(43, 143, 1, 'Black', 'Long Sleeve T-Shirt', 'Adult Medium', 'Name: Keirns Number: 24'),
(45, 143, 1, 'Black', 'Crewneck Sweatshirt', 'Adult Large', 'Name: BRITT Number: 50'),
(47, 143, 1, 'Black', 'Crewneck Sweatshirt', 'Adult Medium', 'Name: HARVEY Number: 8'),
(49, 143, 1, 'Black', 'Crewneck Sweatshirt', 'Adult X-Large', 'Name: Schnuerer Number: 15'),
(51, 143, 1, 'Black', 'Long Sleeve T-Shirt', 'Adult Large', 'Name: BENARTH  Number: 7'),
(51, 143, 1, 'Black', 'Long Sleeve T-Shirt', 'Adult Medium', 'Name: BENARTH  Number: 7'),
(52, 143, 1, 'Black', 'Crewneck Sweatshirt', 'Adult XX-Large', 'Name: KRABILL Number: 65'),
(55, 143, 1, 'Black', 'Crewneck Sweatshirt', 'Adult Large', 'Name: Cramer  Number: 4'),
(56, 143, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult X-Large', 'Name: HEALEA Number: 5'),
(59, 143, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult X-Large', 'Name: Brewer Number: 21'),
(61, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(63, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(64, 0, 1, 'Navy', 'Long Sleeve T-Shirt', 'Adult Medium', ''),
(65, 157, 1, 'Gray', 'Short Sleeve T-Shirt', 'Adult Large', 'Add Tuttle 4 to the back, black glitter'),
(66, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(67, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(68, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(69, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(70, 57, 1, 'Royal', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(71, 1, 1, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'No custom details'),
(74, 7, 2, 'Navy', 'Short Sleeve T-Shirt', 'Adult Large', 'Can you update the font for this to be something different. Idk what '),
(75, 1, 3, 'Black', 'Short Sleeve T-Shirt', 'Adult Medium', 'Add heart CB to sleeve please'),
(76, 136, 1, 'White', 'Short Sleeve T-Shirt', 'Youth Large', 'No custom details');

-- --------------------------------------------------------

--
-- Table structure for table `resetTokens`
--

CREATE TABLE `resetTokens` (
  `id` int(11) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `token` varchar(100) DEFAULT NULL,
  `resetTime` timestamp NULL DEFAULT NULL
);

-- --------------------------------------------------------

--
-- Table structure for table `subcategories`
--

CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL
);

--
-- Dumping data for table `subcategories`
--

INSERT INTO `subcategories` (`id`, `name`, `category`) VALUES
(1, 'Autism', 'Health'),
(2, 'Christmas', 'Holiday'),
(3, 'Halloween', 'Holiday'),
(4, 'Thanksgiving', 'Holiday'),
(5, 'Valentines', 'Holiday'),
(6, 'Akron', 'School'),
(8, 'Findlay', 'School'),
(9, 'Galion', 'School'),
(10, 'Kentucky', 'School'),
(11, 'Mount Gilead', 'School'),
(12, 'Northmor', 'School'),
(13, 'Ontario', 'School'),
(14, 'St. Joseph', 'School'),
(15, 'Seniors', 'School'),
(16, 'Teachers', 'School'),
(17, 'Fall', 'Seasons'),
(18, 'Spring', 'Seasons'),
(19, 'Summer', 'Seasons'),
(20, 'Winter', 'Seasons'),
(21, 'Baseball', 'Sports'),
(22, 'Basketball', 'Sports'),
(23, 'Bowling', 'Sports'),
(24, 'Dance', 'Sports'),
(25, 'Football', 'Sports'),
(26, 'Disney', 'Other'),
(27, 'Farming', 'Other'),
(28, 'Fishing', 'Other'),
(29, 'Friends Sitcom', 'Other'),
(30, 'Quotes', 'Other'),
(49, 'Softball', 'Sports'),
(50, 'Volleyball', 'Sports'),
(52, 'Scouts', 'School');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL CHECK (`email` like '_%@_%._%'),
  `pswrd` varchar(255) NOT NULL,
  `admin` tinyint(1) DEFAULT 0,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL
);

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `email`, `pswrd`, `admin`, `first_name`, `last_name`) VALUES
(14, 'alexmtuttle@gmail.com', '$2a$10$7oAuIAk6Lo52x6a.FD5vz.RB7C1IJEBRjRJowb/egGGV/6kQ/S5nG', 0, 'Alex', 'Tuttle'),
(16, 'it@hometeamcreativity.com', '$2a$10$RwuZSDYVLgF6b2ypCPJWcOqhGJYZE1ty2BQyT7s4IF56G.vROpKrq', 1, 'IT', 'Admin'),
(17, 'admin@hometeamcreativity.com', '$2a$10$rCs/NOA7YwpVAT8SJ5EGYua9UM5L9jc3CxJiL.rmVe4OT.G3Jqn/S', 1, 'Maggie', 'Tuttle'),
(18, 'ktuttle@compuserve.com', '$2a$10$B5v4XOoxcJw.ecgYiHv5r.NTp5aEEUTZmZWAvjAi/48OgZZmuuw6O', 0, 'Dad', 'Tuttle'),
(19, 'jessicallowmiller@gmail.com', '$2a$10$DNDOgtsl.FPlvU9IWUFbNO6szdk5d2Rk9ZQGIKYJ7TMU/RWp/1G3q', 0, 'Jess', 'Lowmiller'),
(20, 'skibunny44875@yahoo.com', '$2a$10$mIZybNRT/AX8uBExQ4U5mO88W6BxitOQpMwwqaCuY2dupFJUpC1aa', 0, 'Amy', 'Love'),
(21, 'kevin_nguyen@goodyear.com', '$2a$10$4u9MuPtVNyj.vtH3LhDGh.uYOdV6A8DbCBEuVCJSWOXStk3ZtOsWa', 0, 'Kevin', 'Nguyen'),
(22, 'zoeparrott14@gmail.com', '$2a$10$T/9J9JZN6KapBX2.VSKaxu4FxDB0XpVNCCPY3tLlmgRRZwo9NThpC', 0, 'Zoe', 'Parrottt'),
(23, 'kaytlynw01@gmail.com', '$2a$10$QOPOlfkNiBufpqkE8NEpKeDmZMd05hoFIrsGlUeDyv2CizRvyGpki', 0, 'Kaytlyn', 'Williams'),
(24, 'anissatuttle@gmail.com', '$2a$10$36sq5/kDTH2r5XgcWKb4veEfxsLJ3LL/IRqglfCtr91YOn4LnkwSC', 0, 'Anissa', 'Tuttle'),
(25, 'stelaweber@yahoo.com', '$2a$10$onwM2aed0HNk4sJhs27byOn7xZ5w4fNk63fsomD3yngqNSVpLuEo6', 0, 'Eny', 'Morasko'),
(26, 'bethanyfulk@yahoo.com', '$2a$10$kkD5jGlHQi2mUQ5Yu3prGO0JwV75hk1pH2DLyJ1jU7xVtZczw9neu', 0, 'Beth', 'Fulk'),
(27, 'Keirns49@gmail.com', '$2a$10$wVpgl2itZ9NtzQQ38/G.8Oc8BRd8Ogmipi1NMK6FuHLw77ar0GM7u', 0, 'Sarah', 'Keirns'),
(28, 'jojob96@gmail.com', '$2a$10$Oj8nW9rsSddONvRhrZm8beT5RPttZjZXDZjEYwNp3/MLzk2Gzar8e', 0, 'Jodi', 'Britt'),
(29, 'kim.harvey72@yahoo.com', '$2a$10$BcDVWEFYK.GvhSiLHrldG.D/X13uf8CBzP7gHsSUuol.DgUCMEFne', 0, 'Kim', 'Harvey'),
(30, 'Julie.schnuerer@gmail.com', '$2a$10$V8gOf8rOu.xWZm46.6cnU.g67jBiF5WqRPYhX45C528S8fAHJZ2Lu', 0, 'Julie', 'Schnuerer'),
(31, 'patriciafactor82@gmail.com', '$2a$10$bTh1g6qL.2Yd8rExt3es6O1qwCqoTQuHYsTGLLsW1.OKW9o2hER2u', 0, 'Trish', 'Factor'),
(32, 'sckrabill@yahoo.com', '$2a$10$dtojmtFGlFzUX9X9X7QNYu3ivY6zWyGiBFHeBhN0k2f1dPawdLxd6', 0, 'Casey', 'Krabill'),
(33, 'cramerandrea6@gmail.com', '$2a$10$pePYEq9HJgCxHEFn2Z5hnukGWDhYFti.znrb79fAj2OFQzrrPQSbK', 0, 'Andrea', 'Cram'),
(34, 'bcjgh4@gmail.com', '$2a$10$IkoW9pXKfHi6pig3HWKpX.xOUggRUcHUD6dCog.72jISJSE8Z8uuW', 0, 'Jolene', 'Healea'),
(35, 'maggiebrewer44@gmail.com', '$2a$10$GLeYPK/3LytonR9b6Fv6keTKTbxnRFYF4uNDC788Vp8Rw4sVkUXay', 0, 'Maggie', 'Brewer'),
(36, 'gallavaeh2005@gmail.com', '$2a$10$KEqrvPlOJRmFbOeqgUL3P.d7Sch7Pwug.q7a0ea2neqej/HcewDxi', 0, 'Nevaeh', 'Gallagher'),
(37, 'nau@hometeamcreativity.com', '$2a$10$DbWCCavcCqJs0YfASInIYOhYeCFfp8B84Dp2VFmK6pUaGvi3kCyIC', 0, 'NotA', 'User'),
(38, 'hewo@gmail.com', '$2a$10$mkTuuYDw1MUmUf7Dlq0zweQadRFna98A2dBCx6xYnGOlGZbyii2Ju', 0, 'hi', 'hewo');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD PRIMARY KEY (`order_id`,`product_id`,`color`,`product_type`,`size`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `subcategories`
--
ALTER TABLE `subcategories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=177;

--
-- AUTO_INCREMENT for table `subcategories`
--
ALTER TABLE `subcategories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `product_orders`
--
ALTER TABLE `product_orders`
  ADD CONSTRAINT `product_orders_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  ADD CONSTRAINT `product_orders_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
