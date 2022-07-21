CREATE DATABASE IF NOT EXISTS `payroll_system`;

USE `payroll_system`;

DROP TABLE IF EXISTS `employees`;

CREATE TABLE
    IF NOT EXISTS `employees` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `uuid` VARCHAR(100) NOT NULL DEFAULT UUID_SHORT() UNIQUE,
        `first_nm` VARCHAR(80) NOT NULL,
        `last_nm` VARCHAR(80) NOT NULL,
        `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

ALTER TABLE `employees` AUTO_INCREMENT = 1001;

INSERT INTO employees(first_nm, last_nm) VALUES('Roshane','Johnson');

DROP TABLE IF EXISTS `departments`;

CREATE TABLE
    IF NOT EXISTS `departments` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `name` VARCHAR(80) NOT NULL UNIQUE,
        `hourly_rate` DOUBLE NOT NULL,
        PRIMARY KEY (`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
    departments(name, hourly_rate)
VALUES
('Operations', 175), ('Sales & Marketing', 200), (
        'Administration and Accounts',
        510
    );

DROP TABLE IF EXISTS `pay_cycle`;

CREATE TABLE
    IF NOT EXISTS `pay_cycle` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `employee_id` INT NOT NULL,
        `department_id` INT NOT NULL,
        `cycle_date` DATE NOT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY(`employee_id`) REFERENCES employees(`id`),
        FOREIGN KEY(`department_id`) REFERENCES departments(`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;

INSERT INTO
    pay_cycle(
        employee_id,
        department_id,
        cycle_date
    )
VALUES
(1001, 3, '2022-06-24');

DROP TABLE IF EXISTS `salaries`;

CREATE TABLE
    IF NOT EXISTS `salaries` (
        `id` INT NOT NULL AUTO_INCREMENT,
        `checkin_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
        `checkout_time` TIMESTAMP NULL,
        `employee_id` INT NOT NULL,
        `department_id` INT NOT NULL,
        PRIMARY KEY (`id`),
        FOREIGN KEY(`employee_id`) REFERENCES employees(`id`),
        FOREIGN KEY(`department_id`) REFERENCES departments(`id`)
    ) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4;