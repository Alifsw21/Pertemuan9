const express = require('express');
const kelasController = require('../controllers/kelasController');
const authenticationJWT = require('../middleware/authenticationJWT');
const router = express.Router();

router.post('/', authenticationJWT, kelasController.createKelas);
router.get('/', authenticationJWT, kelasController.selectKelas);
router.put('/:idKelas', authenticationJWT, kelasController.updateKelas);
router.delete('/:idKelas', authenticationJWT, kelasController.deleteKelas);

module.exports = router;