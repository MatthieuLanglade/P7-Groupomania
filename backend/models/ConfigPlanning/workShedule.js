const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        WorkScheduleId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        UserId: { type: DataTypes.INTEGER, allowNull: false },
        PosteEquipeId: { type: DataTypes.INTEGER, allowNull: false },
        DateTravail: { type: DataTypes.DATE, allowNull: false },
        Version: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
        DateModification: { type: DataTypes.DATE, allowNull: false, defaultValue: sequelize.literal('CURRENT_TIMESTAMP') }
    };
    const options = {
        onDelete: 'CASCADE',
    };
    return sequelize.define('WorkSchedule', attributes, options);
}

