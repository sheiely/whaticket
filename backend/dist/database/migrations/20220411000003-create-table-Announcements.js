"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
module.exports = {
    up: (queryInterface) => {
        return queryInterface.createTable("Announcements", {
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            priority: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            title: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false
            },
            text: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false
            },
            mediaPath: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            mediaName: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            companyId: {
                type: sequelize_1.DataTypes.INTEGER,
                references: { model: "Companies", key: "id" },
                onUpdate: "CASCADE",
                onDelete: "CASCADE",
                allowNull: false
            },
            status: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: true
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
        return queryInterface.dropTable("Announcements");
    }
};
