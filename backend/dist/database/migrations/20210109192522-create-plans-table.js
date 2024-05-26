"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Plans", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            name: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            users: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0
            },
            connections: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0
            },
            queues: {
                type: sequelize_1.DataTypes.INTEGER,
                defaultValue: 0
            },
            value: {
                type: sequelize_1.DataTypes.FLOAT,
                defaultValue: 0
            },
            createdAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            },
            updatedAt: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false
            }
        });
    },
    down: (queryInterface) => {
        return queryInterface.dropTable("Plans");
    }
};
