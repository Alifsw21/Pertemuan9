CREATE DATABASE IF NOT EXISTS Alif_2410511002_dbPengguna;
USE Alif_2410511002_dbPengguna;

CREATE TABLE pengguna(
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(255),
    role ENUM('dosen', 'mahasiswa', 'admin')
);