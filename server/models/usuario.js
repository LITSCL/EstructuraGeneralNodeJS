const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Usuario = db.conexion.define("Usuario", { //Modelo Usuario (Este modelo ya esta conectado a la base de datos).
    rut: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        field: "rut"
    },
    nombre: {
        type: Sequelize.DataTypes.STRING,
        field: "nombre"
    },
    apellido: {
        type: Sequelize.DataTypes.STRING,
        field: "apellido"
    },
    email: {
        type: Sequelize.DataTypes.STRING,
        field: "email"
    },
    clave: {
        type: Sequelize.DataTypes.STRING,
        field: "clave"
    },
    tipo: {
        type: Sequelize.DataTypes.STRING,
        field: "tipo"
    }
}, {
    tableName: "usuario", //Aquí se especifica a que tabla representa este modelo.
    timestamps: false //Esto evita que se creen las columnas createdAt y updatedAt.
});

module.exports = Usuario; //Exportando el modelo Usuario.