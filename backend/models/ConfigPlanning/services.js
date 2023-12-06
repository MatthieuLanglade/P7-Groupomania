const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        nomService : { type: DataTypes.TEXT, allowNull: false },
    };
    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('Services', attributes, options);
}

