const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authModel = require('../models/authModel');
const { getChannel } = require('../config/rabbitmq');
const { config } = require('../config/config');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user.id, role: user.role }, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

const register = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        
        if (!username || !password || !role) {
            return res.status(400).json({
                success: false,
                message: 'Username, password, dan role harus diisi',
                data: null
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const result = await authModel.createUser(username, hashPassword, role);

        const channel = getChannel();

        const payload = {
            userId: result.insertId,
            username: username,
            role: role
        };

        const queue = role === 'mahasiswa' ? 'mahasiswa_baru_queue' : 'dosen_baru_queue'

        await channel.assertQueue(queue, { durable: true });
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)));

        console.log(`Data terkirim ke antrian ${queue}:`, payload);

        return res.status(201).json({
            success: true,
            message: 'Register berhasil',
            data: { id: result.insertId, username, role }
        });
    } catch(err) {
        console.error("Error pada register:", err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    } 
}

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username, password harus diisi',
                data: null
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashNewPassword = await bcrypt.hash(password, salt);

        await authModel.updateUserById(id, username, hashNewPassword);

        const channel = getChannel();
        const payload = { userId: id, action: 'UPDATE' };

        await channel.assertQueue('user_update_queue', { durable: true });
        channel.sendToQueue('user_update_queue', Buffer.from(JSON.stringify(payload)));

        return res.status(200).json({
            success: true,
            message: 'User berhasil diperbarui',
            data: null
        });
    } catch (err) {
        console.error("Error pada proses perbarui data:", err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
}
const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: `Data pengguna dengan ${id} tidak ditemukan`,
                data: null
            });
        }
        await authModel.deleteUserById(id);

        const channel = getChannel();
        const payload = { userId: id, action: 'DELETE' };

        await channel.assertQueue('user_update_queue', { durable: true });
        channel.sendToQueue('user_update_queue', Buffer.from(JSON.stringify(payload)));

        return res.status(200).json({ 
            success: true,
            message: 'User berhasil dihapus',
            data: null
        });
    } catch (err) {
        console.error("Error pada proses menghapus:", err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username dan password harus diisi',
                data: null
            });
        }

        const rows = await authModel.getUserByUsername(username);

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Username tidak ditemukan',
                data: null
            });
        }

        const user = rows[0];

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Password salah',
                data: null
            });
        }

        const accessToken = generateAccessToken(user);

        return res.status(200).json({
            success: true,
            message: 'Login berhasil',
            token: accessToken,
            data: { 
                id: user.id,
                username: user.username,
                role: user.role
            }
        });
    } catch (err) {
        console.error("Error pada proses login:", err);
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan pada server',
            data: null
        });
    }
}

module.exports = { register, login, updateUser, deleteUser };