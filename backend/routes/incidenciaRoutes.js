const express = require('express');
const router = express.Router();
const{listAllIncidents, createNewIncident, listByModulo, listByChofer} = require('../controllers/incidenciaController')

router.get('/', listAllIncidents);
router.post('/nuevo', createNewIncident);
router.post('/modulo',listByModulo);
router.get('/chofer/:id',listByChofer);

module.exports = router;