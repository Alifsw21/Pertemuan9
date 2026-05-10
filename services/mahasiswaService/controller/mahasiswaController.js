const mahasiswaModel = require('../models/mahasiswaModel');
const { getChannel } = require('../config/rabbitmq');

const mahasiswa = {
    createMahasiswa: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const { idPengguna, NIM, namaMahasiswa, kelas } = req.body;
            
            if (!idPengguna || !NIM || !namaMahasiswa || !kelas) {
                return res.status(404).json({
                    success: false,
                    message: 'id pengguna, NIM, namaMahasiswa, dan kelas harus diisi',
                    data: null
                });
            }

            const result = await mahasiswaModel.createMahasiswa(idPengguna, NIM, namaMahasiswa, kelas);

            return res.status(201).json({
                success: true,
                message: 'Data mahasiswa berhasil dibuat',
                data: result
            });
        } catch (error) {
            console.error("Error pada saat membuat data mahasiswa:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    selectMahasiswa: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin' && req.user.role !== 'mahasiswa') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const row = await mahasiswaModel.selectMahasiswa();

            if (row.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: 'Data mahasiswa kosong',
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Data mahasiswa berhasil diambil',
                data: row
            });
        } catch (error) {
            console.error("Error pada saat melihat data mahasiswa:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    updateMahasiswa: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const { idMahasiswa } = req.params;

            if (!idMahasiswa) {
                return res.status(404).json({
                    success: false,
                    message: `Data mahasiswa dengan id ${idMahasiswa} tidak ditemukan`,
                    data: null
                });
            }

            const { idPengguna, NIM, namaMahasiswa, kelas } = req.body;

            if (!idPengguna || !NIM ||!namaMahasiswa || !kelas) {
                return res.status(400).json({
                    success: false,
                    message: 'Semua data harus diisi',
                    data: null
                });
            }

            const result = await mahasiswaModel.updateMahasiswa(idMahasiswa, idPengguna, NIM, namaMahasiswa, kelas);

            return res.status(200).json({
                success: true,
                message: `Data mahasiswa dengan ${idMahasiswa} berhasil diperbarui`,
                data: result
            });
        } catch (error) {
            console.error("Error pada saat memperbarui data mahasiswa:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    },

    deleteMahasiswa: async (req, res) => {
        if (!req.user.role || req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Akses ditolak',
                data: null
            });
        }

        try {
            const { idMahasiswa } = req.params;

            const result = await mahasiswaModel.deleteMahasiswa(idMahasiswa);

            if (result.affectedRows === 0) {
                return res.status(400).json({
                    success: false,
                    message: `Data mahasiswa dengan id ${idMahasiswa} tidak ditemukan`,
                    data: null
                });
            }

            return res.status(200).json({
                success: true,
                message: `Data mahasiswa dengan id ${idMahasiswa} berhasil dihapus`,
                data: null
            });
        } catch (error) {
            console.error("Error pada saat menghapus data mahasiswa:", error);
            return res.status(500).json({
                success: false,
                message: 'Terjadi kesalahan pada server',
                data: null
            });
        }
    }
}

module.exports = mahasiswa;