const CategoriaControlador = require('../controllers/categoria'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-categoria", CategoriaControlador.testGet);
router.post("/test-post-categoria", CategoriaControlador.testPost);

//Vistas.
router.get("/crear", CategoriaControlador.crear);
router.get("/mostrar", CategoriaControlador.mostrar);

//Acciones.
router.post("/save", CategoriaControlador.save);

//Asincrono.
router.post("/api/funcion-api", CategoriaControlador.funcionApi);

module.exports = router; //Exportando la configuración de rutas.