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
-- Table structure for table `phi_co_so`
--

DROP TABLE IF EXISTS `phi_co_so`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phi_co_so` (
  `id_phi_co_so` int NOT NULL AUTO_INCREMENT,
  `loai_phi` varchar(50) NOT NULL,
  `gia_co_so` float NOT NULL,
  `mo_ta` text,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_phi_co_so`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phi_co_so`
--

LOCK TABLES `phi_co_so` WRITE;
/*!40000 ALTER TABLE `phi_co_so` DISABLE KEYS */;
INSERT INTO `phi_co_so` VALUES (1,'phí xe máy',70000,'phí xe máy đồng/xe/tháng','2024-12-27 15:14:10'),(2,'phí ô tô',1200000,'phí ô tô đồng/xe/tháng','2024-12-27 15:14:10'),(3,'phí dịch vụ chung cư',16500,'phí dịch vụ chung cư đồng/m2/tháng','2024-12-28 13:14:10'),(4,'phí quản lý chung cư',7000,'phí quản lý chung cư đồng/m2/tháng','2024-12-28 13:14:10');
/*!40000 ALTER TABLE `phi_co_so` ENABLE KEYS */;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_insert_phi_co_so` AFTER INSERT ON `phi_co_so` FOR EACH ROW BEGIN
    -- Declare variables for the current month and year
    DECLARE current_month INT;
    DECLARE current_year INT;
    
    -- Get the current month and year
    SET current_month = MONTH(CURRENT_DATE());
    SET current_year = YEAR(CURRENT_DATE());
    
    -- Insert new rows into phi_hang_thang for matching thanh_toan_hang_thang rows
    INSERT INTO phi_hang_thang (id_thanh_toan, loai_phi, so_tien, mo_ta)
    SELECT t.id_thanh_toan, NEW.loai_phi, NEW.gia_co_so, NEW.mo_ta
    FROM thanh_toan_hang_thang t
    WHERE MONTH(t.thoi_gian) = current_month
      AND YEAR(t.thoi_gian) = current_year;
    
    -- Update the tong_tien_can_dong in thanh_toan_hang_thang based on the new phi_hang_thang rows
    UPDATE thanh_toan_hang_thang tt
    SET tt.tong_tien_can_dong = tt.tong_tien_can_dong + NEW.gia_co_so
    WHERE MONTH(tt.thoi_gian) = current_month
      AND YEAR(tt.thoi_gian) = current_year;
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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_update_phi_co_so` AFTER UPDATE ON `phi_co_so` FOR EACH ROW BEGIN
    -- Declare variables for the current month and year
    DECLARE current_month INT;
    DECLARE current_year INT;
    DECLARE old_so_tien FLOAT;
    DECLARE new_so_tien FLOAT;
    DECLARE ma_phong_value VARCHAR(10);

    -- Get the current month and year
    SET current_month = MONTH(CURRENT_DATE());
    SET current_year = YEAR(CURRENT_DATE());

    -- Handle non-default phi_loai_phi cases (before update)
    IF (OLD.loai_phi NOT IN ("phí xe máy", "phí ô tô", "phí dịch vụ chung cư", "phí quản lý chung cư")) THEN
        -- For non-special cases, use gia_co_so directly
        SET old_so_tien = OLD.gia_co_so;
        SET new_so_tien = NEW.gia_co_so;

        UPDATE phi_hang_thang pht
        JOIN thanh_toan_hang_thang ttt ON ttt.id_thanh_toan = pht.id_thanh_toan
        SET pht.loai_phi = NEW.loai_phi,
            pht.so_tien = NEW.gia_co_so,
            pht.mo_ta = NEW.mo_ta
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year;

    ELSEIF (OLD.loai_phi IN ("phí xe máy", "phí ô tô")) THEN
        -- Extract ma_phong for xe máy or ô tô and calculate old value
        SELECT ttt.ma_phong
        INTO ma_phong_value
        FROM thanh_toan_hang_thang ttt
        JOIN phi_hang_thang pht ON ttt.id_thanh_toan = pht.id_thanh_toan
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year
        LIMIT 1;

        -- Call the function with old value
        SET old_so_tien = Tinh_tien_gui_xe(ma_phong_value);

        -- Proceed with the update
        UPDATE phi_hang_thang pht
        JOIN thanh_toan_hang_thang ttt ON ttt.id_thanh_toan = pht.id_thanh_toan
        SET pht.loai_phi = NEW.loai_phi,
            pht.so_tien = Tinh_tien_gui_xe(ma_phong_value),  -- Use updated value from the function
            pht.mo_ta = NEW.mo_ta
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year;
          
          -- Set new_so_tien for xe máy or ô tô case
        SET new_so_tien = Tinh_tien_gui_xe(ma_phong_value);

    ELSEIF (OLD.loai_phi = "phí dịch vụ chung cư") THEN
        -- Handle service fees (similar to above)
        SELECT ttt.ma_phong
        INTO ma_phong_value
        FROM thanh_toan_hang_thang ttt
        JOIN phi_hang_thang pht ON ttt.id_thanh_toan = pht.id_thanh_toan
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year
        LIMIT 1;

        SET old_so_tien = Tinh_phi_dich_vu_hang_thang(ma_phong_value); -- Old fee calculation

        UPDATE phi_hang_thang pht
        JOIN thanh_toan_hang_thang ttt ON ttt.id_thanh_toan = pht.id_thanh_toan
        SET pht.loai_phi = NEW.loai_phi,
            pht.so_tien = Tinh_phi_dich_vu_hang_thang(ma_phong_value),
            pht.mo_ta = NEW.mo_ta
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year;
          
                  -- Set new_so_tien for service fee case
        SET new_so_tien = Tinh_phi_dich_vu_hang_thang(ma_phong_value);

    ELSEIF (OLD.loai_phi = "phí quản lý chung cư") THEN
        -- Handle management fee
        SELECT ttt.ma_phong
        INTO ma_phong_value
        FROM thanh_toan_hang_thang ttt
        JOIN phi_hang_thang pht ON ttt.id_thanh_toan = pht.id_thanh_toan
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year
        LIMIT 1;

        SET old_so_tien = Tinh_phi_quan_ly_hang_thang(ma_phong_value);  -- Old fee calculation

        UPDATE phi_hang_thang pht
        JOIN thanh_toan_hang_thang ttt ON ttt.id_thanh_toan = pht.id_thanh_toan
        SET pht.loai_phi = NEW.loai_phi,
            pht.so_tien = Tinh_phi_quan_ly_hang_thang(ma_phong_value),
            pht.mo_ta = NEW.mo_ta
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(ttt.thoi_gian) = current_month
          AND YEAR(ttt.thoi_gian) = current_year;
          
                  -- Set new_so_tien for management fee case
        SET new_so_tien = Tinh_phi_quan_ly_hang_thang(ma_phong_value);

    END IF;

    -- Update the tong_tien_can_dong in thanh_toan_hang_thang based on the updated phi_hang_thang rows
        UPDATE thanh_toan_hang_thang
        SET tong_tien_can_dong = Tinh_tong_tien(id_thanh_toan)
        WHERE MONTH(thoi_gian) = current_month
			AND YEAR(thoi_gian) = current_year;

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
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `after_delete_phi_co_so` AFTER DELETE ON `phi_co_so` FOR EACH ROW BEGIN
    -- Declare variables for the current month and year
    DECLARE current_month INT;
    DECLARE current_year INT;

    -- Get the current month and year
    SET current_month = MONTH(CURRENT_DATE());
    SET current_year = YEAR(CURRENT_DATE());
    
    -- Delete corresponding rows from phi_hang_thang
    DELETE FROM phi_hang_thang pht
    WHERE id_thanh_toan IN (
        SELECT t.id_thanh_toan
        FROM thanh_toan_hang_thang t
        WHERE pht.loai_phi = OLD.loai_phi
          AND MONTH(t.thoi_gian) = current_month
          AND YEAR(t.thoi_gian) = current_year
    );
    
    -- Update the tong_tien_can_dong in thanh_toan_hang_thang based on the deleted phi_hang_thang rows
    UPDATE thanh_toan_hang_thang tt
    SET tt.tong_tien_can_dong = tt.tong_tien_can_dong - OLD.gia_co_so
    WHERE MONTH(tt.thoi_gian) = current_month
      AND YEAR(tt.thoi_gian) = current_year;
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
