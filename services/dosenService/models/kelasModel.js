const { db } = require('../config/config');

const kelas = {
    createKelas: async(idDosen, idMatkul, namaKelas) => {
        const [result] = await db.execute(
            `INSERT INTO kelas (idDosen, idMatkul, namaKelas) VALUES (?, ?, ?)`,
            [idDosen, idMatkul, namaKelas]
        );
        return result;
    },

    selectKelas: async() => {
        const [rows] = await db.execute(`SELECT * FROM kelas`);
        return rows;
    },

    updateKelas: async(idKelas, namaKelas) => {
        const [result] = await db.execute(
            `UPDATE kelas SET namaKelas = ? WHERE idKelas = ?`,
            [namaKelas, idKelas]
        );
        return result;
    },

    deleteKelas: async(idKelas) => {
        const [result] = await db.execute(
            `DELETE FROM kelas WHERE idKelas = ?`,
            [idKelas]
        );
        return result;
    }
}

module.exports = kelas;