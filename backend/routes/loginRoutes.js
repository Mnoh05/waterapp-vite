const express = require('express');
const router = express.Router();
const {login, createNewUser, resetPassword } = require('../controllers/loginController.js');

router.post('/', login);
router.post('/crear-usuario', createNewUser)
router.put('/restablecer-password', resetPassword)

module.exports = router;