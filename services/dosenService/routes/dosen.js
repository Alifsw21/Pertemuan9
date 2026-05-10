const express = require('express');
const dosenController = require('../controllers/dosenController');
const authenticationJWT = require('../middleware/authenticationJWT');
const router = express.Router();

router.post('/', authenticationJWT, dosenController.createDosen);
router.get('/', authenticationJWT, dosenController.selectDosen);
router.delete('/:idDosen', authenticationJWT, dosenController.deleteDosen);

module.exports = router;