-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Czas generowania: 16 Sty 2020, 16:35
-- Wersja serwera: 8.0.18
-- Wersja PHP: 7.2.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `company-manager`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `address`
--

CREATE TABLE `address` (
  `id` int(11) NOT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `town` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `post_code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `house_number` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `address`
--

INSERT INTO `address` (`id`, `street`, `town`, `post_code`, `house_number`) VALUES
(7, 'Rejtana', 'Rzeszów', '31-000', '1'),
(8, 'Rejtana', 'Rzeszów', '35-000', '2'),
(9, 'Powstańców Warszawy', 'Rzeszów', '35-000', '1');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `commission`
--

CREATE TABLE `commission` (
  `id` int(11) NOT NULL,
  `address_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `commission`
--

INSERT INTO `commission` (`id`, `address_id`, `name`, `description`, `start_date`, `end_date`, `created_at`, `updated_at`) VALUES
(7, 7, 'Market XYZ', 'Description', '2020-01-11 15:40:53', NULL, '2020-01-11 16:39:23', NULL),
(8, 8, 'Name of commission', 'Description', '2020-01-11 16:05:37', NULL, '2020-01-11 16:42:20', NULL),
(9, 9, 'Shop XYZ', 'Description', '2020-01-16 15:41:33', NULL, '2020-01-16 16:36:50', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `material`
--

CREATE TABLE `material` (
  `id` int(11) NOT NULL,
  `commission_id` int(11) DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `code` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL,
  `quantity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `material`
--

INSERT INTO `material` (`id`, `commission_id`, `name`, `code`, `created_at`, `quantity`) VALUES
(1, 7, 'Camera xyz', 'xyz-001', '2020-01-11 00:00:00', 1),
(2, 7, 'Camera xyz', 'xyz-001', '2020-01-10 00:00:00', 2),
(3, 7, 'Recorder xyz', 'ryz-002', '2020-01-11 00:00:00', 1),
(4, 7, 'Camera WSA', 'wsa-001', '2020-01-12 00:00:00', 2),
(5, 9, 'Name', 'code', '2020-01-16 00:00:00', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `migration_versions`
--

CREATE TABLE `migration_versions` (
  `version` varchar(14) COLLATE utf8mb4_unicode_ci NOT NULL,
  `executed_at` datetime NOT NULL COMMENT '(DC2Type:datetime_immutable)'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `migration_versions`
--

INSERT INTO `migration_versions` (`version`, `executed_at`) VALUES
('20191214100851', '2019-12-14 10:09:06');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `report`
--

CREATE TABLE `report` (
  `id` int(11) NOT NULL,
  `commission_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `day_description` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `started_at` datetime NOT NULL,
  `finished_at` datetime NOT NULL,
  `hours_summary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `report`
--

INSERT INTO `report` (`id`, `commission_id`, `user_id`, `created_at`, `day_description`, `started_at`, `finished_at`, `hours_summary`) VALUES
(1, 7, 1, '2020-01-11 00:00:00', 'Day description', '2020-01-11 10:30:00', '2020-01-11 16:30:00', 6),
(2, 7, 1, '2020-01-10 00:00:00', 'Description\n', '2020-01-11 08:30:00', '2020-01-11 16:30:00', 8),
(3, 7, 1, '2020-01-11 00:00:00', 'Description', '2020-01-11 08:00:00', '2020-01-11 16:00:00', 8),
(4, 7, 2, '2020-01-12 00:00:00', 'Full description of the day', '2020-01-12 08:30:00', '2020-01-12 16:30:00', 8),
(5, 7, 9, '2020-01-13 00:00:00', 'Description of the day with some details', '2020-01-16 08:30:00', '2020-01-16 16:30:00', 8),
(6, 9, 2, '2020-01-16 00:00:00', 'desc', '2020-01-16 08:30:00', '2020-01-16 09:30:00', 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `task`
--

CREATE TABLE `task` (
  `id` int(11) NOT NULL,
  `commission_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `status` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `priority` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `estimated_cost` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `task`
--

INSERT INTO `task` (`id`, `commission_id`, `user_id`, `description`, `start_date`, `end_date`, `created_at`, `updated_at`, `status`, `priority`, `estimated_cost`) VALUES
(2, 7, 9, 'Description of task with status: Pending', '2020-01-12 14:12:16', NULL, '2020-01-12 00:00:00', NULL, 'Pending', '1', NULL),
(3, 7, 1, 'This task is done', '2020-01-12 14:12:38', NULL, '2020-01-12 00:00:00', NULL, 'Done', '2', NULL),
(4, 7, 2, 'Task without estimation', '2020-01-12 14:25:49', NULL, '2020-01-12 00:00:00', '2020-01-12 15:35:46', 'Todo', 'High', NULL),
(5, 7, 2, 'This task was created offline', '2020-01-12 14:35:37', NULL, '2020-01-12 00:00:00', '2020-01-12 15:31:07', 'Done', 'Low', NULL),
(7, 9, 2, 'New task', '2020-01-16 16:34:55', NULL, '2020-01-16 00:00:00', NULL, 'Todo', '2', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `username` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `updated_at` datetime DEFAULT NULL,
  `active` smallint(6) NOT NULL,
  `role` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `salary` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Zrzut danych tabeli `user`
--

INSERT INTO `user` (`id`, `first_name`, `last_name`, `email`, `username`, `password`, `created_at`, `updated_at`, `active`, `role`, `salary`) VALUES
(1, 'John', 'Doe', 'johndoe@gmail.com', 'johndoe', '$2y$13$D4h1XTBYsF8svgPbXX0kGeStn.yZuuOjHxb2b2b7YRRvv1t0ZI4PW', '2019-12-11 00:00:00', '2019-12-30 13:44:17', 1, 'ROLE_ADMIN', 15),
(2, 'Filip', 'Rebizant', 'fr@email.com', 'filiprebizant', '$2y$13$JNOw2VDhzlHdnuc0j9JWl.OtB4IuuBEJ4Dq1fn8sE42aE2nOtv6yi', '2019-12-30 13:12:19', '2019-12-30 13:15:00', 1, 'ROLE_ADMIN', 25),
(9, 'Jan', 'Kowalski', 'jankowalski@gmail.com', 'jankowalski', '$2y$13$w63k/jV1.vErSsI5DwF8o.6.DvXF3AOBgi.PHtRSfeayO5cvcZ2i6', '2019-12-30 14:15:03', '2020-01-03 12:46:43', 1, 'ROLE_USER', 2);

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `address`
--
ALTER TABLE `address`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `commission`
--
ALTER TABLE `commission`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `UNIQ_1C650158F5B7AF75` (`address_id`);

--
-- Indeksy dla tabeli `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_7CBE7595202D1EB2` (`commission_id`);

--
-- Indeksy dla tabeli `migration_versions`
--
ALTER TABLE `migration_versions`
  ADD PRIMARY KEY (`version`);

--
-- Indeksy dla tabeli `report`
--
ALTER TABLE `report`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_C42F7784202D1EB2` (`commission_id`),
  ADD KEY `IDX_C42F7784A76ED395` (`user_id`);

--
-- Indeksy dla tabeli `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_527EDB25202D1EB2` (`commission_id`),
  ADD KEY `IDX_527EDB25A76ED395` (`user_id`);

--
-- Indeksy dla tabeli `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT dla tabeli `address`
--
ALTER TABLE `address`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `commission`
--
ALTER TABLE `commission`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT dla tabeli `material`
--
ALTER TABLE `material`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT dla tabeli `report`
--
ALTER TABLE `report`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT dla tabeli `task`
--
ALTER TABLE `task`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT dla tabeli `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `commission`
--
ALTER TABLE `commission`
  ADD CONSTRAINT `FK_1C650158F5B7AF75` FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);

--
-- Ograniczenia dla tabeli `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `FK_7CBE7595202D1EB2` FOREIGN KEY (`commission_id`) REFERENCES `commission` (`id`);

--
-- Ograniczenia dla tabeli `report`
--
ALTER TABLE `report`
  ADD CONSTRAINT `FK_C42F7784202D1EB2` FOREIGN KEY (`commission_id`) REFERENCES `commission` (`id`),
  ADD CONSTRAINT `FK_C42F7784A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Ograniczenia dla tabeli `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `FK_527EDB25202D1EB2` FOREIGN KEY (`commission_id`) REFERENCES `commission` (`id`),
  ADD CONSTRAINT `FK_527EDB25A76ED395` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
