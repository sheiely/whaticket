"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Tickets", "useIntegration", {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        }),
            queryInterface.addColumn("Tickets", "integrationId", {
                references: { model: "QueueIntegrations", key: "id" },
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: null,
                allowNull: true,
            });
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("Tickets", "useIntegration"),
            queryInterface.removeColumn("Tickets", "integrationId"),
        ]);
    }
};
