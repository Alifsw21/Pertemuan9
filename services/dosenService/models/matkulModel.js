const { db } = require('../config/config');

const matkul = {
    createMatkul: async(kodeMatkul, namaMatkul, sks) => {
        const [result] = await db.execute(
            `INSERT INTO mataKuliah (kodeMatkul, namaMatkul, sks) VALUES (?, ?, ?)`,
            [kodeMatkul, namaMatkul, sks]
        );
        return result;
    },

    selectMatkul: async() => {
        const [rows] = await db.execute(
            `SELECT * FROM mataKuliah`
        );
        return rows;
    },

    updateMatkul: async(idMatkul, kodeMatkul, namaMatkul, sks) => {
        const [result] = await db.execute(
            `UPDATE mataKuliah SET kodeMatkul = ?, namaMatkul = ?, sks = ? WHERE idMatkul = ?`,
            [kodeMatkul, namaMatkul, sks, idMatkul]
        );
        return result;
    },

    deleteMatkul: async(idMatkul) => {
        const [result] = await db.execute(
            `DELETE FROM mataKuliah WHERE idMatkul = ?`,
            [idMatkul]
        );
        return result;
    }
}

module.exports = matkul;