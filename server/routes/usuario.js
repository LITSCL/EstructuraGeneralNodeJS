const UsuarioControlador = require('../controllers/usuario'); 

const express = require('express');
var router = express.Router();

router.get("/test-get-usuario", UsuarioControlador.testGet);
router.post("/test-post-usuario", UsuarioControlador.testPost);

//Vistas.
router.get("/iniciar-sesion", UsuarioControlador.iniciarSesion);
router.get("/panel-cliente", UsuarioControlador.panelCliente);
router.get("/panel-administrador", UsuarioControlador.panelAdministrador);
router.get("/crear", UsuarioControlador.crear);
router.get("/mostrar", UsuarioControlador.mostrar);

//Acciones.
router.post("/save", UsuarioControlador.save);
router.post("/login", UsuarioControlador.login);
router.get("/logout", UsuarioControlador.logout);

//Asincrono.
router.post("/api/funcion-api", UsuarioControlador.funcionApi);

module.exports = router; //Exportando la configuración de rutas.