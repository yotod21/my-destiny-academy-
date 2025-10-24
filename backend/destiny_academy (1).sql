-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 24, 2025 at 03:19 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `destiny_academy`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `title`, `content`, `created_at`) VALUES
(1, 'Welcome', 'Destiny Future Academy is open for enrollment.', '2025-10-13 10:55:36'),
(2, 'the project is working', 'he', '2025-10-13 11:01:46');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `code` varchar(60) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `title`, `code`, `description`, `created_at`) VALUES
(3, 'Creative Writing and Literature', 'ENG101', 'This course encourages students to explore various literary genres while developing their creative writing skills. Students will read short stories, poetry, and excerpts from classic literature, and create original works through guided writing exercises and peer feedback.', '2025-10-21 10:51:16'),
(4, 'Environmental Science', 'SCI201', 'A hands-on course focusing on ecosystems, climate change, renewable energy, and sustainability. Students will conduct experiments, analyze data, and learn how human activity impacts the natural world. Includes fieldwork and project-based learning.', '2025-10-21 10:52:08'),
(5, 'Algebra I', 'MAT150', 'This foundational math course introduces students to algebraic expressions, linear equations, graphing, and problem-solving techniques. Emphasis is placed on logical thinking and applying algebra to real-world scenarios.', '2025-10-21 10:53:00'),
(6, 'World History: Civilizations & Empires', 'HIS210', 'Students explore major civilizations and empires from ancient to modern times. Topics include Ancient Egypt, Greece, the Roman Empire, the Silk Road, the Renaissance, and global revolutions. The course develops critical thinking through analysis of historical sources and events.', '2025-10-21 10:53:44'),
(7, 'Introduction to Programming', 'CS101', 'A beginner-friendly course that introduces students to basic coding concepts using HTML, CSS, and JavaScript. Students will build simple web pages and learn about the design principles behind user-friendly websites. No prior programming experience required.', '2025-10-21 10:54:55');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `date` date DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `title`, `date`, `description`, `created_at`) VALUES
(1, 'Opening Ceremony', '2025-09-01', 'Join us for the opening of Destiny Future Academy.', '2025-10-13 10:55:36'),
(3, 'Cultural Fusion Day', '2025-11-15', 'A vibrant celebration of cultural diversity within the school. Students and staff come dressed in traditional attire and share music, food, and stories from their heritage. The event includes a cultural parade, talent performances, and interactive booths. It’s a fun and educational way to build unity and appreciation for global traditions.', '2025-10-21 10:42:54'),
(4, 'STEM Innovation Fair', '2026-01-29', 'A hands-on science and technology fair where students present innovative projects and experiments. Activities include coding stations, robotics displays, and eco-friendly engineering challenges. Local scientists and engineers are invited for talks and demonstrations to spark interest in STEM careers.', '2025-10-21 10:43:43'),
(5, 'Wellness and Mental Health Week', '2026-03-03', 'A week dedicated to promoting student wellness through daily themed activities. Each day focuses on a different aspect of health, such as mindfulness, nutrition, physical fitness, emotional resilience, and digital well-being. Events include workshops, guest speakers, peer-led discussions, and a “Mental Health Fair” on the final day.', '2025-10-21 10:44:27');

-- --------------------------------------------------------

--
-- Table structure for table `gallery`
--

CREATE TABLE `gallery` (
  `id` int(11) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gallery`
--

INSERT INTO `gallery` (`id`, `url`, `caption`, `created_at`) VALUES
(10, '/uploads/1761041910488-image 1.jpeg', 'class room', '2025-10-21 10:18:30'),
(11, '/uploads/1761041944747-image 3.jpeg', 'library', '2025-10-21 10:19:04'),
(12, '/uploads/1761041989048-image2.jpeg', 'school building ', '2025-10-21 10:19:49'),
(13, '/uploads/1761042024509-image4.jpeg', 'computer lab', '2025-10-21 10:20:24'),
(14, '/uploads/1761042083353-image5.jpeg', 'play ground ', '2025-10-21 10:21:23'),
(15, '/uploads/1761042113968-image6.jpeg', 'playing field', '2025-10-21 10:21:53');

-- --------------------------------------------------------

--
-- Table structure for table `messages`
--

CREATE TABLE `messages` (
  `id` int(11) NOT NULL,
  `name` varchar(120) DEFAULT NULL,
  `email` varchar(180) DEFAULT NULL,
  `subject` varchar(255) DEFAULT NULL,
  `body` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `messages`
--

INSERT INTO `messages` (`id`, `name`, `email`, `subject`, `body`, `created_at`) VALUES
(1, 'me', 'me', 'me', 'me', '2025-10-21 10:34:13');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `slug` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `author` varchar(120) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `title`, `slug`, `content`, `author`, `created_at`) VALUES
(3, 'Welcome to My Future Academy', 'Learn. Grow. Succeed.', 'It is time for you to join us and create our  bright future. together we can achieve the unexpected   ', 'Admin', '2025-10-21 10:31:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gallery`
--
ALTER TABLE `gallery`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `gallery`
--
ALTER TABLE `gallery`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `messages`
--
ALTER TABLE `messages`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
