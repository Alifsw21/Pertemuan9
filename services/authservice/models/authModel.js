const { db } = require('../config/config');

const auth = {
    createUser: async (username, hashPassword, role) => {
        const [result] = await db.execute(
            `INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)`,
            [username, hashPassword, role]
        );
        return result;
    },

    selectUser: async () => {
        const [rows] = await db.execute(
            `SELECT * FROM pengguna`
        );
        return rows;
    },
    
    updateUserById: async (id, newUsername, newPassword) => {
        const [result] = await db.execute(
            `UPDATE pengguna SET username = ?, password = ? WHERE id = ?`,
            [newUsername, newPassword, id]
        );
        return result;
    },
    
    deleteUserById: async (id) => {
        const [result] = await db.execute(
            `DELETE FROM pengguna WHERE id = ?`, [id]
        );
        return result;
    },
    
    getUserByUsername: async (username) => {
        const [rows] = await db.execute(
            `SELECT * FROM pengguna WHERE username = ?`,
            [username]
        );
        return rows;
    }
}

module.exports = auth;