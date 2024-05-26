"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("UserRatings", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            ticketId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Tickets", key: "id" },
                onDelete: "SET NULL"
            },
            companyId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Companies", key: "id" },
                onDelete: "SET NULL"
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Users", key: "id" },
                onDelete: "SET NULL",
                allowNull: true
            },
            rate: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("UserRatings");
    }
};
