const Sequelize = require('sequelize');
module.exports = (sequelize) => {
    const User = sequelize.define('usuarios', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey:true
        },
        NOMBRE: {
            type: Sequelize.STRING,
            allowNull: false
        },
        rol: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ubicacion: {
            type: Sequelize.STRING,
            allowNull:false
        },
        usuario: {
            type: Sequelize.STRING,
            allowNull:false
        },
        contraseña:{
            type: Sequelize.STRING,
            allowNull:false
        },
    }, {timestamps: false});

    return User;
}