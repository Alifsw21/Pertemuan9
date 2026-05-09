const { getChannel } = require('../config/rabbitmq');
const { config } = require('../config/config');
const dosenModel = require('../models/dosenModel');

const startDosenConsumer = async () => {
    try {
        const channel = getChannel();
        const queueName = config.queueDosen;

        await channel.assertQueue(queueName, { durable: true });

        console.log(`Dosen consumer siap mendengarkan antrean: ${queueName}`);

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                console.log(`Pesan diterima dari auth service:`, data);

                try {
                    await dosenModel.createDosen(data.username, data.username);

                    channel.ack(msg);
                    console.log(`Profil dosen untuk ${data.username} berhasil dibuat`);
                } catch (error) {
                    console.error('Gagal menyimpan ke database:', error);
                }
            }
        });
    } catch (error) {
        console.error('Consumber gagal berjalan:', error);
    }
};

module.exports = startDosenConsumer;