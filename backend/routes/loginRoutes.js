const express = require('express');
const router = express.Router();
const {login, createNewUser } = require('../controllers/loginController.js');

router.post('/', login);
router.post('/crear-usuario', createNewUser)

module.exports = router;