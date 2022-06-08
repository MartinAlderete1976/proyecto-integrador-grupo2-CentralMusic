-- MySQL Script generated by MySQL Workbench
-- Mon Jun  6 03:57:55 2022
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema centralMusic_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema centralMusic_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `centralMusic_db` DEFAULT CHARACTER SET utf8 ;
USE `centralMusic_db` ;

-- -----------------------------------------------------
-- Table `centralMusic_db`.`categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`categories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_category` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`subcategories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`subcategories` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `categories_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_subcategories_categories1_idx` (`categories_id` ASC),
  CONSTRAINT `fk_subcategories_categories1`
    FOREIGN KEY (`categories_id`)
    REFERENCES `centralMusic_db`.`categories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`marcas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`marcas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `marca` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`products` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `price` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT(200) NOT NULL,
  `stock` TINYINT NOT NULL,
  `subcategories_id` INT NOT NULL,
  `marcas_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_subcategories1_idx` (`subcategories_id` ASC),
  INDEX `fk_products_marcas1_idx` (`marcas_id` ASC),
  CONSTRAINT `fk_products_subcategories1`
    FOREIGN KEY (`subcategories_id`)
    REFERENCES `centralMusic_db`.`subcategories` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_products_marcas1`
    FOREIGN KEY (`marcas_id`)
    REFERENCES `centralMusic_db`.`marcas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`products_images`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`products_images` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name_image` VARCHAR(45) NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_products_images_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_products_images_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `centralMusic_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`guitar_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`guitar_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `model` VARCHAR(45) NOT NULL,
  `line` VARCHAR(45) NOT NULL,
  `body_finish` VARCHAR(45) NOT NULL,
  `material_body` VARCHAR(45) NOT NULL,
  `hand` VARCHAR(45) NOT NULL,
  `color` VARCHAR(45) NOT NULL,
  `material_fretboard` VARCHAR(45) NOT NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_guitar_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_guitar_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `centralMusic_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`cuerdas_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`cuerdas_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `cantidad_cuerdas` INT NULL,
  `tension` VARCHAR(45) NULL,
  `materiales` VARCHAR(45) NULL,
  `calibre` VARCHAR(45) NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_accesories_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_accesories_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `centralMusic_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`user_rol`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`user_rol` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `rol_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `user` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `avatar` VARCHAR(45) NULL,
  `user_rol_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC),
  INDEX `fk_users_user_rol1_idx` (`user_rol_id` ASC),
  CONSTRAINT `fk_users_user_rol1`
    FOREIGN KEY (`user_rol_id`)
    REFERENCES `centralMusic_db`.`user_rol` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`pedal_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`pedal_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `vocal` VARCHAR(10) NULL,
  `cantidad_efectos` INT NULL,
  `instrumentos_compatibles` VARCHAR(45) NULL,
  `tipo_de_efectos` VARCHAR(45) NULL,
  `voltaje` VARCHAR(45) NULL,
  `tecnologia` VARCHAR(45) NULL,
  `alimentacion` VARCHAR(45) NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedal_details_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_pedal_details_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `centralMusic_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `centralMusic_db`.`cables_details`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `centralMusic_db`.`cables_details` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conector_entrada` VARCHAR(45) NULL,
  `conector_salida` VARCHAR(45) NULL,
  `largo` VARCHAR(45) NULL,
  `products_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_cables_details_products1_idx` (`products_id` ASC),
  CONSTRAINT `fk_cables_details_products1`
    FOREIGN KEY (`products_id`)
    REFERENCES `centralMusic_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
