const ProductoControlador = require('../controllers/producto'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-producto", ProductoControlador.testGet);
router.post("/test-post-producto", ProductoControlador.testPost);

//Vistas.
router.get("/crear", ProductoControlador.crear);
router.get("/mostrar", ProductoControlador.mostrar);

//Acciones.
router.post("/save", ProductoControlador.save);

//Asincrono.
router.post("/api/funcion-api", ProductoControlador.funcionApi);

module.exports = router; //Exportando la configuración de rutas.