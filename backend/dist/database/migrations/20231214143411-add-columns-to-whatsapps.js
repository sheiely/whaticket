"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Whatsapps", "maxUseBotQueues", {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 3,
            allowNull: true
        }),
            queryInterface.addColumn("Whatsapps", "expiresTicket", {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true
            }),
            queryInterface.addColumn("Whatsapps", "expiresInactiveMessage", {
                type: sequelize_1.DataTypes.STRING,
                defaultValue: "",
                allowNull: true
            }),
            queryInterface.addColumn("Whatsapps", "timeUseBotQueues", {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0,
                allowNull: true
            });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "companyId");
    }
};
