const Usuario = require('../models/usuario');
const db = require('../db/conexion');
const bcryptjs = require('bcryptjs');
const ValidacionHelper = require('../helpers/ValidacionHelper');

var validacionHelper = new ValidacionHelper();

var sql = "";

var controlador = {};

//Funciones Test (Comprobación inicial del controlador).
controlador.testGet = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Get del controlador Usuario" 
    });
}

controlador.testPost = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Soy Test-Post del controlador Usuario"
    });
}

//Funciones Vista (Renderizan vistas).
controlador.iniciarSesion = async function(request, response) {
    //1. Renderizar la vista.
    return response.render("iniciar_sesion.ejs");   
}

controlador.panelCliente = async function panelCliente(request, response) {
    //1. Recibir datos.
    var usuario = request.session.usuario;

    //2. Renderizar vista.
    if (usuario) {
        if (usuario.tipo == "Cliente") {
            response.render("panel_cliente.ejs");
        }
        else {
            return response.redirect(process.env.URL);
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
}

controlador.panelAdministrador = async function(request, response) {
    //1. Recibir datos.
    var usuario = request.session.usuario;

    //2. Renderizar vista.
    if (usuario) {
        if (usuario.tipo == "Administrador") {
            return response.render("panel_administrador.ejs");
        }
        else {
            return response.redirect(process.env.URL);
        }
    }
    else {
        return response.redirect(process.env.URL);
    }
}

controlador.crear = async function(request, response) {
    //1. Renderizar la vista.
    response.render("crear_usuario.ejs");
}

controlador.mostrar = async function(request, response) {
    try {
        //1. Ejecutar las funciones de acceso a datos.
        var usuarios = await Usuario.findAll();

        //2.1 Renderizar la vista en caso de éxito.
        return response.render("mostrar_usuarios.ejs", {
            usuarios: JSON.parse(JSON.stringify(usuarios))
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

    var rut = body.rut;
    var nombre = body.nombre;
    var apellido = body.apellido;
    var email = body.email;

    var clave = body.clave;
    var claveEncriptada = await bcryptjs.hash(clave, 8);

    var tipo = body.tipo;

    var errores = [];

    if (!validacionHelper.validarRutChileno(rut)) {
        errores.push("El rut ingresado no posee formato válido");
    }

    if (errores.length == 0) {
        try {
            //2. Ejecutar las funciones de acceso a datos.
            var usuario = await Usuario.create({
                rut: rut,
                nombre: nombre,
                apellido: apellido,
                email: email,
                clave: claveEncriptada,
                tipo: tipo
            });
    
            //3.1 Sesion en caso de éxito.
            request.session.crearUsuario = "Exitoso";
    
            
        } catch (error) {
            //3.2 Sesion en caso de error.
            request.session.crearUsuario = "Fallido";
        }
    }
    else {
        //3.3 Sesion en caso de no validación no cumplida.
        request.session.crearUsuario = "Fallido";
        request.session.errores = errores;
    }
    //4. Redirigir.
    return response.redirect(process.env.URL + "/usuario/crear");
}

controlador.login = async function(request, response) {
    //1. Obtener los datos por HTTP.
    var body = request.body;

    var rut = body.rut;
    var clave = body.clave;

    //2. Ejecutar las funciones de acceso a datos.
    var usuario = await Usuario.findByPk(rut);

    if (usuario && await bcryptjs.compare(clave, JSON.parse(JSON.stringify(usuario)).clave)) { //Comparando las contraseñas.
        //3.1 Redirigir a la vista en caso de credenciales correctas.
        request.session.usuario = JSON.parse(JSON.stringify(usuario));

        return response.redirect(process.env.URL);
    }
    else {
        //3.2 Redirigir a la vista en caso de credenciales incorrectas.
        request.session.errorLogin = "Credenciales incorrectas";
        
        return response.redirect(process.env.URL + "/usuario/iniciar-sesion");
    }
}

controlador.logout = async function(request, response) {
    delete request.session.usuario;
    return response.redirect(process.env.URL);
}

//Funciones Asincronas (API).
controlador.funcionApi = async function(request, response) {
    return response.status(200).send({
        mensaje: "SERVIDOR: Función Asincrona de ejemplo (Usuario)"
    });
}

module.exports = controlador; //Exportando el controlador.