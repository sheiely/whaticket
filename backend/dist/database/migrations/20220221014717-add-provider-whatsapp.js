"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.addColumn("Whatsapps", "provider", {
            type: sequelize_1.DataTypes.TEXT,
            defaultValue: "stable"
        });
    },
    down: (queryInterface) => {
        return queryInterface.removeColumn("Whatsapps", "provider");
    }
};
