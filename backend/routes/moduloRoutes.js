const express = require('express');
const router = express.Router();
const {createNewModulo, listAllModulos, findModuloByID, editModulo} = require('../controllers/moduloController');

router.get('/',listAllModulos);
router.post('/crear-modulo',createNewModulo);
router.post('/id',findModuloByID);
router.put('/editar-modulo',editModulo);

module.exports  = router;