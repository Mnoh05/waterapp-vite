const express = require('express');
const router = express.Router();
const {listAllSolicitudes, createNewSolicitud} = require('../controllers/solicitudMaterialController.js');

router.get('/',listAllSolicitudes);
router.post('/crear-solicitud',createNewSolicitud);
// router.patch('/actualizar-solicitud/:id', editIdSolicitud);
// router.post('/id',findSolicitudByID);
// router.put('/editar-solicitud',editSolicitud);
// router.get('/filtrado', filtradoSolicitudes);

module.exports  = router;