-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 29-05-2020 a las 02:48:47
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
) ENGINE=InnoDB AUTO_INCREMENT=69 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `id_usuario`, `id_receta`, `texto`, `created_at`, `updated_at`) VALUES
(68, 11, 17, 'sadfasdfasdf', '2020-05-28 21:57:06', '2020-05-28 21:57:06');

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
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `followers`
--

INSERT INTO `followers` (`id`, `id_follower`, `id_followed`, `followed`, `created_at`, `updated_at`) VALUES
(1, 11, 12, 1, '2020-05-07 17:29:15', '2020-05-29 03:24:11'),
(3, 12, 11, 0, '2020-05-08 02:20:19', '2020-05-27 00:12:28'),
(4, 13, 11, 1, '2020-05-14 01:44:36', '2020-05-14 01:44:36'),
(5, 11, 13, 1, '2020-05-14 01:52:13', '2020-05-23 02:20:40'),
(17, 11, 21, 1, '2020-05-23 02:33:52', '2020-05-23 02:35:32'),
(18, 11, 14, 0, '2020-05-23 02:40:03', '2020-05-27 16:56:00'),
(22, 11, 18, 1, '2020-05-28 18:22:17', '2020-05-28 21:37:32'),
(24, 11, 23, 0, '2020-05-29 00:52:02', '2020-05-29 00:52:38');

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
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `megustas`
--

INSERT INTO `megustas` (`id`, `id_usuario`, `id_receta`, `gustado`, `created_at`, `updated_at`) VALUES
(28, 11, 11, 1, '2020-05-27 02:23:39', '2020-05-28 18:08:26'),
(31, 11, 45, 0, '2020-05-28 19:16:26', '2020-05-28 19:16:29'),
(32, 11, 17, 0, '2020-05-28 21:39:59', '2020-05-28 21:57:03'),
(33, 11, 15, 0, '2020-05-28 21:56:38', '2020-05-28 21:56:47');

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `mensajes`
--

INSERT INTO `mensajes` (`id`, `id_usuario_e`, `id_usuario_r`, `texto`, `created_at`, `updated_at`) VALUES
(1, 11, 12, 'Hola estoy editando este mensaje', '2020-05-08 05:26:57', '2020-05-08 05:32:09'),
(2, 12, 11, 'Hola soy una prueba para crear un mensaje', '2020-05-08 05:27:26', '2020-05-08 05:27:26'),
(3, 11, 12, 'hola soy una prueba', '2020-05-12 21:45:50', '2020-05-12 21:45:50'),
(7, 11, 18, 'hola', '2020-05-12 21:49:40', '2020-05-14 19:49:55'),
(9, 11, 12, '123', '2020-05-29 00:26:22', '2020-05-29 00:26:22'),
(10, 11, 12, 'asdf', '2020-05-29 00:26:38', '2020-05-29 00:26:38'),
(11, 11, 12, '123', '2020-05-29 00:27:14', '2020-05-29 00:27:14'),
(12, 11, 12, '123', '2020-05-29 00:29:18', '2020-05-29 00:29:18'),
(13, 11, 12, '123', '2020-05-29 00:31:09', '2020-05-29 00:31:09'),
(14, 11, 12, '31', '2020-05-29 00:31:31', '2020-05-29 00:31:31');

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
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `recetas`
--

INSERT INTO `recetas` (`id`, `id_usuario`, `nombre`, `ingredientes`, `descripcion`, `created_at`, `updated_at`, `image1`, `image2`, `image3`, `video1`, `video2`) VALUES
(11, 18, 'prueba', 'con imagenes  y videos', 'ojala funcione', '2020-05-16 03:12:29', '2020-05-16 03:12:29', '1589591549bulbasaur.jpg', NULL, NULL, NULL, NULL),
(12, 18, 'prueba', 'con imagenes  y videos', 'ojala funcione', '2020-05-16 03:15:27', '2020-05-16 03:15:27', '1589591727bulbasaur.jpg', '1589591727foto.jpg', '1589591727foto.jpg', NULL, NULL),
(13, 18, 'prueba', 'con imagenes  y videos', 'ojala funcione', '2020-05-16 03:16:12', '2020-05-16 03:16:12', '1589591772bulbasaur.jpg', NULL, NULL, NULL, NULL),
(14, 18, 'prueba', 'con imagenes  y videos', 'ojala funcione', '2020-05-16 03:16:42', '2020-05-16 03:16:42', '1589591802bulbasaur.jpg', '1589591802foto.jpg', '1589591802foto.jpg', NULL, NULL),
(15, 18, 'prueba', 'con imagenes  y videos', 'ojala funcione', '2020-05-16 03:17:08', '2020-05-16 03:17:08', '1589591828bulbasaur.jpg', '1589591828foto.jpg', '1589591828foto.jpg', NULL, NULL),
(16, 18, 'prueba', 'con imagenes  y videos', 'ojala funcione', '2020-05-16 03:17:37', '2020-05-16 03:17:37', '1589591857bulbasaur.jpg', '1589591857foto.jpg', NULL, NULL, NULL),
(17, 18, 'prueba editar', 'no se si funciona', 'esperemos que si', '2020-05-16 03:18:03', '2020-05-17 00:23:43', '1589667823bulbasaur.jpg', '1589591883foto.jpg', NULL, '1589667823carRestaurant_XD.mp4', NULL),
(27, 23, 'qwe', 'rty', 'qwe', '2020-05-25 04:10:50', '2020-05-25 04:10:50', '1590372647Diagrama1.jpeg', NULL, NULL, NULL, NULL),
(45, 11, 'Pollo al horno', 'Pollo, aceite, laurel, patatas, algo mása  aaaaaaaaaaaaaaaaa  aaaaaa aaaaa aaaaaaaaaa aaaaaaaaaa aaaaaaaa aaaaaaa       a', 'asdasd', '2020-05-28 01:11:34', '2020-05-29 03:23:10', '1590622026Diagrama1.jpeg', NULL, NULL, NULL, NULL);

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
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `rol`, `email`, `password`, `name`, `surname`, `avatar`, `remember_token`, `created_at`, `updated_at`) VALUES
(11, 'usuario', 'sebastianperezreal@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'sebit', 'sebinha', '1589821307580b57fcd9996e24bc43c325.png', NULL, '2020-04-22 22:38:07', '2020-05-28 01:30:04'),
(12, 'usuario', 'sebastianperez1233@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'prueba', 'nose', '1589753931bulbasaur.jpg', NULL, '2020-05-05 02:16:43', '2020-05-18 00:18:51'),
(13, 'usuario', '123@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', '123', '456', 'usuario.png', NULL, '2020-05-07 03:23:56', '2020-05-07 03:23:56'),
(14, 'usuario', '1234@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', '1234', '123', 'usuario.png', NULL, '2020-05-07 03:24:25', '2020-05-07 03:24:25'),
(18, 'usuario', 'sebastianperezre31al@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'hola', 'holita', 'usuario.png', NULL, '2020-05-09 18:35:50', '2020-05-18 03:01:09'),
(21, 'usuario', '12345@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'aaa', 'aaa', 'usuario.png', NULL, '2020-05-23 02:31:31', '2020-05-23 02:31:31'),
(23, 'usuario', 'gfd@gmail.com', '932f3c1b56257ce8539ac269d7aab42550dacf8818d075f0bdf1990562aae3ef', 'qwe', 'rty', 'usuario.png', NULL, '2020-05-25 04:09:22', '2020-05-25 04:09:22');

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
