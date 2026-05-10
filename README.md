# Pertemuan9

# Identitas
Nama    : Alif Satriya Wicaksono
NIM     : 2410511002
Kelas   : Informatika A

# Link Repo Github
https://github.com/Alifsw21/Pertemuan9.git

# Cara menjalankan service

# 1. Konfigurasi file

1. Menjalankan perintah "npm install" pada gateway, authservice, dosenService, dan mahasiswaService

2. Membuat file .env pada folder gateway.
Berisikan data berikut:
- PORT=7070
- AUTH_SERVICE_URL=http://localhost:7080
- DOSEN_SERVICE_URL=http://localhost:7090
- MAHASISWA_SERVICE_URL=http://localhost:7100
- JWT_SECRET=secret

3. Membuat file .env pada folder authservice.
Berisikan data berikut:
- PORT=7080
- DB_HOST=localhost
- DB_PORT=3307
- DB_NAME=Alif_2410511002_dbPengguna
- DB_USER=root
- DB_PASSWORD=
- RABBITMQ_URL=amqp://guest:guest@localhost:5692
- JWT_SECRET=secret

4. Membuat file .env pada folder dosenService.
Berisikan data berikut:
- PORT=7090
- DB_HOST=localhost
- DB_PORT=3308
- DB_NAME=Alif_2410511002_dbDosen
- DB_USER=root
- DB_PASSWORD=
- RABBITMQ_URL=amqp://guest:guest@localhost:5692
- RABBITMQ_QUEUE_DOSEN=dosen_baru_queue
- JWT_SECRET=secret

5. Membuat file .env pada folder mahasiswaService.
Berisikan data berikut:
- PORT=7100
- DB_HOST=localhost
- DB_PORT=3309
- DB_NAME=Alif_2410511002_dbMahasiswa
- DB_USER=root
- DB_PASSWORD=
- RABBITMQ_URL=amqp://guest:guest@localhost:5692
- RABBITMQ_QUEUE_MAHASISWA=mahasiswa_baru_queue
- JWT_SECRET=secret

# 2. Menjalankan Docker

- Membuka Terminal
- Pindah direktori pertemuan9
- Menjalankan perintah `docker-compose up -d`

# 3. Menjalankan server

1. Gateway
- Membuka Terminal
- Pindah direktori gateway/
- Menjalankan perintah `node server.js`

2. Auth Service
- Membuka Terminal
- Pindah direktori services/authservice
- Menjalankan perintah `node server.js`

3. Dosen Service
- Membuka Terminal
- Pindah direktori services/dosenService
- Menjalankan perintah `node server.js`

4. Mahasiswa Service
- Membuka Terminal
- Pindah direktori services/mahasiswaService
- Menjalankan perintah `node server.js`

# 4. Peta Endpoint

Gunakan URL `http://localhost:7070` (lokal)
Gunakan URL `http://103.147.92.134:7050` (server)

1. Auth Service
- POST `/auth/login` : Melakukan login (public)
- POST `/auth/register` : Melakukan register (public)
- GET `/auth` : Menampilkan data pengguna (admin)
- PUT `/auth/update/:id` : Memperbarui data pengguna (public)
- DELETE `/auth/delete/:id` : Menghapus data pengguna (public)

2. Dosen Service
**Tabel Dosen**
- POST `/dosen` : Menambahkan data dosen (admin)
- GET `/dosen` : Menampilkan data dosen (public)
- DELETE `/dosen/:idDosen` : Menghapus data dosen (public)

**Tabel Kelas**
- POST `/dosen/kelas` : Menambahkan data kelas (admin)
- GET `/dosen/kelas` : Menampilkan data kelas (public)
- PUT `/dosen/kelas/:idKelas` : Memperbarui data kelas (admin)
- DELETE `/dosen/kelas/:idKelas` : Menghapus data kelas (admin)

**Tabel Matkul**
- POST `/dosen/matkul` : Menambahkan data matkul (admin)
- GET `/dosen/matkul` : Menampilkan data matkul (public)
- PUT `/dosen/matkul/:idMatkul` : Memperbarui data matkul (admin)
- DELETE `/dosen/matkul/:idMatkul` : Menghapus data matkul (admin)

3. Mahasiswa Service
**Tabel Mahasiswa**
- POST `/mahasiswa` : Menambahkan data mahasiswa (admin)
- GET `/mahasiswa` : Menampilkan data mahasiswa (public)
- PUT `/mahasiswa/:idMahasiswa` : Memperbarui data mahasiswa (admin)
- DELETE `/mahasiswa/:idMahasiswa` : Menghapus data mahasiswa (admin)

**Tabel KRS**
- POST `/mahasiswa/krs` : Menambahkan data KRS (admin)
- GET `/mahasiswa/krs` : Menampilkan data KRS (public)
- PUT `/mahasiswa/krs/:idKRS` : Memperbarui data KRS (admin)
- DELETE `/mahasiswa/krs/:idKRS` : Menghapus data KRS (admin)