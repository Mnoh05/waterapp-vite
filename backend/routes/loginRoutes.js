const express = require('express');
const router = express.Router();
const {login, createNewUser, resetPassword, allUserChofer, deleteUserController} = require('../controllers/loginController.js');

router.post('/', login);
router.post('/crear-usuario', createNewUser)
router.put('/restablecer-password', resetPassword)
router.get('/users-choferes', allUserChofer)
router.delete('/users/:id', deleteUserController);


module.exports = router;