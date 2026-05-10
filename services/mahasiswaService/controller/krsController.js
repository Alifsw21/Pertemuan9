const krsModel = require('../models/krsModel');
const { getChannel } = require('../config/rabbitmq');

const krs = {
    createKrs: async (req, res) => {
        if (!req.user || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const { idMahasiswa, idKelas } = req.body;

            if (!idMahasiswa || !idKelas) {
                return res.status(404).json({
                    success: false,
                    message: 'Id mahasiswa dan id kelas harus diisi',
                    data: null
                });
            }

            const result = await krsModel.createKrs(idMahasiswa, idKelas);

            return res.status(201).json({
                success: true,
                message: 'Data krs berhasil dibuat',
                data: {
                    id: result.insertId,
                    idMahasiswa,
                    idKelas
                }
            });
        } catch (error) {
            console.error("Error pada saat membuat data krs:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    selectKrs: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin' && req.user.role !== 'mahasiswa') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const rows = await krsModel.selectKrs();

            if (rows.length === 0) {
                return res.status(400).json({
                    success: false,
                    message: 'Data krs kosong',
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Data krs berhasil diambil',
                data: rows
            });
        } catch (error) {
            console.error("Error pada saat menampilkan data krs:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    updateKrs: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const { idKRS } = req.params;

            if (!idKRS) {
                return res.status(400).json({
                    success: false,
                    message: `Data krs dengan id ${idKRS} tidak ditemukan`,
                    data: null
                });
            }

            const { idMahasiswa, idKelas } = req.body;

            if (!idMahasiswa || !idKelas) {
                return res.status(404).json({
                    success: false,
                    message: 'id mahasiswa dan id kelas harus diisi',
                    data: null
                });
            }

            const result = await krsModel.updateKrs(idKRS, idMahasiswa, idKelas);

            return res.status(200).json({
                success: true,
                message: `Data krs dengan ${idKRS} berhasil diperbarui`,
                data: { 
                    id: result.insertId,
                    idMahasiswa,
                    idKelas
                }
            });
        } catch (error) {
            console.error("Error pada saat memperbarui data krs:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    deleteKrs: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const { idKRS } = req.params;

            const result = await krsModel.deleteKrs(idKRS);

            if (result.affectedRows === 0) {
                return res.status(400).json({
                    success: false,
                    message: `Data krs dengan id ${idKRS} tidak ditemukan`,
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: `Data krs dengan id ${idKRS} berhasil dihapus`,
                data: null
            });
        } catch (error) {
            console.error("Error pada saat menghapus data krs:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    }
}

module.exports = krs;