-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 21-06-2020 a las 17:08:15
-- Versión del servidor: 10.4.10-MariaDB
-- Versión de PHP: 7.4.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyectolaravel`
--
CREATE DATABASE IF NOT EXISTS `proyectolaravel` DEFAULT CHARACTER SET utf8 COLLATE utf8_spanish_ci;
USE `proyectolaravel`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
CREATE TABLE IF NOT EXISTS `comentarios` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `texto` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_receta` (`id_receta`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_usuario`, `id_receta`, `texto`, `created_at`, `updated_at`) VALUES
(79, 11, 52, 'a', '2020-06-16 05:09:25', '2020-06-16 05:09:25'),
(80, 33, 54, 'Están riquísimos!', '2020-06-18 10:00:35', '2020-06-18 10:00:35');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `followers`
--

DROP TABLE IF EXISTS `followers`;
CREATE TABLE IF NOT EXISTS `followers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_follower` int(11) NOT NULL,
  `id_followed` int(11) NOT NULL,
  `followed` tinyint(1) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_follower` (`id_follower`),
  KEY `id_followed` (`id_followed`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `followers`
--

INSERT INTO `followers` (`id`, `id_follower`, `id_followed`, `followed`, `created_at`, `updated_at`) VALUES
(39, 33, 11, 1, '2020-06-18 09:56:42', '2020-06-18 09:56:42'),
(45, 11, 34, 1, '2020-06-18 10:29:14', '2020-06-18 10:29:14');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `logs`
--

DROP TABLE IF EXISTS `logs`;
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `action` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `logs`
--

INSERT INTO `logs` (`id`, `id_usuario`, `action`, `created_at`) VALUES
(1, 31, 'Ha creado un nuevo usuario', '2020-06-16 02:21:57'),
(2, 32, 'Ha creado un nuevo usuario', '2020-06-17 21:40:00'),
(3, 33, 'Ha creado un nuevo usuario', '2020-06-18 09:54:46'),
(4, 34, 'Ha creado un nuevo usuario', '2020-06-18 09:55:09'),
(5, 35, 'Ha creado un nuevo usuario', '2020-06-18 09:55:57'),
(6, 36, 'Ha creado un nuevo usuario', '2020-06-18 10:42:27');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `megustas`
--

DROP TABLE IF EXISTS `megustas`;
CREATE TABLE IF NOT EXISTS `megustas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) NOT NULL,
  `id_receta` int(11) NOT NULL,
  `gustado` tinyint(4) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`),
  KEY `id_receta` (`id_receta`)
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `megustas`
--

INSERT INTO `megustas` (`id`, `id_usuario`, `id_receta`, `gustado`, `created_at`, `updated_at`) VALUES
(48, 11, 52, 1, '2020-06-08 16:50:39', '2020-06-16 18:25:57'),
(51, 33, 54, 1, '2020-06-18 10:00:10', '2020-06-18 10:00:23'),
(59, 11, 58, 0, '2020-06-21 03:39:28', '2020-06-21 03:39:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensajes`
--

DROP TABLE IF EXISTS `mensajes`;
CREATE TABLE IF NOT EXISTS `mensajes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario_e` int(11) NOT NULL,
  `id_usuario_r` int(11) NOT NULL,
  `texto` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario_e` (`id_usuario_e`),
  KEY `id_usuario_r` (`id_usuario_r`)
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_usuario_e`, `id_usuario_r`, `texto`, `created_at`, `updated_at`) VALUES
(55, 11, 11, 'Prueba de un mensaje\n', '2020-06-18 10:12:14', '2020-06-18 10:12:14'),
(56, 11, 11, 'Funciona perfectamente', '2020-06-18 10:12:19', '2020-06-18 10:12:19'),
(57, 11, 34, 'Anda que no habla na el niño.', '2020-06-18 10:29:24', '2020-06-18 10:29:24'),
(71, 33, 34, 'a', '2020-06-18 11:14:14', '2020-06-18 11:14:14'),
(72, 33, 34, 'dasfasdf', '2020-06-21 18:34:38', '2020-06-21 18:34:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `recetas`
--

DROP TABLE IF EXISTS `recetas`;
CREATE TABLE IF NOT EXISTS `recetas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_usuario` int(11) DEFAULT NULL,
  `nombre` varchar(255) COLLATE utf8_spanish_ci NOT NULL,
  `ingredientes` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `descripcion` text COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `image1` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `image2` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `image3` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `video1` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `video2` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_usuario` (`id_usuario`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `id_usuario`, `nombre`, `ingredientes`, `descripcion`, `created_at`, `updated_at`, `image1`, `image2`, `image3`, `video1`, `video2`) VALUES
(52, 11, 'Prueba de editar una receta', 'Ingredientes de la prueba de una receta', 'Descripción de la prueba de una receta', '2020-06-08 16:47:45', '2020-06-21 03:08:14', '1592701681descarga (3).jpg', NULL, NULL, NULL, NULL),
(54, 33, 'Potaje de garbanzos', 'Garbanzos, chorizo, carne, cebolla', 'De refríe en una saltén y cuando esté doradito se le echan los garbanzos, dejar hervir.', '2020-06-18 10:00:06', '2020-06-18 10:00:06', '1592467140images.jpg', NULL, NULL, '1592467205WhatsApp Video 2020-05-15 at 18.55.27.mp4', NULL),
(58, 11, '1', '1', '1', '2020-06-21 03:39:25', '2020-06-21 03:39:56', '1592703582descarga (3).jpg', '1592703585descarga (4).jpg', '1592703588images (1).jpg', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `surname` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `avatar` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `remember_token` varchar(255) COLLATE utf8_spanish_ci DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `rol`, `email`, `password`, `name`, `surname`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(11, 'administrador', 'sebastianperezreal@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'sebita', 'sebinha', 'usuario.png', NULL, '2020-04-22 22:38:07', '2020-06-21 03:36:18'),
(33, 'usuario', 'josemanuelgomezjurado@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'Jose Manuel', 'Gomez', 'usuario.png', NULL, '2020-06-18 09:54:46', '2020-06-21 03:42:28'),
(34, 'usuario', 'jesusLobo@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'Jesus', 'Lobo', 'usuario.png', NULL, '2020-06-18 09:55:09', '2020-06-18 11:09:22');

--
-- Disparadores `users`
--
DROP TRIGGER IF EXISTS `user_log`;
DELIMITER $$
CREATE TRIGGER `user_log` AFTER INSERT ON `users` FOR EACH ROW INSERT INTO LOGS(logs.id,logs.id_usuario,logs.action, logs.created_at)
VALUES(null,NEW.id,'Ha creado un nuevo usuario',now())
$$
DELIMITER ;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `recetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `followers`
--
ALTER TABLE `followers`
  ADD CONSTRAINT `followers_ibfk_1` FOREIGN KEY (`id_follower`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `followers_ibfk_2` FOREIGN KEY (`id_followed`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `megustas`
--
ALTER TABLE `megustas`
  ADD CONSTRAINT `megustas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `megustas_ibfk_2` FOREIGN KEY (`id_receta`) REFERENCES `recetas` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensajes`
--
ALTER TABLE `mensajes`
  ADD CONSTRAINT `mensajes_ibfk_1` FOREIGN KEY (`id_usuario_e`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mensajes_ibfk_2` FOREIGN KEY (`id_usuario_r`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `recetas`
--
ALTER TABLE `recetas`
  ADD CONSTRAINT `recetas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
