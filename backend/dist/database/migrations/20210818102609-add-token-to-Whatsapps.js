"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Whatsapps", "token", {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "token");
    }
};
