const matkulModel = require('../models/matkulModel');
const { getChannel } = require('../config/rabbitmq');

const matkul = {
    createMatkul: async (req, res) => {
         if (!req.user || req.user.role !== 'admin') {
             return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { kodeMatkul, namaMatkul, sks } = req.body;
    
            if (!kodeMatkul || !namaMatkul || !sks) {
                return res.status(400).json({
                    success: false,
                    message: 'Kode matkul, nama matkul, dan sks harus diisi',
                    data: null
                });
            }
    
            const result = await matkulModel.createMatkul(kodeMatkul, namaMatkul, sks);
    
            return res.status(201).json({
                success: true,
                message: 'Mata kuliah berhasil ditambahkan',
                data: { id: result.insertId, kodeMatkul, namaMatkul, sks }
            });
        } catch (error) {
            console.error("Error pada saat membuat data mata kuliah:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    selectMatkul: async (req, res) => {
        if (!req.user || req.user.role !== 'admin' && req.user.role !== 'dosen') {
             return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const rows = await matkulModel.selectMatkul();
    
            if (rows.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data matakuliah kosong',
                    data: null
                });
            }
    
            return res.status(200).json({
                success: true,
                message: 'Data mata kuliah berhasil diambil',
                data: rows
            });
        } catch (error) {
            console.error("Error pada saat menampilkan data mata kuliah:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }   
    },

    updateMatkul: async (req, res) => {
         if (!req.user || req.user.role !== 'admin') {
             return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { idMatkul } = req.params;
    
            if (!idMatkul) {
                return res.status(404).json({
                    success: false,
                    message: `Data matakuliah dengan id ${idMatkul} tidak ditemukan`,
                    data: null
                });
            }
    
            const { kodeMatkul, namaMatkul, sks } = req.body;
    
            if (!kodeMatkul || !namaMatkul || !sks) {
                 return res.status(400).json({
                    success: false,
                    message: 'kode matkul, nama matkul, dan sks harus diisi',
                    data: null
                });
            }
    
            const result = await matkulModel.updateMatkul(idMatkul, kodeMatkul, namaMatkul, sks);
    
            return res.status(200).json({
                success: true,
                message: `Data matkul dengan id ${idMatkul} berhasil diperbarui`,
                data: {
                    kodeMatkul,
                    namaMatkul, 
                    sks
                }
            });
        } catch (error) {
            console.error("Error pada saat memperbarui data mata kuliah:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    deleteMatkul: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak!',
                data: null
            });
        }
    
        try {
            const { idMatkul } = req.params;
    
            if (!idMatkul) {
                return res.status(404).json({
                    success: false,
                    message: `Data matakuliah dengan id ${idMatkul} tidak ditemukan`,
                    data: null
                });
            }
    
            const result = await matkulModel.deleteMatkul(idMatkul);
    
            return res.status(200).json({
                    success: true,
                    message: `Data mata kuliah dengan id ${idMatkul} berhasil dihapus`,
                    data: null
                });
        } catch (error) {
            console.error("Error pada saat menghapus data mata kuliah:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    }
}

module.exports = matkul;