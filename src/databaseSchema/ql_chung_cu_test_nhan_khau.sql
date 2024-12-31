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
-- Table structure for table `nhan_khau`
--

DROP TABLE IF EXISTS `nhan_khau`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `nhan_khau` (
  `id_nhan_khau` int NOT NULL AUTO_INCREMENT,
  `can_cuoc_cong_dan` varchar(20) DEFAULT NULL,
  `ma_phong` varchar(10) NOT NULL,
  `ho_ten` varchar(100) NOT NULL,
  `gioi_tinh` varchar(10) DEFAULT NULL,
  `ngay_sinh` date DEFAULT NULL,
  `timeIn` date DEFAULT NULL,
  `timeOut` date DEFAULT NULL,
  `dang_o` tinyint(1) DEFAULT '1',
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_nhan_khau`),
  UNIQUE KEY `can_cuoc_cong_dan_UNIQUE` (`can_cuoc_cong_dan`),
  KEY `fk_ma_phong` (`ma_phong`),
  CONSTRAINT `fk_ma_phong` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`ma_phong`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `nhan_khau`
--

LOCK TABLES `nhan_khau` WRITE;
/*!40000 ALTER TABLE `nhan_khau` DISABLE KEYS */;
INSERT INTO `nhan_khau` VALUES (1,'123456789012','P101','Nguyen Van A','Nam','1990-01-01','2024-12-01',NULL,1,'2024-12-28 16:30:28'),(2,'380956789012','P102','Tran Van D','Nữ','1990-01-01','2024-12-23',NULL,0,'2024-12-28 16:30:28'),(4,'123212112312','P103','Tran Van B','Nam','2002-10-12','2024-11-12',NULL,NULL,'2024-12-31 02:39:29');
/*!40000 ALTER TABLE `nhan_khau` ENABLE KEYS */;
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
