"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Invoices", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            detail: {
                type: sequelize_1.DataTypes.STRING,
            },
            status: {
                type: sequelize_1.DataTypes.STRING,
            },
            value: {
                type: sequelize_1.DataTypes.FLOAT
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            dueDate: {
                type: sequelize_1.DataTypes.STRING,
            },
            companyId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Companies", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE"
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("Invoices");
    }
};
