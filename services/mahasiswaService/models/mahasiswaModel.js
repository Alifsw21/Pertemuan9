const { db } = require('../config/config');

const mahasiswa = {
    createMahasiswa: async (idPengguna, NIM, namaMahasiswa, kelas) => {
        const [result] = await db.execute(
            `INSERT INTO mahasiswa(idPengguna, NIM, namaMahasiswa, kelas) VALUES (?, ?, ?, ?)`,
            [idPengguna, NIM, namaMahasiswa, kelas]
        );
        return result;
    },

    selectMahasiswa: async () => {
        const [rows] = await db.execute(`SELECT * FROM mahasiswa`);
        return rows;
    },

    updateMahasiswa: async (idMahasiswa, idPengguna, NIM, namaMahasiswa, kelas) => {
        const [result] = await db.execute(
            `UPDATE mahasiswa SET idPengguna = ?, NIM = ?, namaMahasiswa = ?, kelas = ? WHERE idMahasiswa = ?`,
            [idPengguna, NIM, namaMahasiswa, kelas, idMahasiswa]
        );
        return result;
    },

    deleteMahasiswa: async (idMahasiswa) => {
        const [result] = await db.execute(
            `DELETE FROM mahasiswa WHERE idMahasiswa = ?`,
            [idMahasiswa]
        );
        return result;
    }
}

module.exports = mahasiswa;