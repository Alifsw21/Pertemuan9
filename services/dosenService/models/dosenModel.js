const { db } = require('../config/config');

const dosen = {
    createDosen: async(idPengguna, NIP, namaDosen) => {
        const [result] = await db.execute(
            `INSERT INTO dosen (idPengguna, NIP, namaDosen) VALUES (?, ?, ?)`,
            [idPengguna, NIP, namaDosen]
        );
        return result;
    },

    selectDosen: async() => {
        const [rows] = await db.execute(
            `SELECT * FROM dosen`
        );
        return rows;
    },
    
    deleteDosen: async(idDosen) => {
        const [result] = await db.execute(
            `DELETE FROM dosen WHERE idDosen = ?`, 
            [idDosen]
        );
        return result;
    }
}

module.exports = dosen;