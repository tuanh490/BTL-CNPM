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
-- Table structure for table `khoan_phi_ung_ho`
--

DROP TABLE IF EXISTS `khoan_phi_ung_ho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `khoan_phi_ung_ho` (
  `id` int NOT NULL AUTO_INCREMENT,
  `ma_phong` varchar(10) NOT NULL,
  `so_tien` float DEFAULT NULL,
  `mo_ta` text,
  `thoi_gian` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `khoan_phi_ung_ho_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`ma_phong`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `khoan_phi_ung_ho`
--

LOCK TABLES `khoan_phi_ung_ho` WRITE;
/*!40000 ALTER TABLE `khoan_phi_ung_ho` DISABLE KEYS */;
INSERT INTO `khoan_phi_ung_ho` VALUES (3,'P101',100000,'','2004-10-12'),(4,'P101',100000,'Phí tự nguyện','1004-10-12'),(7,'P102',70000,'Phí tự nguyện','2024-12-26'),(8,'P103',90000,'Phí không tự nguyện','2024-12-25');
/*!40000 ALTER TABLE `khoan_phi_ung_ho` ENABLE KEYS */;
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
