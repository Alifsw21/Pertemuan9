CREATE DATABASE IF NOT EXISTS Alif_2410511002_dbMahasiswa;
USE Alif_2410511002_dbMahasiswa;

CREATE TABLE mahasiswa(
    idMahasiswa INT AUTO_INCREMENT PRIMARY KEY,
    idPengguna INT NOT NULL,
    NIM VARCHAR(50),
    namaMahasiswa VARCHAR(100),
    kelas VARCHAR(50)
);

CREATE TABLE krs(
    idKRS INT AUTO_INCREMENT PRIMARY KEY,
    idMahasiswa INT NOT NULL,
    idKelas INT NOT NULL,
    FOREIGN KEY (idMahasiswa) REFERENCES mahasiswa(idMahasiswa)
);