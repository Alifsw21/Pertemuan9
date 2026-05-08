require('dotenv').config();
const amp = require('amqplib');

async function connectRabbitMQ() {
    try {
        const connection = await amqp.connect(process.env.RABBITMQ_URL);
        const channel = await connection.createChannel();
        
        console.log("Berhasil terhubung ke RabbitMQ!");
        return channel;
    } catch (err) {
        console.err("Gagal terhubung ke RabbitMQ:", err);
    }
}

const getChannel = () => {
    if (!channel) {
        throw new Error("Channel RabbitMQ belum siap");
    }
    return channel;
};

module.exports = { connectRabbitMQ, getChannel };