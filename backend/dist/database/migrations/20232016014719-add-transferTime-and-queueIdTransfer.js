"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
//
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("Whatsapps", "transferQueueId", {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            }),
            queryInterface.addColumn("Whatsapps", "timeToTransfer", {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true,
            })
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("Whatsapps", "timeToTransfer"),
            queryInterface.removeColumn("Whatsapps", "transferQueueId")
        ]);
    }
};
