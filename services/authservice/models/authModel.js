const { db } = require('../config/config');

const createUser = async (username, hashPassword, role) => {
    const [result] = await db.execute(
        `INSERT INTO pengguna (username, password, role) VALUES (?, ?, ?)`,
        [username, hashPassword, role]
    );
    return result;
};

const updateUserById = async (id, newUsername, newPassword) => {
    const [result] = await db.execute(
        `UPDATE pengguna SET username = ?, password = ? WHERE id = ?`,
        [newUsername, newPassword, id]
    );
    return result;
};

const deleteUserById = async (id) => {
    const [result] = await db.execute(
        `DELETE FROM pengguna WHERE id = ?`, [id]
    );
    return result;
};

const getUserByUsername = async (username) => {
    const [rows] = await db.execute(
        `SELECT * FROM pengguna WHERE username = ?`,
        [username]
    );
    return rows;
};

module.exports = { createUser, updateUserById, deleteUserById, getUserByUsername };