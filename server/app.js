//1. Declarar e iniciar las librerías necesarias.
const express = require('express');
const session = require('express-session');

require('dotenv').config({path: '../.env'}); //Importando las variables de entorno.

//2. Importar las variables necesarias.
const db = require('./db/conexion'); //Importando la conexión a DB.

//3. Realizar la conexión a la base de datos.
db.conectarDB();

//4. Almacenar el servidor.
const app = express();

//5. Establecer el directorio público.
app.use(express.static("../client"));

//6. Establecer el motor de plantillas.
app.set("view engine", "ejs");

//7. Establecer la carpeta de vistas (Necesario para el motor de plantillas).
app.set("views", "../client");

//8. Realizar la configuración general de sesiones.
app.use(session({
    key: "cookie_usuario", //Nombre de la cookie que se almacena en el equipo del cliente.
    secret: "#LW3$W1N392", //Aquí hay que poner una cadena cualquiera.
    resave: true,
    saveUninitialized: true
}));

//9. Implementando los Middlewares necesarios (Haciendo disponible las variables en las plantillas).
app.use(async function(request, response, next) {
    response.locals.url = process.env.URL;
    response.locals.sesion = request.session;
    next();
});

//10. Setear express (Configurar las cabeceras).
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(function(request, response, next) {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method");
    response.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    response.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

//11. Obtener las rutas.
var rutaIndex = require('./routes/index');
var usuarioRutas = require('./routes/usuario');
var categoriaRutas = require('./routes/categoria');
var productoRutas = require('./routes/producto');

//12. Cargar las rutas al servidor.
app.use("/", rutaIndex);
app.use("/usuario", usuarioRutas);
app.use("/categoria", categoriaRutas);
app.use("/producto", productoRutas);

//13. Cargar la ruta Not Found.
app.get("*", function(request, response) {
    response.render("error.ejs");
});

module.exports = app; //Exportando el servidor.