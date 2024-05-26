"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("QueueIntegrations", "urlN8N", {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("QueueIntegrations", "urlN8N");
    }
};
