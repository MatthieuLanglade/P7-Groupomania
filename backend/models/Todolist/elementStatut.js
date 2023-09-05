const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        validate : { type: DataTypes.BOOLEAN, allowNull: true }
    };

    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('ElementStatut', attributes, options);
}
