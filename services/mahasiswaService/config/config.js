require('dotenv').config();
const mysql = require('mysql2/promise');

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

const config = {
    jwtSecret: process.env.JWT_SECRET,
    queueMahasiswa: process.env.RABBITMQ_QUEUE_MAHASISWA
};

module.exports = { db, config };