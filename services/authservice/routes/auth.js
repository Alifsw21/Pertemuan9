const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/register', authController.register);

router.post('/login', authController.login);

router.put('/update/:id', authController.updateUser);

router.delete('/delete/:id', authController.deleteUser);

module.exports = router;