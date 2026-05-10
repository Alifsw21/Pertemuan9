const dosenModel = require('../models/dosenModel');
const { getChannel } = require('../config/rabbitmq');

const dosen = {
    createDosen: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { idPengguna, NIP, namaDosen } = req.body;
            
            if (!idPengguna || !NIP || !namaDosen) {
                return res.status(400).json({
                    success: false,
                    message: 'id pengguna, NIP dan nama dosen harus diisi',
                    data: null
                });
            }
    
            const result = await dosenModel.createDosen(idPengguna, NIP, namaDosen);
    
            return res.status(201).json({
                success: true,
                message: 'Data dosen berhasil ditambahkan',
                data: { id: result.insertId, idPengguna, NIP, namaDosen }
            });
        } catch (error) {
            console.error("Error pada saat membuat data dosen:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    selectDosen: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const rows = await dosenModel.selectDosen();

            if (rows.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data dosen kosong',
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Data dosen berhasil diambil',
                data: rows
            });
        } catch (error) {
            console.error("Error pada saat mengambil data dosen:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    deleteDosen: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
             return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { idDosen } = req.params;
            const result = await dosenModel.deleteDosen(idDosen);
    
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: `Dosen dengan ID ${idDosen} tidak ditemukan`,
                    data: null
                });
            }
    
            return res.status(200).json({
                    success: true,
                    message: `Data dosen dengan id ${idDosen} berhasil dihapus`,
                    data: null
                });
        } catch (error) {
            console.error("Error pada saat menghapus data dosen:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    }
}

module.exports = dosen;