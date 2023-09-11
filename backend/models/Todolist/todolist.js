const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        title : { type: DataTypes.TEXT, allowNull: false },
        visibility : { type: DataTypes.STRING, allowNull: false },
    };

    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('TodoList', attributes, options);
}
