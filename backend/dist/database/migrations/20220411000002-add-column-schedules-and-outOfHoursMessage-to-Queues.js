"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Queues", "schedules", {
                type: sequelize_1.DataTypes.JSONB,
                defaultValue: []
            }),
            queryInterface.addColumn("Queues", "outOfHoursMessage", {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            })
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("Queues", "schedules"),
            queryInterface.removeColumn("Queues", "outOfHoursMessage")
        ]);
    }
};
