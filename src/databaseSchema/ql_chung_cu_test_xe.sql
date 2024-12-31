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
-- Table structure for table `xe`
--

DROP TABLE IF EXISTS `xe`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xe` (
  `ma_phong` varchar(10) NOT NULL,
  `loai_xe` enum('xe_may','o_to') NOT NULL,
  `bien_xe` varchar(20) NOT NULL,
  PRIMARY KEY (`bien_xe`),
  UNIQUE KEY `bien_xe` (`bien_xe`),
  KEY `ma_phong` (`ma_phong`),
  CONSTRAINT `xe_ibfk_1` FOREIGN KEY (`ma_phong`) REFERENCES `phong` (`ma_phong`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xe`
--

LOCK TABLES `xe` WRITE;
/*!40000 ALTER TABLE `xe` DISABLE KEYS */;
INSERT INTO `xe` VALUES ('P102','o_to','1'),('P101','xe_may','2'),('P101','o_to','4');
/*!40000 ALTER TABLE `xe` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_xe` AFTER INSERT ON `xe` FOR EACH ROW BEGIN
    DECLARE p_id_thanh_toan INT;

    -- Attempt to find the payment record
    BEGIN
        DECLARE EXIT HANDLER FOR NOT FOUND SET p_id_thanh_toan = NULL;

        SELECT id_thanh_toan
        INTO p_id_thanh_toan
        FROM thanh_toan_hang_thang
        WHERE MONTH(thoi_gian) = MONTH(CURDATE())
          AND YEAR(thoi_gian) = YEAR(CURDATE())
          AND ma_phong = NEW.ma_phong
        LIMIT 1;
    END;

    -- If payment record exists, perform updates
    IF p_id_thanh_toan IS NOT NULL THEN
        -- Update parking fee
        UPDATE phi_hang_thang
        SET so_tien = Tinh_tien_gui_xe(NEW.ma_phong)
        WHERE loai_phi = "phí xe cộ"
          AND id_thanh_toan = p_id_thanh_toan;

        -- Update total amount due
        UPDATE thanh_toan_hang_thang
        SET tong_tien_can_dong = Tinh_tong_tien(p_id_thanh_toan)
        WHERE id_thanh_toan = p_id_thanh_toan;
    END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_xe` AFTER UPDATE ON `xe` FOR EACH ROW BEGIN
	DECLARE p_id_thanh_toan INT;
    
    SELECT id_thanh_toan
    INTO p_id_thanh_toan
    FROM thanh_toan_hang_thang
    WHERE MONTH(thoi_gian) = MONTH(CURDATE())
	AND YEAR(thoi_gian) = YEAR(CURDATE())
    AND ma_phong = NEW.ma_phong;

    UPDATE phi_hang_thang
    SET so_tien = Tinh_tien_gui_xe(NEW.ma_phong)
    WHERE loai_phi = "phí xe cộ"
    AND id_thanh_toan = p_id_thanh_toan;
    
    UPDATE thanh_toan_hang_thang
    SET tong_tien_can_dong = Tinh_tong_tien(id_thanh_toan)
    WHERE id_thanh_toan = p_id_thanh_toan;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_delete_xe` AFTER DELETE ON `xe` FOR EACH ROW BEGIN
	DECLARE p_id_thanh_toan INT;
    
    SELECT id_thanh_toan
    INTO p_id_thanh_toan
    FROM thanh_toan_hang_thang
    WHERE MONTH(thoi_gian) = MONTH(CURDATE())
	AND YEAR(thoi_gian) = YEAR(CURDATE())
    AND ma_phong = OLD.ma_phong;

    UPDATE phi_hang_thang
    SET so_tien = Tinh_tien_gui_xe(OLD.ma_phong)
    WHERE loai_phi = "phí xe cộ"
    AND id_thanh_toan = p_id_thanh_toan;
    
    UPDATE thanh_toan_hang_thang
    SET tong_tien_can_dong = Tinh_tong_tien(id_thanh_toan)
    WHERE id_thanh_toan = p_id_thanh_toan;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-31 12:53:12
