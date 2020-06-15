-- phpMyAdmin SQL Dump
-- version 4.7.7
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: 09 يونيو 2020 الساعة 15:37
-- إصدار الخادم: 10.1.30-MariaDB
-- PHP Version: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todo_lists`
--

-- --------------------------------------------------------

--
-- بنية الجدول `task`
--

CREATE TABLE `task` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `date_start` varchar(255) NOT NULL,
  `date_end` varchar(255) NOT NULL,
  `created_at` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `todos` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- بنية الجدول `tasks`
--

CREATE TABLE `tasks` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `todos` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `tag` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL,
  `date_start` varchar(255) NOT NULL,
  `date_end` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `todos`, `title`, `tag`, `status`, `date_start`, `date_end`, `created_at`) VALUES
(1, 1, 'a:2:{i:0;s:2:\"45\";i:1;s:2:\"46\";}', 'هوية بصرية للشركة اخبار 24', 'Design', '0', 'Mon Jun 08 2020', 'Sat Jun 13 2020', '2020-06-08 04:08:06'),
(2, 1, 'a:1:{i:0;s:2:\"47\";}', 'UI/UX Medicine', 'Developer', '0', 'Tue Jun 09 2020', 'Thu Jun 18 2020', '2020-06-08 04:15:43');

-- --------------------------------------------------------

--
-- بنية الجدول `todo`
--

CREATE TABLE `todo` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `status` enum('0','1') NOT NULL,
  `date` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- إرجاع أو استيراد بيانات الجدول `todo`
--

INSERT INTO `todo` (`id`, `user_id`, `task_id`, `title`, `status`, `date`) VALUES
(22, 1, 0, 'Business Card', '1', 'Sun Jun 07 2020'),
(23, 1, 0, 'social media', '1', 'Sun Jun 07 2020'),
(24, 1, 0, 'هوية بصرية للشركة اخبار 24', '1', 'Sun Jun 07 2020'),
(25, 1, 0, 'UI/UX Medicine 2500', '1', 'Sun Jun 07 2020'),
(26, 1, 0, 'Go to Play Football at 06.30', '0', 'Sun Jun 07 2020'),
(27, 1, 0, 'Hi How  Are You?', '0', 'Mon Jun 08 2020'),
(28, 1, 0, 'HI ', '1', 'Thu Jun 18 2020'),
(29, 1, 0, 'Hello', '1', 'Fri Jun 26 2020'),
(31, 1, 0, 'another todo', '1', 'Wed Jun 10 2020'),
(32, 1, 0, 'qfqfqfq', '1', 'Fri Jun 12 2020'),
(34, 1, 0, 'qfqfqfq', '0', 'Fri Jun 19 2020'),
(36, 1, 0, 'hello every one', '1', 'Mon Jun 08 2020'),
(37, 1, 0, 'qfqfqfq', '0', 'Thu Jun 25 2020'),
(38, 1, 0, 'qfzqfsqf', '0', 'Wed Jun 24 2020'),
(39, 1, 0, 'qfqfq', '1', 'Wed Jun 17 2020'),
(40, 1, 0, 'qsfqsfq', '0', 'Tue Jun 23 2020'),
(42, 1, 0, 'qfqfq', '0', 'Wed Jul 01 2020'),
(44, 1, 0, 'qfqfqfqfq', '0', 'Sat Jul 04 2020'),
(46, 1, 0, 'Design Concept', '0', 'Wed Jun 10 2020'),
(47, 1, 0, 'How To Develpement', '0', 'Wed Jun 10 2020');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `todo`
--
ALTER TABLE `todo`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `todo`
--
ALTER TABLE `todo`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
