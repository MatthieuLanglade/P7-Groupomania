const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nomPoste : { type: DataTypes.TEXT, allowNull: false },
    };
    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('Postes', attributes, options);
}

