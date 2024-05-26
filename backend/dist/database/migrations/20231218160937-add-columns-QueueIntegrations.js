"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("QueueIntegrations", "typebotKeywordRestart", {
            type: sequelize_1.DataTypes.STRING,
            allowNull: true,
            defaultValue: ""
        }),
            queryInterface.addColumn("QueueIntegrations", "typebotRestartMessage", {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
                defaultValue: ""
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("QueueIntegrations", "typebotKeywordRestart"),
            queryInterface.removeColumn("QueueIntegrations", "typebotRestartMessage");
    }
};
