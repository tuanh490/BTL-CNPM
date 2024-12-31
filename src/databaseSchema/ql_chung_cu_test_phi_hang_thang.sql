-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: ql_chung_cu_test
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `phi_hang_thang`
--

DROP TABLE IF EXISTS `phi_hang_thang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phi_hang_thang` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_thanh_toan` int NOT NULL,
  `loai_phi` varchar(50) NOT NULL,
  `so_tien` float NOT NULL,
  `mo_ta` text,
  PRIMARY KEY (`id`),
  KEY `id_thanh_toan` (`id_thanh_toan`),
  CONSTRAINT `phi_hang_thang_ibfk_1` FOREIGN KEY (`id_thanh_toan`) REFERENCES `thanh_toan_hang_thang` (`id_thanh_toan`)
) ENGINE=InnoDB AUTO_INCREMENT=78 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phi_hang_thang`
--

LOCK TABLES `phi_hang_thang` WRITE;
/*!40000 ALTER TABLE `phi_hang_thang` DISABLE KEYS */;
INSERT INTO `phi_hang_thang` VALUES (57,37,'phí xe cộ',1270000,'phí xe cộ hàng tháng'),(58,37,'phí dịch vụ chung cư',1320000,'phí dịch vụ chung cư đồng/m2/tháng'),(59,37,'phí quản lý chung cư',560000,'phí quản lý chung cư đồng/m2/tháng');
/*!40000 ALTER TABLE `phi_hang_thang` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-31 12:53:13
