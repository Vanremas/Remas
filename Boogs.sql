-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Дек 18 2022 г., 23:49
-- Версия сервера: 8.0.30
-- Версия PHP: 8.0.22

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `Boogs`
--

-- --------------------------------------------------------

--
-- Структура таблицы `Admin`
--

CREATE TABLE `Admin` (
  `idAd` int NOT NULL,
  `login` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Admin`
--

INSERT INTO `Admin` (`idAd`, `login`, `password`) VALUES
(1, 'admin', 'admin'),
(2, 'login', '1111');

-- --------------------------------------------------------

--
-- Структура таблицы `aIDb`
--

CREATE TABLE `aIDb` (
  `id` int NOT NULL,
  `idAut` int NOT NULL,
  `idBook` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `aIDb`
--

INSERT INTO `aIDb` (`id`, `idAut`, `idBook`) VALUES
(2, 2, 2),
(3, 3, 3),
(4, 4, 4),
(5, 5, 5),
(6, 4, 6),
(62, 20, 34);

-- --------------------------------------------------------

--
-- Структура таблицы `Authors`
--

CREATE TABLE `Authors` (
  `idAut` int NOT NULL,
  `Author` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Authors`
--

INSERT INTO `Authors` (`idAut`, `Author`) VALUES
(1, 'Кристи Голден'),
(2, 'Джефф Грабб'),
(3, 'Анджей Сапковский'),
(4, 'Николай Гоголь'),
(5, 'Стивен Кинг'),
(11, 'Remas'),
(20, 'Илья Ильф'),
(21, 'Евгений Петров');

-- --------------------------------------------------------

--
-- Структура таблицы `Books`
--

CREATE TABLE `Books` (
  `idBook` int NOT NULL,
  `tittle` varchar(255) NOT NULL,
  `description` varchar(355) NOT NULL,
  `year` varchar(20) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `img` varchar(6000) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Дамп данных таблицы `Books`
--

INSERT INTO `Books` (`idBook`, `tittle`, `description`, `year`, `genre`, `img`) VALUES
(2, 'Последний страж', 'Роман Джеффа Грабба, действие которого происходит во вселенной Warcraft. Считается третьей книгой из серии Warcraft, хотя электронная книга «Кровью и честью» была опубликована раньше. История «Последнего Стража» - о Медиве, Страже Азерота, и о том, как он привёл орков в Азерот. ', '2002', 'Фэнтези', '637d333fbfd5e.jpg'),
(3, 'Ведьмак', 'Цикл книг польского писателя Анджея Сапковского в жанре фэнтези. Первый рассказ цикла увидел свет в 1986 году, а последняя книга - в 2013.', '1986', 'Фэнтези', '637d335d1b3fa.jpg'),
(4, 'Тарас Бульба', 'Повесть Николая Васильевича Гоголя, входящая в цикл «Миргород». События произведения происходят в среде запорожских казаков в первой половине XVII века.', '1835', 'Повесть', '637d336ae126e.jpg'),
(5, 'Лангольеры', 'Повесть американского писателя Стивена Кинга, написанная в жанрах психологического ужаса и фантастики, впервые опубликованная в 1990 году в сборнике «Четыре после полуночи».', '2012', 'Фэнтези', '637d3375e3799.jpg'),
(6, 'Страшная месть', 'Повесть Николая Васильевича Гоголя, входящая в сборник «Вечера на хуторе близ Диканьки». Приблизительно датируется летом - началом осени 1831 года. ', '1831', 'Повесть', '637d338437e75.jpg'),
(34, 'Одноэтажная Америка', 'Романы великих сатириков Ильи Ильфа и Евгения Петрова постоянно переиздаются, экранизируются и ставятся на сцене. Не менее знаменитая их книга о путешествии по Америке, переведенная, кстати, на множество языков, не выходила в России, как ни странно, более двадцати лет.', '2004', 'Повесть', '63863e357bc94.jpeg');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `Admin`
--
ALTER TABLE `Admin`
  ADD PRIMARY KEY (`idAd`);

--
-- Индексы таблицы `aIDb`
--
ALTER TABLE `aIDb`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idAut` (`idAut`),
  ADD KEY `idBook` (`idBook`);

--
-- Индексы таблицы `Authors`
--
ALTER TABLE `Authors`
  ADD PRIMARY KEY (`idAut`);

--
-- Индексы таблицы `Books`
--
ALTER TABLE `Books`
  ADD PRIMARY KEY (`idBook`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `Admin`
--
ALTER TABLE `Admin`
  MODIFY `idAd` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `aIDb`
--
ALTER TABLE `aIDb`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT для таблицы `Authors`
--
ALTER TABLE `Authors`
  MODIFY `idAut` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT для таблицы `Books`
--
ALTER TABLE `Books`
  MODIFY `idBook` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `aIDb`
--
ALTER TABLE `aIDb`
  ADD CONSTRAINT `aidb_ibfk_1` FOREIGN KEY (`idAut`) REFERENCES `Authors` (`idAut`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  ADD CONSTRAINT `aidb_ibfk_2` FOREIGN KEY (`idBook`) REFERENCES `Books` (`idBook`) ON DELETE RESTRICT ON UPDATE RESTRICT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
