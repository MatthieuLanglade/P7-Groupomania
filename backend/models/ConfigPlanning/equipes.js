const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nom : { type: DataTypes.TEXT, allowNull: false },
    };
    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('Equipes', attributes, options);
}

