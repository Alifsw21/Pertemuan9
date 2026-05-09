require('dotenv').config();
const express = require('express');
const dosenRoute = require('./routes/dosen');
const matkulRoute = require('./routes/matkul');
const kelasRoute = require('./routes/kelas');
const { connectRabbitMQ } = require('./config/rabbitmq');
const startDosenConsumer = require('./controllers/dosenConsumer');

const app = express();

app.use(express.json());

app.use('/dosen', dosenRoute);

app.use('/matkul', matkulRoute);

app.use('/kelas', kelasRoute);

const PORT = process.env.PORT || 7090;

const startServer = async () => {
    try {
        await connectRabbitMQ();

        await startDosenConsumer();

        app.listen(PORT, () => {
            console.log(`Dosen service berjalan di port ${PORT}`);
        });
    } catch (err) {
        console.error("Server gagal menyala", err);
    }
};

startServer();