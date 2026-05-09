require('dotenv').config();
const express = require('express');
const dosenRoutes = require('./routes/dosen');
const { connectRabbitMQ } = require('./config/rabbitmq');
const startDosenConsumer = require('./controllers/dosenConsumer');
const { start } = require('node:repl');

const app = express();

app.use(express.json());
app.use('/', dosenRoutes);

const PORT = process.env.PORT || 7090;

const startServer = async () => {
    try {
        await connectRabbitMQ();

        await startDosenConsumer();

        app.listen(PORT, () => {
            console.log(`Auth service berjalan di port ${PORT}`);
        });
    } catch (err) {
        console.error("Server gagal menyala", err);
    }
};

startServer();