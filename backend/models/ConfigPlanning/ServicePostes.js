const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
    };
    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('ServicePostes', attributes, options);
}

