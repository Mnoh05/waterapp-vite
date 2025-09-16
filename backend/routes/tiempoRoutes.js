const express = require('express');
const router = express.Router();
const {listAllTiempos, createNewTiempo, findTiempoByID, editTiempo, editIdTiempo,  filtradoTiempos} = require('../controllers/tiempoController');

router.get('/',listAllTiempos);
router.post('/crear-tiempo',createNewTiempo);
router.patch('/actualizar-tiempo/:id', editIdTiempo);
router.post('/id',findTiempoByID);
router.put('/editar-tiempo',editTiempo);
router.get('/filtrado', filtradoTiempos);

module.exports  = router;