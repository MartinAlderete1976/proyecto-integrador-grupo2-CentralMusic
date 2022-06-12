-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: centralmusic_db
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.24-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- -----------------------------------------------------
-- Schema centralMusic_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema centralMusic_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `centralMusic_db` DEFAULT CHARACTER SET utf8 ;
USE `centralMusic_db` ;


--
-- Table structure for table `cables_details`
--

DROP TABLE IF EXISTS `cables_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cables_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `conector_entrada` varchar(45) DEFAULT NULL,
  `conector_salida` varchar(45) DEFAULT NULL,
  `largo` varchar(45) DEFAULT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cables_details_products1_idx` (`products_id`),
  CONSTRAINT `fk_cables_details_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cables_details`
--

LOCK TABLES `cables_details` WRITE;
/*!40000 ALTER TABLE `cables_details` DISABLE KEYS */;
INSERT INTO `cables_details` VALUES (2,'Plug','Plug','10 metros',6),(3,'Plug','Plug','10 metros',7);
/*!40000 ALTER TABLE `cables_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_category` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Instrumentos de cuerda'),(2,'Efectos'),(3,'Accesorios'),(4,'Cables');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cuerdas_details`
--

DROP TABLE IF EXISTS `cuerdas_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cuerdas_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cantidad_cuerdas` int(11) DEFAULT NULL,
  `tension` varchar(45) DEFAULT NULL,
  `materiales` varchar(45) DEFAULT NULL,
  `calibre` varchar(45) DEFAULT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_cuerdas_details_products1_idx` (`products_id`),
  CONSTRAINT `fk_cuerdas_details_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cuerdas_details`
--

LOCK TABLES `cuerdas_details` WRITE;
/*!40000 ALTER TABLE `cuerdas_details` DISABLE KEYS */;
INSERT INTO `cuerdas_details` VALUES (1,6,'Media','Nickel','0.10',5);
/*!40000 ALTER TABLE `cuerdas_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guitar_details`
--

DROP TABLE IF EXISTS `guitar_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `guitar_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` varchar(45) NOT NULL,
  `line` varchar(45) NOT NULL,
  `body_finish` varchar(45) NOT NULL,
  `material_body` varchar(45) NOT NULL,
  `hand` varchar(45) NOT NULL,
  `color` varchar(45) NOT NULL,
  `material_fretboard` varchar(45) NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_guitar_details_products1_idx` (`products_id`),
  CONSTRAINT `fk_guitar_details_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guitar_details`
--

LOCK TABLES `guitar_details` WRITE;
/*!40000 ALTER TABLE `guitar_details` DISABLE KEYS */;
INSERT INTO `guitar_details` VALUES (5,'Stratocaster','American Standar','Saten','Aliso','Diestro','Sunburst','Palo Rosa',2),(6,'Les Paul','Standar','Saten','Aliso','Diestro','Gold','Palo Rosa',1),(7,'Jaguar','Vintage Modified','Saten','Tilo','Diestro','Red','Palo Rosa',3),(8,'SG','Custom Shop','Saten','Aliso','Diestro','Red','Palo Rosa',4);
/*!40000 ALTER TABLE `guitar_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `marcas`
--

DROP TABLE IF EXISTS `marcas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `marcas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `marca` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `marcas`
--

LOCK TABLES `marcas` WRITE;
/*!40000 ALTER TABLE `marcas` DISABLE KEYS */;
INSERT INTO `marcas` VALUES (1,'Fender'),(2,'Gibson'),(3,'Ernie Ball'),(4,'TC Electronic'),(5,'Ross'),(6,'Roxtone');
/*!40000 ALTER TABLE `marcas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pedal_details`
--

DROP TABLE IF EXISTS `pedal_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `pedal_details` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `vocal` varchar(10) DEFAULT NULL,
  `cantidad_efectos` int(11) DEFAULT NULL,
  `instrumentos_compatibles` varchar(45) DEFAULT NULL,
  `tipo_de_efectos` varchar(45) DEFAULT NULL,
  `voltaje` varchar(45) DEFAULT NULL,
  `tecnologia` varchar(45) DEFAULT NULL,
  `alimentacion` varchar(45) DEFAULT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pedal_details_products1_idx` (`products_id`),
  CONSTRAINT `fk_pedal_details_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pedal_details`
--

LOCK TABLES `pedal_details` WRITE;
/*!40000 ALTER TABLE `pedal_details` DISABLE KEYS */;
INSERT INTO `pedal_details` VALUES (1,'no',2,'Guitarra Electrica','Afinador','9V','Digital','Fuente',8);
/*!40000 ALTER TABLE `pedal_details` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `price` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  `description` text NOT NULL,
  `stock` tinyint(4) NOT NULL,
  `subcategories_id` int(11) NOT NULL,
  `marcas_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_subcategories1_idx` (`subcategories_id`),
  KEY `fk_products_marcas1_idx` (`marcas_id`),
  CONSTRAINT `fk_products_marcas1` FOREIGN KEY (`marcas_id`) REFERENCES `marcas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_subcategories1` FOREIGN KEY (`subcategories_id`) REFERENCES `subcategories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,3000,'Gibson Les Paul','La mejor viola de todas',1,1,2),(2,3000,'Fender Stratocaster','Viola para blusear',1,1,1),(3,2500,'Fender Jaguar','La mejor viola',1,1,1),(4,1000,'Gibson SG','La mejor viola',1,1,2),(5,100,'Ernie Ball x6','Cuerdas para guitarra',1,3,3),(6,100,'Plug Green','Cables para instrumentos',1,4,5),(7,150,'Plug Gold','Cuerdas para guitarra',1,4,6),(8,500,'Pedal Polytune Afinador','Pedales',1,2,4);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_images`
--

DROP TABLE IF EXISTS `products_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_images` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name_image` varchar(45) NOT NULL,
  `products_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_products_images_products1_idx` (`products_id`),
  CONSTRAINT `fk_products_images_products1` FOREIGN KEY (`products_id`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_images`
--

LOCK TABLES `products_images` WRITE;
/*!40000 ALTER TABLE `products_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `subcategories`
--

DROP TABLE IF EXISTS `subcategories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `subcategories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `categories_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_subcategories_categories1_idx` (`categories_id`),
  CONSTRAINT `fk_subcategories_categories1` FOREIGN KEY (`categories_id`) REFERENCES `categories` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `subcategories`
--

LOCK TABLES `subcategories` WRITE;
/*!40000 ALTER TABLE `subcategories` DISABLE KEYS */;
INSERT INTO `subcategories` VALUES (1,'Guitarras Electricas',1),(2,'Pedales',2),(3,'Cuerdas',3),(4,'Cables para instrumentos',4);
/*!40000 ALTER TABLE `subcategories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_rol`
--

DROP TABLE IF EXISTS `user_rol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_rol` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `rol_name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_rol`
--

LOCK TABLES `user_rol` WRITE;
/*!40000 ALTER TABLE `user_rol` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_rol` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `avatar` varchar(45) DEFAULT NULL,
  `user_rol_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_UNIQUE` (`email`),
  KEY `fk_users_user_rol1_idx` (`user_rol_id`),
  CONSTRAINT `fk_users_user_rol1` FOREIGN KEY (`user_rol_id`) REFERENCES `user_rol` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'centralmusic_db'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-12  7:39:00
