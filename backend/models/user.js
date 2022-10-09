const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING, allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        service: { type: DataTypes.STRING, allowNull: false },
        profilPicture : { type: DataTypes.STRING, allowNull: true },
        birthday : { type: DataTypes.DATE, allowNull: true},
        admin: { type: DataTypes.BOOLEAN, defaultValue : false }
         
    };

    const options = {
        defaultScope: {
            // Exclu email + pswd par défaut
            attributes: { exclude: ['passwordHash','email'] }
        },
        scopes: {
            // Inclus le pswd hash
            withHash: { attributes: {}, }
        },
        onDelete: 'CASCADE',
    };

    return sequelize.define('User', attributes, options);
}