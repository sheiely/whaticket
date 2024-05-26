"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("QueueIntegrations", "typebotDelayMessage", {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1000
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("QueueIntegrations", "typebotDelayMessage");
    }
};
