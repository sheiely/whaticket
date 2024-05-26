"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Companies", "status", {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: true
            }),
            queryInterface.addColumn("Companies", "schedules", {
                type: sequelize_1.DataTypes.JSONB,
                defaultValue: []
            })
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("Companies", "schedules"),
            queryInterface.removeColumn("Companies", "status")
        ]);
    }
};
