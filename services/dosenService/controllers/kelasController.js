const rabbitmq = require('../config/rabbitmq');
const kelasModel = require('../models/kelasModel');

const kelas = {
    createKelas: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { idDosen, idMatkul, namaKelas } = req.body;
    
            if (!idDosen || !idMatkul || !namaKelas) {
                return res.status(404).json({
                    success: false,
                    message: 'id dosen, id matkul, dan nama kelas harus diisi',
                    data: null
                });
            }
    
            const result = await kelasModel.createKelas(idDosen, idMatkul, namaKelas);
    
            return res.status(201).json({
                success: true,
                message: 'Data kelas berhasil ditambahkan',
                data: { id: result.insertId, idDosen, idMatkul, namaKelas }
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
            const rows = await kelasModel.selectKelas();
    
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
                data: rows
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
    
            const result = await kelasModel.updateKelas(idKelas, namaKelas);
    
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
    
            const result = await kelasModel.deleteKelas(idKelas);
    
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

module.exports = kelas;