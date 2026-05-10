const { getChannel } = require('../config/rabbitmq');
const { config } = require('../config/config');
const mahasiswaModel = require('../models/mahasiswaModel');

const startMahasiswaConsumer = async () => {
    try {
        const channel = getChannel();
        const queueName = config.queueMahasiswa;

        await channel.assertQueue(queueName, { durable: true });

        console.log(`Mahasiswa consumer siap mendengarkan antrean: ${queueName}`);

        channel.consume(queueName, async (msg) => {
            if (msg !== null) {
                const data = JSON.parse(msg.content.toString());
                console.log(`Pesan diterima dari auth service:`, data);

                try {
                    await mahasiswaModel.createMahasiswa(data.userId, data.username, data.username);

                    channel.ack(msg);
                    console.log(`Profil Mahasiswa untuk ${data.username} berhasil dibuat`);
                } catch (error) {
                    console.error('Gagal menyimpan ke database:', error);
                }
            }
        });
    } catch (error) {
        console.error('Consumber gagal berjalan:', error);
    }
};

module.exports = startMahasiswaConsumer;