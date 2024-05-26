"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Queues", "startTime", {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: null
            }),
            queryInterface.addColumn("Queues", "endTime", {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: null
            }),
            queryInterface.addColumn("Queues", "outOfHoursMessage", {
                type: sequelize_1.DataTypes.TEXT,
                defaultValue: null
            })
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("Queues", "startTime"),
            queryInterface.removeColumn("Queues", "endTime"),
            queryInterface.removeColumn("Queues", "outOfHoursMessage")
        ]);
    }
};
