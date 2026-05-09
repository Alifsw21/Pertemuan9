const express = require('express');
const dosenController = require('../controllers/dosenController');
const matkulController = require('../controllers/matkulController');
const kelasController = require('../controllers/kelasController');
const authenticationJWT = require('../middleware/authenticationJWT');
const router = express.Router();

router.post('/dosen', authenticationJWT, dosenController.createDosen);
router.delete('/dosen/:idDosen', authenticationJWT, dosenController.deleteDosen);

router.post('/matkul', authenticationJWT, matkulController.createMatkul);
router.get('/matkul', authenticationJWT, matkulController.selectMatkul);
router.put('/matkul/:idMatkul', authenticationJWT, matkulController.updateMatkul);
router.delete('/matkul/:idMatkul', authenticationJWT, matkulController.deleteMatkul);

router.post('/kelas', authenticationJWT, kelasController.createKelas);
router.get('/kelas', authenticationJWT, kelasController.selectKelas);
router.put('/kelas/:idKelas', authenticationJWT, kelasController.updateKelas);
router.delete('/kelas/:idKelas', authenticationJWT, kelasController.deleteKelas);

module.exports = router;