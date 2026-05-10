const express = require('express');
const mahasiswaController = require('../controller/mahasiswaController');
const autenticationJWT = require('../middleware/autenticationJWT');
const router = express.Router();

router.post('/', autenticationJWT, mahasiswaController.createMahasiswa);
router.get('/', autenticationJWT, mahasiswaController.selectMahasiswa);
router.put('/:idMahasiswa', autenticationJWT, mahasiswaController.updateMahasiswa);
router.delete('/id:idMahasiswa', autenticationJWT, mahasiswaController.deleteMahasiswa);

module.exports = router;