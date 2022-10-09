const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        LikeDislike: { type: DataTypes.BOOLEAN, allowNull: false },
    };

    const options = {
        onDelete: 'CASCADE'
    };
    return sequelize.define('Likes', attributes, options);
}
