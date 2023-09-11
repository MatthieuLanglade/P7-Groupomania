const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        description : { type: DataTypes.TEXT, allowNull: false }
    };

    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('Elements', attributes, options);
}
