-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2023 at 04:18 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `marketing`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`id`, `fullName`, `phone`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
('2a964cdb-1ff5-11ee-86e3-d8bbc18ed150', 'Admin', '0999999999', 'admin@gmail.com', 'admin123', '2023-07-11 16:13:36', '2023-07-11 16:13:36');

-- --------------------------------------------------------

--
-- Table structure for table `invoices`
--

CREATE TABLE `invoices` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `type` varchar(255) NOT NULL,
  `domains` int(10) UNSIGNED NOT NULL,
  `duration` int(10) UNSIGNED NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `status` varchar(255) NOT NULL,
  `productId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `pages`
--

CREATE TABLE `pages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `sortType` varchar(255) NOT NULL,
  `sortValue` int(10) UNSIGNED NOT NULL,
  `content` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `pages`
--

INSERT INTO `pages` (`id`, `name`, `sortType`, `sortValue`, `content`, `createdAt`, `updatedAt`) VALUES
('5495767f-4ffc-4953-8998-d5df4cea2895', 'FFFF', 'middle', 1, '\"<p>FFFF</p>\\n\"', '2023-07-11 14:16:26', '2023-07-11 14:16:26'),
('8d760ce5-604c-454f-8d22-9fad454e32f2', 'AAAA', 'upper', 1, '\"<p>AAAA</p>\\n\"', '2023-07-11 14:15:29', '2023-07-11 14:15:29'),
('8ddb9c7e-3680-46b0-bfce-aacc8a51a710', 'JJJJ', 'lower', 1, '\"<p>JJJJ</p>\\n\"', '2023-07-11 14:17:18', '2023-07-11 14:17:18'),
('aeaaaf54-e81d-4c7f-940e-b50c342276f9', 'GGGG', 'middle', 2, '\"<p>GGGG</p>\\n\"', '2023-07-11 14:16:32', '2023-07-11 14:16:32'),
('d91ba4d9-a38d-4877-a9fb-813409ca5d6c', 'BBBB', 'upper', 2, '\"<p>BBBB</p>\\n\"', '2023-07-11 14:15:39', '2023-07-11 14:15:39'),
('da414f8d-0011-46ca-a874-1ce1e2af8ebf', 'EEEE', 'upper', 5, '\"<p>EEEE</p>\\n\"', '2023-07-11 14:16:13', '2023-07-11 14:16:13');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `domains` int(10) UNSIGNED NOT NULL,
  `duration` int(10) UNSIGNED NOT NULL,
  `price` int(10) UNSIGNED NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `invoiceId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `type`, `domains`, `duration`, `price`, `image`, `createdAt`, `updatedAt`, `invoiceId`) VALUES
('20e9f568-5c4b-4cbd-b11a-51857b039e91', 'Test Fab', 'fab', 3, 30, 899, 'http://localhost:8080/uploads/images/0ddd5dc5-0af4-4991-b240-cb0fbb43f85e_profile.jpg', '2023-07-11 14:15:08', '2023-07-11 14:15:08', NULL),
('c8fd6133-a7a5-40ec-8180-c6cf18ce0672', 'Test Fab 2', 'fab', 6, 60, 1599, 'http://localhost:8080/uploads/images/0ddd5dc5-0af4-4991-b240-cb0fbb43f85e_jimmy.jpg', '2023-07-11 14:18:13', '2023-07-11 14:18:13', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `settings`
--

CREATE TABLE `settings` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `eCommercePage` longtext DEFAULT NULL,
  `myProductPage` longtext DEFAULT NULL,
  `orderHistoryPage` longtext DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `settings`
--

INSERT INTO `settings` (`id`, `eCommercePage`, `myProductPage`, `orderHistoryPage`, `createdAt`, `updatedAt`) VALUES
('b79922be-53b7-46c0-995f-602d25aa9a5e', '\"<p>Test1</p>\\n\"', '\"<p>Test2</p>\\n\"', '\"<p>Test3</p>\\n\"', '2023-07-11 14:17:43', '2023-07-11 14:17:43');

-- --------------------------------------------------------

--
-- Table structure for table `sub_pages`
--

CREATE TABLE `sub_pages` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `name` varchar(255) NOT NULL,
  `sortValue` int(10) UNSIGNED NOT NULL,
  `content` longtext DEFAULT NULL,
  `pageId` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sub_pages`
--

INSERT INTO `sub_pages` (`id`, `name`, `sortValue`, `content`, `pageId`, `createdAt`, `updatedAt`) VALUES
('6bb482fa-669b-4fc9-8e0c-1a4d505768bb', 'IIII', 1, '\"<p>IIII</p>\\n\"', 'aeaaaf54-e81d-4c7f-940e-b50c342276f9', '2023-07-11 14:17:05', '2023-07-11 14:17:05'),
('b1e2064f-965e-4ecc-9e20-0c14553572af', 'HHHH', 1, '\"<p>HHHH</p>\\n\"', '5495767f-4ffc-4953-8998-d5df4cea2895', '2023-07-11 14:16:50', '2023-07-11 14:16:50'),
('ba32da97-e4fb-4499-930d-3847ca686e11', 'DDDD', 4, '\"<p>DDDD</p>\\n\"', 'd91ba4d9-a38d-4877-a9fb-813409ca5d6c', '2023-07-11 14:16:07', '2023-07-11 14:16:07'),
('ee1d01f2-28b5-44d7-832f-f16a06571c45', 'KKKK', 1, '\"<p>KKKK</p>\\n\"', '8ddb9c7e-3680-46b0-bfce-aacc8a51a710', '2023-07-11 14:17:31', '2023-07-11 14:17:31'),
('f89633e9-4823-41b2-a3b9-d070985b67ff', 'CCCC', 3, '\"<p>CCCC</p>\\n\"', '8d760ce5-604c-454f-8d22-9fad454e32f2', '2023-07-11 14:16:00', '2023-07-11 14:16:00');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullName`, `phone`, `email`, `password`, `lastLogin`, `createdAt`, `updatedAt`) VALUES
('f17485de-a248-4553-81f9-0f009eebac53', 'Piyakarn Nimmakulvirut', '0658528414', 'jirakarnjim1@gmail.com', '$2b$10$fxMhE3vaLTBa6FBeOMUPDezp1WCElg1sv.EnocBI5iFnLlnePUnxK', NULL, '2023-07-11 14:14:39', '2023-07-11 14:14:39');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Indexes for table `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `productId` (`productId`);

--
-- Indexes for table `pages`
--
ALTER TABLE `pages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoiceId` (`invoiceId`);

--
-- Indexes for table `settings`
--
ALTER TABLE `settings`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `sub_pages`
--
ALTER TABLE `sub_pages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `pageId` (`pageId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `email_2` (`email`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_ibfk_1` FOREIGN KEY (`productId`) REFERENCES `products` (`id`);

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`invoiceId`) REFERENCES `invoices` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `sub_pages`
--
ALTER TABLE `sub_pages`
  ADD CONSTRAINT `sub_pages_ibfk_1` FOREIGN KEY (`pageId`) REFERENCES `pages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
