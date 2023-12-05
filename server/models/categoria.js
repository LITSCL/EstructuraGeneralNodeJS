const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Categoria = db.conexion.define("Categoria", { //Modelo Categoria (Este modelo ya esta conectado a la base de datos).
    id: {
        type: Sequelize.DataTypes.INTEGER, 
        primaryKey: true,
        autoIncrement: true,
        field: "id"
    },
    nombre: {
        type: Sequelize.DataTypes.STRING,
        field: "nombre"
    }
}, {
    tableName: "categoria", //Aquí se especifica a que tabla representa este modelo.
    timestamps: false //Esto evita que se creen las columnas createdAt y updatedAt.
});

module.exports = Categoria; //Exportando el modelo Categoria.