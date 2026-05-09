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
            const { NIP, namaDosen } = req.body;
            
            if (!NIP || !namaDosen) {
                return res.status(400).json({
                    success: false,
                    message: 'NIP dan nama dosen harus diisi',
                    data: null
                });
            }
    
            const result = await dosenModel.createDosen(NIP, namaDosen);
    
            return res.status(201).json({
                success: true,
                message: 'Data dosen berhasil ditambahkan',
                data: { id: result.insertId, NIP, namaDosen }
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
            const [result] = await dosenModel.deleteDosen(idDosen);
    
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
    },

    createKelas: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { namaKelas } = req.body;
    
            if (!namaKelas) {
                return res.status(404).json({
                    success: false,
                    message: 'Nama kelas harus diisi',
                    data: null
                });
            }
    
            const result = await dosenModel.createKelas(namaKelas);
    
            return res.status(201).json({
                success: true,
                message: 'Data kelas berhasil ditambahkan',
                data: { id: result.insertId, namaKelas }
            });
        } catch (error) {
            console.error("Error pada saat membuat data kelas:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    selectKelas: async (req, res) => {
        if (!req.user || req.user.role !== 'admin' && req.user.role !== 'dosen') {
             return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const rows = await dosenModel.selectKelas();
    
            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data kelas kosong',
                    data: null
                });
            }
    
            return res.status(200).json({
                success: true,
                message: 'Data kelas berhasil diambil',
                data: { id: rows.insertId }
            });
        } catch (error) {
            console.error("Error pada saat menampilkan data kelas:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    updateKelas: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }
    
        try {
            const { idKelas } = req.params;
            
            if (!idKelas) {
                return res.status(404).json({
                    success: false,
                    message: `Data kelas dengan id ${idKelas} tidak ditemukan`,
                    data: null
                });
            }
    
            const { namaKelas } = req.body;
    
            if (!namaKelas) {
                return res.status(404).json({
                    success: false,
                    message: 'Nama kelas harus diisi',
                    data: null
                });
            }
    
            const result = await dosenModel.updateKelas(idKelas, namaKelas);
    
            return res.status(200).json({
                success: true,
                message: `Data kelas dengan id ${idKelas} berhasil diperbarui`,
                data: { id: result.insertId, namaKelas}
            });
        } catch (error) {
            console.error("Error pada saat memperbarui data kelas:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    deleteKelas: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }
    
        try {
            const { idKelas } = req.params;
    
            if (!idKelas) {
                return res.status(404).json({
                    success: false,
                    message: `Data kelas dengan id ${idKelas} tidak ditemukan`,
                    data: null
                });
            }
    
            const result = await dosenModel.deleteKelas(idKelas);
    
            return res.status(200).json({
                success: true,
                message: `Data kelas dengan id ${idKelas} berhasil dihapus`,
                data: null
            });
        } catch (error) {
            console.error("Error pada saat menghapus data kelas:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    }
}

module.exports = dosen;