require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/auth');
const { connectRabbitMQ } = require('./config/rabbitmq');
const app = express();

app.use(express.json());
app.use('/', authRoutes);

const PORT = process.env.PORT || 7080;

const startServer = async () => {
    try {
        await connectRabbitMQ();

        app.listen(PORT, () => {
            console.log(`Auth service berjalan di port ${PORT}`);
        });
    } catch (err) {
        console.error("Server gagal menyala", err);
    }
};

startServer();