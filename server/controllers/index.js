const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const db = require('../db/conexion');

var sql = "";

var controlador = {};

controlador.index = async function(request, response) {
    return response.render("index.ejs");
}

module.exports = controlador; //Exportando el controlador.