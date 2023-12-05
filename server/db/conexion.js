const Sequelize = require('sequelize');

//1. Preparar la configuración de conexión.
var conexion = new Sequelize(process.env.DB_NOMBRE, process.env.DB_USUARIO, process.env.DB_CLAVE, {
    host: process.env.DB_SERVIDOR,
    dialect: "mariadb",
    port: process.env.DB_PUERTO
});

//2. Agrupar la variable de configuración y la función de conexión dentro de un objeto.
const db = {
    conexion: conexion,
    conectarDB: async function conectarDB() {
        try {
            await conexion.authenticate(); //El método "authenticate" realiza la conexión a la base de datos.
            console.log("Conexion a la base de datos realizada con exito");
        } catch (error) {
            console.log(error);
        }
    }
}

//3. Exportar el objeto de conexión.
module.exports = db;