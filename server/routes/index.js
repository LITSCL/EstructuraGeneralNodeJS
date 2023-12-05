const IndexControlador = require('../controllers/index'); 

const express = require('express');
var router = express.Router();

router.get("/", IndexControlador.index);

module.exports = router; //Exportando la configuración de rutas.