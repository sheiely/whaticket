"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return Promise.all([
            queryInterface.addColumn("TicketTraking", "ratingAt", {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true,
                defaultValue: null
            }),
            queryInterface.addColumn("TicketTraking", "rated", {
                type: sequelize_1.DataTypes.BOOLEAN,
                defaultValue: false
            })
        ]);
    },
    down: (queryInterface) => {
        return Promise.all([
            queryInterface.removeColumn("TicketTraking", "ratingAt"),
            queryInterface.removeColumn("TicketTraking", "rated")
        ]);
    }
};
