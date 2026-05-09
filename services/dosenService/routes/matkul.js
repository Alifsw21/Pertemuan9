const express = require('express');
const matkulController = require('../controllers/matkulController');
const authenticationJWT = require('../middleware/authenticationJWT');
const router = express.Router();

router.post('/', authenticationJWT, matkulController.createMatkul);
router.get('/', authenticationJWT, matkulController.selectMatkul);
router.put('/:idMatkul', authenticationJWT, matkulController.updateMatkul);
router.delete('/:idMatkul', authenticationJWT, matkulController.deleteMatkul);

module.exports = router;