const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        description : { type: DataTypes.TEXT, allowNull: false },
        images : { type: DataTypes.STRING, allowNull: true },
        service : { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('Posts', attributes, options);
}
