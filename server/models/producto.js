const db = require('../db/conexion');

const Sequelize = require('sequelize');

const Producto = db.conexion.define("Producto", { //Modelo Producto (Este modelo ya esta conectado a la base de datos).
    codigo: {
        type: Sequelize.DataTypes.STRING,
        primaryKey: true,
        field: "codigo"
    },
    nombre: {
        type: Sequelize.DataTypes.STRING,
        field: "nombre"
    },
    precio: {
        type: Sequelize.DataTypes.DOUBLE,
        field: "precio"
    },
    categoriaFK: {
        type: Sequelize.DataTypes.INTEGER,
        field: "categoria_id"
    }
}, {
    tableName: "producto", //Aquí se especifica a que tabla representa este modelo.
    timestamps: false //Esto evita que se creen las columnas createdAt y updatedAt.
});

module.exports = Producto; //Exportando el modelo Producto.