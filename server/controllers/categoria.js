const Categoria = require('../models/categoria');
const db = require('../db/conexion');

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Categoria" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Categoria"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.crear = async function(request, response) {
    //Renderizar la vista.
    return response.render("crear_categoria.ejs");
}

controlador.mostrar = async function(request, response) {
    try {
        //1. Ejecutar las funciones de acceso a datos.
        var categorias = await Categoria.findAll();

        //2.1 Renderizar la vista en caso de éxito.
        return response.render("mostrar_categorias.ejs", {
            categorias: JSON.parse(JSON.stringify(categorias))
        });
    } catch (error) {
        //2.2 Renderizar la vista en caso de error.
        return response.redirect(process.env.URL);
    }   
}

//Funciones Acción (Procesan datos).
controlador.save = async function(request, response) {
    //1. Obtener los datos por HTTP.
    var body = request.body;

    var nombre = body.nombre;

    try {
        //2. Ejecutar las funciones de acceso a datos.
        var categoria = await Categoria.create({
            nombre: nombre
        });

        //3.1 Redirigir a la vista en caso de éxito.
        request.session.crearCategoria = "Exitoso";
        
        return response.redirect(process.env.URL + "/categoria/crear");
    } catch (error) {
        //3.2 Redirigir a la vista en caso de error.
        request.session.crearCategoria = "Fallido";

        return response.redirect(process.env.URL + "/categoria/crear");
    }
}

//Funciones Asincronas (API).
controlador.funcionApi = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Función Asincrona de ejemplo (Categoria)"
    });
}


module.exports = controlador; //Exportando el controlador.