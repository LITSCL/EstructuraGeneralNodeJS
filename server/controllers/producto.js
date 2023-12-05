const Producto = require('../models/producto');
const Categoria = require('../models/categoria');
const db = require('../db/conexion');

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Producto" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Producto"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.crear = async function(request, response) {
    try {
        //1. Ejecutar las funciones de acceso a datos.
        var categorias = await Categoria.findAll();

        //2.1 Renderizar la vista en caso de éxito.
        return response.render("crear_producto.ejs", {
            categorias: JSON.parse(JSON.stringify(categorias)) //Conviertiendo la consulta SQL en JSON.
        });
    } catch (error) {
        //2.2 Renderizar la vista en caso error.
        return response.redirect(process.env.URL);
    }
}

controlador.mostrar = async function(request, response) {
    try {
        //1. Ejecutar las funciones de acceso a datos.
        var productos = await Producto.findAll();

        //2.1 Renderizar la vista en caso de éxito.
        return response.render("mostrar_Productos.ejs", {
            productos: JSON.parse(JSON.stringify(productos))
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

    var codigo = body.codigo;
    var nombre = body.nombre;
    var precio = body.precio;
    var categoria = body.categoria;

    try {
        //2. Ejecutar las funciones de acceso a datos.
        var producto = await Producto.create({
            codigo: codigo,
            nombre: nombre,
            precio: precio,
            categoriaFK: categoria
        });

        //3.1 Redirigir a la vista en caso de éxito.
        request.session.crearProducto = "Exitoso";
        
        return response.redirect(process.env.URL + "/producto/crear");
    } catch (error) {
        //3.2 Redirigir a la vista en caso de error.
        request.session.crearProducto = "Fallido";
        
        return response.redirect(process.env.URL + "/producto/crear");
    }
}

//Funciones Asincronas (API).
controlador.funcionApi = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Función Asincrona de ejemplo (Producto)"
    });
}

module.exports = controlador; //Exportando el controlador.