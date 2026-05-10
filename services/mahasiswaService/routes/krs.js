const express = require('express');
const krsController = require('../controller/krsController');
const authenticationJWT = require('../middleware/autenticationJWT');
const router = express.Router();

router.post('/', authenticationJWT, krsController.createKrs);
router.get('/', authenticationJWT, krsController.selectKrs);
router.put('/:idKRS', authenticationJWT, krsController.updateKrs);
router.delete('/:idKRS', authenticationJWT, krsController.deleteKrs);

module.exports = router;