require('dotenv').config();
const express = require('express');
const krsRoute = require('./routes/krs');
const mahasiswaRoute = require('./routes/mahasiswa');
const { connectRabbitMQ } = require('./config/rabbitmq');
const startMahasiswaConsumer = require('./controller/mahasiswaConsumer');

const app = express();

app.use(express.json());
app.use('/krs', krsRoute);
app.use('/', mahasiswaRoute);

const PORT = process.env.PORT || 7100;

const startServer = async () => {
    try {
        await connectRabbitMQ();

        await startMahasiswaConsumer();
        app.listen(PORT, () => {
            console.log(`Mahasiswa service berjalan di port ${PORT}`);
        });
    } catch (err) {
        console.error("Server gagal menyala", err);
    }
};

startServer();