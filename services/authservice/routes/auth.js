const express = require('express');
const authController = require('../controllers/authController');
const authenticateJWT = require('../middleware/authenticationJWT');
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.put('/update/:id', authenticateJWT, authController.updateUser);

router.delete('/delete/:id', authenticateJWT, authController.deleteUser);

module.exports = router;