"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Users", "allTicket", {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
            defaultValue: "desabled"
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Users", "allTicket");
    }
};
