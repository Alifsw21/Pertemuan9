const { db } = require('../config/config');

const dosen = {
    createDosen: async(NIP, namaDosen) => {
        const [result] = await db.execute(
            `INSERT INTO dosen (NIP, namaDosen) VALUES (?, ?)`,
            [NIP, namaDosen]
        );
        return result;
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