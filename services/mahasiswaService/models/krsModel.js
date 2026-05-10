const { db } = require('../config/config');

const krs = {
    createKrs: async (idMahasiswa, idKelas) => {
        const [result] = await db.execute(
            `INSERT INTO krs(idMahasiswa, idKelas) VALUES (?, ?)`,
            [idMahasiswa, idKelas]
        );
        return result;
    },

    selectKrs: async () => {
        const [rows] = await db.execute(`SELECT * FROM krs`);
        return rows;
    },

    updateKrs: async (idKRS, idMahasiswa, idKelas) => {
        const [result] = await db.execute(
            `UPDATE krs SET idMahasiswa = ?, idKelas = ? WHERE idKRS = ?`,
            [idMahasiswa, idKelas, idKRS]
        );
        return result;
    },

    deleteKrs: async (idKRS) => {
        const [result] = await db.execute(
            `DELETE FROM krs WHERE idKRS = ?`, 
            [idKRS]
        );
        return result;
    }
}

module.exports = krs;