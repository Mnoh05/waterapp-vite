const express = require('express');
const router = express.Router();
const {listAllTiempos, createNewTiempo, findTiempoByID, editTiempo} = require('../controllers/tiempoController');

router.get('/',listAllTiempos);
router.post('/crear-tiempo',createNewTiempo);
router.post('/id',findTiempoByID);
router.put('/editar-tiempo',editTiempo);

module.exports  = router;